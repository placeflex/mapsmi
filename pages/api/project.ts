import { connectDB } from "@/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

import { v4 as uuidv4 } from "uuid";

import { verifyToken } from "./helpers/tokens";

import { handleScreen } from "@/pages/api/helpers/screenshot";

import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS,
  secretAccessKey: process.env.AWS_SECRET,
  region: "us-west-2",
});

// schemes
import User from "./models/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await connectDB();
    const s3 = new AWS.S3();

    const projectPayload = req.body;
    const token = req.headers.authorization;
    const decoded = verifyToken(String(token));
    const id = uuidv4();

    const picturePath = await handleScreen(projectPayload);

    console.log("token", token);

    console.log("decoded", decoded);

    if (token && decoded && typeof decoded === "object") {
      const params: any = {
        Bucket: "splashplaces",
        Key: `${id}`,
        Body: picturePath,
        ContentType: "image/png",
      };

      s3.upload(params, async (err: any, data: { Location: any }) => {
        if (err) {
          console.log("err", err);

          return res.status(200).json({ message: "AWS Error upload file." });
        } else {
          const imgPath = data.Location;

          console.log("imgPath", imgPath);

          const filter = { email: decoded.email };
          const update = {
            $push: {
              projects: { ...projectPayload, path: imgPath, uuid: id },
            },
          };
          const options = { new: true };

          await User.findOneAndUpdate(filter, update, options).then(
            updatedUser => {
              if (updatedUser) {
                return res.status(200).json({ message: "Project added." });
              } else {
                return s3.deleteObject(params, (err, data) => {
                  return res.status(200).json({ message: "Something wrong." });
                });
              }
            }
          );
        }
      });
    } else {
      return res.status(404).json({ error: "You need login." });
    }
  }

  if (req.method === "PATCH") {
    await connectDB();
    const s3 = new AWS.S3();
    const projectPayload = req.body;

    const token = req.headers.authorization;
    const decoded = verifyToken(String(token));
    const id = uuidv4();

    const picturePath = await handleScreen(projectPayload);

    if (token && decoded && typeof decoded === "object") {
      User.findOne({ email: decoded.email })
        .then(async user => {
          if (user) {
            const userProjects = user.projects;

            const params: any = {
              Bucket: "splashplaces",
              Key: projectPayload.uuid,
              Body: picturePath,
              ContentType: "image/png",
            };

            s3.putObject(params, async err => {
              if (err) {
                return res
                  .status(500)
                  .json({ message: "AWS Error upload file from update." });
              } else {
                const imgPath = `https://splashplaces.s3.amazonaws.com/${projectPayload.uuid}`;

                const indexToUpdate = userProjects.findIndex(
                  (project: { uuid: string }) =>
                    project.uuid == projectPayload.uuid
                );

                userProjects[indexToUpdate] = {
                  ...projectPayload,
                  path: imgPath,
                };

                await user.save();
                return res.status(200).json({ message: "Project was update" });
              }
            });
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
    const s3 = new AWS.S3();
    const { id } = req.query;

    console.log("id", id);

    const token = req.headers.authorization;
    const decoded = verifyToken(String(token));

    if (token && decoded && typeof decoded === "object") {
      User.findOne({ email: decoded.email })
        .then(async user => {
          user.projects = user.projects.filter(
            (project: { uuid: string }) => project.uuid !== id
          );
          await user.save();
          return res.status(200).json({ message: "Project was delete." });
        })
        .finally(() => {
          const params: any = {
            Bucket: "splashplaces",
            Key: id,
            VersionId: "null",
          };

          s3.deleteObject(params, async (err, data) => {
            if (err) {
              console.log("AWS ERROR delete project", err);
            }
          });
        });
    } else {
      return res.status(404).json({ error: "You need login." });
    }
  }
}
