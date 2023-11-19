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
    const { prjectData, update } = req.body;
    const token = req.headers.authorization;
    const decoded = verifyToken(String(token));
    const id = uuidv4();

    console.log("prjectData", prjectData);

    const picturePath = await handleScreen(prjectData);

    if (decoded && typeof decoded === "object") {
      User.findOne({ email: decoded.email })
        .then(async user => {
          if (user) {
            if (update) {
              const projects = user.projects;

              const params = {
                Bucket: "splashplaces",
                Key: prjectData.uuid,
                Body: picturePath,
                ContentType: "image/png",
              };

              s3.putObject(params, async err => {
                if (err) {
                  return res
                    .status(200)
                    .json({ message: "Error upload file from update." });
                } else {
                  const imgPath = `https://splashplaces.s3.amazonaws.com/${prjectData.uuid}`;

                  const indexToUpdate = projects.findIndex(
                    (project: { uuid: string }) =>
                      project.uuid == prjectData.uuid
                  );

                  projects[indexToUpdate] = {
                    ...prjectData,
                    path: imgPath,
                  };

                  await user.save();
                  return res
                    .status(200)
                    .json({ message: "Project was update" });
                }
              });

              // const findProject = projects.find(
              //   (project: { uuid: string }) => project.uuid == prjectData.uuid
              // );
            } else {
              const params = {
                Bucket: "splashplaces",
                Key: `${id}`,
                Body: picturePath,
                ContentType: "image/png",
              };

              s3.upload(params, async (err, data) => {
                if (err) {
                  return res
                    .status(200)
                    .json({ message: "Error upload file." });
                } else {
                  const imgPath = data.Location;

                  const filter = { email: decoded.email };
                  const update = {
                    $push: {
                      projects: { ...prjectData, path: imgPath, uuid: id },
                    },
                  };
                  const options = { new: true };
                  await User.findOneAndUpdate(filter, update, options);
                  return res.status(200).json({ message: "Project added." });
                }
              });
            }
          } else {
            return res.status(400).json({ error: "User not found." });
          }
        })
        .catch(err => {
          return res
            .status(402)
            .json({ error: "Project was added in account" });
        });
    }
  }
}
