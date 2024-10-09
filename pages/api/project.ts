import { connectDB } from "@/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

import { v4 as uuidv4 } from "uuid";

import { verifyToken } from "./helpers/tokens";

// import { handleScreen } from "@/pages/api/helpers/screenshot";
import { generateScreen } from "@/pages/api/helpers/generateScreen";
import { generatePDF } from "@/pages/api/helpers/generatePDF";

// schemes
import User from "./models/user";

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
    const token = req.headers.authorization;
    const decoded = verifyToken(String(token));
    const id = uuidv4();

    // const picturePath = await handleScreen(projectPayload);
    const screen = await generateScreen({ project: projectPayload });
    const pdf = await generatePDF(projectPayload);

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

    if (token && decoded && typeof decoded === "object") {
      const filter = { email: decoded.email };
      const update = {
        $push: {
          projects: {
            ...projectPayload,
            uuid: id,
            path: `https://splashplacestest.s3.us-west-004.backblazeb2.com/project-${id}.png`,
          },
        },
      };
      const options = { new: true };

      await User.findOneAndUpdate(filter, update, options).then(updatedUser => {
        if (updatedUser) {
          return res.status(200).json({ message: "Project added." });
        } else {
        }
      });
    } else {
      return res.status(404).json({ error: "You need login." });
    }
  }

  if (req.method === "PATCH") {
    await connectDB();
    const projectPayload = req.body;

    const token = req.headers.authorization;
    const decoded = verifyToken(String(token));
    const id = uuidv4();

    const screen = await generateScreen({ project: projectPayload });
    const pdf = await generatePDF(projectPayload);

    if (token && decoded && typeof decoded === "object") {
      User.findOne({ email: decoded.email })
        .then(async user => {
          if (user) {
            const userProjects = user.projects;

            const indexToUpdate = userProjects.findIndex(
              (project: { uuid: string }) => project.uuid == projectPayload.uuid
            );

            userProjects[indexToUpdate] = {
              ...projectPayload,
            };

            await user.save();
            return res.status(200).json({ message: "Project was update" });
          } else {
            return res.status(404).json({ error: "User not found." });
          }
        })
        .catch(err => {
          return res
            .status(402)
            .json({ error: "Project was added in account" });
        });
    } else {
      return res.status(404).json({ error: "You need login." });
    }
  }

  if (req.method === "DELETE") {
    await connectDB();
    const { id } = req.query;

    const token = req.headers.authorization;
    const decoded = verifyToken(String(token));

    if (token && decoded && typeof decoded === "object") {
      User.findOne({ email: decoded.email }).then(async user => {
        user.projects = user.projects.filter(
          (project: { uuid: string }) => project.uuid !== id
        );
        await user.save();
        return res.status(200).json({ message: "Project was delete." });
      });

      // TODO delete file from bucket
    } else {
      return res.status(404).json({ error: "You need login." });
    }
  }
}
