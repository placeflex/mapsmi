import { connectDB } from "@/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

import bcrypt from "bcryptjs";

import { generateToken, verifyToken } from "../helpers/tokens";
import { transporter } from "../helpers/mailer";

// schemes
import User from "../models/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await connectDB();
    const { resetPasswordToken, password, confirmPassword } = req.body;

    const decoded = verifyToken(String(resetPasswordToken));

    if (decoded && typeof decoded === "object") {
      if (password === confirmPassword) {
        const hashPassword = await bcrypt.hash(password, 10);
        const filter = { email: decoded.email };
        const update = { password: hashPassword };
        const options = { new: true };

        await User.findOneAndUpdate(filter, update, options)
          .then(updatedUser => {
            if (updatedUser) {
              return res.status(200).json({ message: "Password updated." });
            } else {
              return res.status(404).json({ error: "Email not found." });
            }
          })
          .catch(error => {
            return res.status(500).json({ error: "Internal Server Error" });
          });
      } else {
        res.status(404).json({ error: "Пароли не совпадают." });
      }
    }
  }
}
