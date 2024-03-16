import { connectDB } from "@/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

import { v4 as uuidv4 } from "uuid";

import { verifyToken } from "./helpers/tokens";

// import { handleScreen } from "@/pages/api/helpers/screenshot";
import { generateScreen } from "@/pages/api/helpers/generateScreen";
import { generatePDF } from "@/pages/api/helpers/generatePDF";

// schemes
import User from "./models/user";
import PopularWallartScheme from "./models/wallart";

import B2 from "backblaze-b2";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const b2 = new B2({
      applicationKeyId: process.env.BUCKET_KEY,
      applicationKey: process.env.BUCKET_SECRET,
    });
    await connectDB();
    const projectPayload = req.body;
    const id = uuidv4();

    const screen = await generateScreen(projectPayload);

    if (screen) {
      const auth = await b2.authorize();

      const uploadurl = await b2.getUploadUrl({
        bucketId: "e4622d010a503bd483d80013",
      });

      const upload = await b2.uploadFile({
        uploadUrl: uploadurl.data.uploadUrl,
        uploadAuthToken: uploadurl.data.authorizationToken,
        fileName: `project-${id}.png`,
        data: screen,
      });
    }

    const newProject = new PopularWallartScheme({
      ...projectPayload,
      path: `https://splashplacestest.s3.us-west-004.backblazeb2.com/project-${id}.png`,
      type: "family-designs",
      uuid: id,
    });

    await newProject.save();

    res.status(201).json({ success: true, data: newProject });
  }

  if (req.method === "GET") {
    await connectDB();

    try {
      // Найдите все проекты в коллекции popular-projects
      const projects = await PopularWallartScheme.find();

      res.status(200).json({ success: true, data: projects });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Server Error" });
    }
  } else {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}
