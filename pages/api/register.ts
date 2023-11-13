import { connectDB } from "@/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

import bcrypt from "bcryptjs";

import { generateToken } from "./helpers/tokens";
import { verifyToken } from "./helpers/tokens";
import { transporter } from "./helpers/mailer";

// schemes
import User from "./models/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await connectDB();
    const { email, name, surname, password, confirmPassword, ...rest } =
      req.body;

    User.findOne({ email })
      .then(async user => {
        if (user) {
          res.status(409).json({ error: "Email already exists." });
        } else {
          const hashPassword = await bcrypt.hash(password, 10);

          await User.create({
            name,
            email,
            password: hashPassword,
            confirmedEmail: false,
          });

          const token = await generateToken({
            name,
            email,
            password,
          });

          const mailOptions = {
            from: "adelente1@gmail.com",
            to: email,
            subject: "Подтверждение регистрации",
            text: `Для подтверждения регистрации перейдите по ссылке: https://localhost:3000?confirmToken=${token}`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return res
                .status(500)
                .json({ error: "Email confirmation failed" });
            }

            res.json({
              message:
                "Registration successful. Please check your email for confirmation.",
            });
          });

          const response = {
            status: "success",
            message: "User Created. Thanks.",
            data: { email, name, surname, token },
            timestamp: new Date().toISOString(),
          };

          res.status(200).json(response);
        }
      })
      .catch(err => {
        res.status(500).json({
          error: `An error occurred while searching for user:  ${err}`,
        });
      });
  }

  if (req.method === "GET") {
    const token = req.query.confirmToken;

    const decoded = verifyToken(String(token));

    if (decoded && typeof decoded === "object") {
      const user = await User.findOne({ email: decoded.email });
      if (user) {
        user.confirmedEmail = true;
        await user.save();
        res.json({ message: `Email confirmation successful ${decoded}` });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } else {
      res.status(401).json({ error: "Invalid or expired confirmation token" });
    }
  }
}
