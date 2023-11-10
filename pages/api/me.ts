import { connectDB } from "@/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

import bcrypt from "bcryptjs";

import { verifyToken } from "./helpers/tokens";

// schemes
import User from "./models/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    await connectDB();
    const token = req.headers.authorization;

    const decoded = verifyToken(String(token));

    try {
      if (decoded) {
        User.findOne({ email: decoded.email })
          .then(async user => {
            return res.status(200).json({
              email: user.email,
              name: user.name,
              projects: user.projects,
            });
          })
          .catch(err => {
            res.status(500).json({
              error: `An error occurred while searching for user:  ${err}`,
            });
          });
      } else {
        return res.status(500).json({ error: "Token Expired." });
      }
    } catch {}
  }
}
