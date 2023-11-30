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
  if (req.method === "PATCH") {
    await connectDB();
    const newUserFields = req.body;
    const token = req.headers.authorization;

    const decoded = verifyToken(String(token));

    try {
      if (decoded && typeof decoded === "object") {
        const filter = { email: decoded.email };
        const update = { ...newUserFields };
        const options = { new: true };

        await User.findOneAndUpdate(filter, update, options)
          .then(updatedUser => {
            if (updatedUser) {
              const { name, surname } = updatedUser;
              return res
                .status(200)
                .json({ data: { name, surname }, message: "Profile updated." });
            } else {
              return res.status(404).json({ error: "Email not found." });
            }
          })
          .catch(error => {
            return res.status(500).json({ error: "Internal Server Error" });
          });
      }
    } catch {}
  }

  if (req.method === "GET") {
    await connectDB();
    const token = req.headers.authorization;

    const decoded = verifyToken(String(token));

    try {
      if (decoded && typeof decoded === "object") {
        User.findOne({ email: decoded?.email })
          .then(async user => {
            const { name, surname, email, projects, ...userFields } = user;
            return res.status(200).json({
              name,
              surname,
              email,
              projects,
            });
          })
          .catch(err => {
            res.status(404).json({
              error: `User not Found.`,
            });
          });
      } else {
        return res.status(500).json({ error: "Token Expired." });
      }
    } catch {}
  }
}
