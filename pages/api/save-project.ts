import { connectDB } from "@/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

import { v4 as uuidv4 } from "uuid";

import { verifyToken } from "./helpers/tokens";

import lodash from "lodash";

// schemes
import User from "./models/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await connectDB();
    const { prjectData, update } = req.body;
    const token = req.headers.authorization;
    const decoded = verifyToken(String(token));

    if (decoded) {
      User.findOne({ email: decoded.email })
        .then(async user => {
          if (user) {
            if (update) {
              const projects = user.projects;
              const findProject = projects.find(
                project => project.uuid == prjectData.uuid
              );

              const indexToUpdate = projects.findIndex(
                project => project.uuid == findProject.uuid
              );
              projects[indexToUpdate] = prjectData;
              await user.save();
              return res.status(200).json("Project was update");
            } else {
              const filter = { email: decoded.email };
              const update = {
                $push: { projects: { ...prjectData, uuid: uuidv4() } },
              };
              const options = { new: true };

              await User.findOneAndUpdate(filter, update, options);

              return res.status(200).json("Project added.");
            }
          } else {
            return res.status(400).json("User not found.");
          }
        })
        .catch(err => {
          return res.status(402).json("Project was added in account");
        });
    }
  }
}
