import { connectDB } from "@/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { isEmpty } from "lodash";
import { v4 as uuidv4 } from "uuid";

import { verifyToken } from "./helpers/tokens";
import { errors } from "./helpers/errors";

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
    await connectDB();
    const token = req.headers.authorization;
    const decoded = verifyToken(String(token));

    if (decoded && typeof decoded === "object") {
      User.findOne({ email: decoded.email }).then(async user => {
        if (user.role == "admin") {
          const b2 = new B2({
            applicationKeyId: process.env.BUCKET_KEY,
            applicationKey: process.env.BUCKET_SECRET,
          });
          const projectPayload = req.body;
          const id = uuidv4();

          const screen = await generateScreen(projectPayload);
          // return;
          // await generatePDF(projectPayload);

          return;

          await b2.authorize();

          const uploadurl = await b2.getUploadUrl({
            bucketId: "e4622d010a503bd483d80013",
          });

          const fileInfo = await b2.uploadFile({
            uploadUrl: uploadurl.data.uploadUrl,
            uploadAuthToken: uploadurl.data.authorizationToken,
            fileName: `project-${id}.png`,
            data: screen,
          });

          const { data } = await fileInfo;

          const newProject = new PopularWallartScheme({
            ...projectPayload,
            path: `https://splashplacestest.s3.us-west-004.backblazeb2.com/project-${id}.png`,
            fileId: data.fileId,
            uuid: id,
          });

          await newProject.save();

          res.status(201).json({
            success: true,
            data: newProject,
            message: "Project created successfully",
          });
        } else {
          res.status(400).json({ success: false, error: "Permission denied" });
        }
      });
    } else {
      const { TOKEN_EXPIRED } = errors;
      res.status(TOKEN_EXPIRED.status).json({ message: TOKEN_EXPIRED.message });
    }
  }

  if (req.method === "PATCH") {
    await connectDB();
    const token = req.headers.authorization;
    const decoded = verifyToken(String(token));

    if (decoded && typeof decoded === "object") {
      User.findOne({ email: decoded.email }).then(async user => {
        if (user.role == "admin") {
          const b2 = new B2({
            applicationKeyId: process.env.BUCKET_KEY,
            applicationKey: process.env.BUCKET_SECRET,
          });
          const projectPayload = req.body;
          // const id = uuidv4();

          const screen = await generateScreen(projectPayload);
          // await generatePDF(projectPayload);

          await b2.authorize();

          const uploadurl = await b2.getUploadUrl({
            bucketId: "e4622d010a503bd483d80013",
          });

          await b2.deleteFileVersion({
            fileName: `project-${projectPayload.uuid}.png`,
            fileId: projectPayload.fileId,
          });

          const fileInfo = await b2.uploadFile({
            uploadUrl: uploadurl.data.uploadUrl,
            uploadAuthToken: uploadurl.data.authorizationToken,
            fileName: `project-${projectPayload.uuid}.png`,
            data: screen,
          });

          const { data } = await fileInfo;

          const updateProject = {
            ...projectPayload,
            path: `https://splashplacestest.s3.us-west-004.backblazeb2.com/project-${projectPayload.uuid}.png`,
            fileId: data.fileId,
          };

          try {
            const updatedProject = await PopularWallartScheme.findOneAndUpdate(
              { uuid: projectPayload.uuid },
              updateProject,
              { new: true }
            );

            res.status(200).json({
              success: true,
              data: updatedProject,
              message: "Project updated successfully",
            });
          } catch (error) {
            res
              .status(500)
              .json({ success: false, error: "Internal Server Error" });
          }
        } else {
          res.status(400).json({ success: false, error: "Permission denied" });
        }
      });
    } else {
      const { TOKEN_EXPIRED } = errors;
      res.status(TOKEN_EXPIRED.status).json({ message: TOKEN_EXPIRED.message });
    }
  }

  if (req.method === "GET") {
    await connectDB();
    // const page = parseInt(String(req.query.page)) || 1;
    // const limit = parseInt(String(req.query.limit)) || 10;
    // const skip = (page - 1) * limit;

    const wallartCetogorieKey = Object.keys(req.query)[0];
    const wallartCetogorieValue = req.query[wallartCetogorieKey];

    try {
      // const projects = await PopularWallartScheme.find({ product_type: { $in: ["line_art"] } })
      // .skip(skip)
      // .limit(limit)
      // .exec();

      const projects = await PopularWallartScheme.find({
        [wallartCetogorieKey]: { $in: [wallartCetogorieValue] },
      }).exec();

      res.status(200).json({ success: true, data: projects });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Server Error" });
    }
  }

  if (req.method === "DELETE") {
    const token = req.headers.authorization;
    const decoded = verifyToken(String(token));

    try {
      if (decoded && typeof decoded === "object") {
        User.findOne({ email: decoded.email }).then(async user => {
          if (user.role == "admin") {
            await connectDB();

            const projectId = req.query.projectId;

            const deletedProject: any =
              await PopularWallartScheme.findOneAndDelete({
                uuid: projectId,
              });

            if (!deletedProject) {
              return res
                .status(404)
                .json({ success: false, error: "Project not found" });
            }

            res.status(200).json({
              success: true,
              data: deletedProject,
              message: "Project deleted",
            });

            const b2 = new B2({
              applicationKeyId: process.env.BUCKET_KEY,
              applicationKey: process.env.BUCKET_SECRET,
            });
            await b2.authorize();

            b2.deleteFileVersion({
              fileName: `project-${projectId}.png`,
              fileId: deletedProject.fileId,
            });
          } else {
            res
              .status(400)
              .json({ success: false, error: "Permission denied" });
          }
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Server Error" });
    }
  }
}
