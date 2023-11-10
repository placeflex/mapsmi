import { connectDB } from "@/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

import bcrypt from "bcryptjs";

import { generateToken } from "./helpers/tokens";
// schemes
import User from "./models/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await connectDB();
    const { email, password, username, name } = req.body;

    User.findOne({ email })
      .then(async user => {
        if (user) {
          const isPasswordValid = await bcrypt.compare(password, user.password);

          const token = await generateToken({
            name,
            email,
            password,
          });

          if (!isPasswordValid) {
            return res.status(409).json({ error: "Wrong password." });
          }

          return res.status(200).json({
            email: user.email,
            name: user.name,
            projects: user.projects,
            token,
          });
        } else {
          return res.status(409).json({ error: "User is not found" });
        }
      })
      .catch(err => {
        res.status(500).json({
          error: `An error occurred while searching for user:  ${err}`,
        });
      });
  }
}
