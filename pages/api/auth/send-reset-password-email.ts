import { connectDB } from "@/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

import bcrypt from "bcryptjs";

import { generateToken } from "../helpers/tokens";
import { transporter } from "../helpers/mailer";

// schemes
import User from "../models/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await connectDB();
    const { email } = req.body;
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL_FRONTEND || "https://localhost:3000";

    User.findOne({ email })
      .then(async user => {
        if (user) {
          const token = await generateToken({
            name: "",
            email,
            password: "",
          });

          const mailOptions = {
            from: "adelente1@gmail.com",
            to: email,
            subject: "Восстановление пароля",
            text: `Для восстановления пароля перейдите по ссылке: ${baseUrl}?resetPasswordToken=${token}`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return res
                .status(500)
                .json({ error: "Email confirmation failed" });
            }

            res.status(200).json({
              message: "Мы отправили сообщение на почту.",
            });
          });
        } else {
          res.status(404).json({ error: "Email не найдет." });
        }
      })
      .catch(err => {
        return res.status(500).json({
          error: `An error occurred while searching for user:  ${err}`,
        });
      });
  }
}
