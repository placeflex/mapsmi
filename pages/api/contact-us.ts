import { connectDB } from "@/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { errors } from "./helpers/errors";

import { transporter } from "./helpers/mailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // if (req.method === "PATCH") {
  //   await connectDB();
  //   const newUserFields = req.body;
  //   const token = req.headers.authorization;

  //   const decoded = verifyToken(String(token));

  //   try {
  //     if (decoded && typeof decoded === "object") {
  //       const filter = { email: decoded.email };
  //       const update = { ...newUserFields };
  //       const options = { new: true };

  //       await User.findOneAndUpdate(filter, update, options)
  //         .then(updatedUser => {
  //           if (updatedUser) {
  //             const { name, surname, token } = updatedUser;
  //             return res
  //               .status(200)
  //               .json({
  //                 data: { name, surname, token },
  //                 message: "Profile updated.",
  //               });
  //           } else {
  //             return res.status(404).json({ error: "Email not found." });
  //           }
  //         })
  //         .catch(error => {
  //           return res.status(500).json({ error: "Internal Server Error" });
  //         });
  //     }
  //   } catch {}
  // }

  if (req.method === "POST") {
    const body = req.body;

    console.log("body", body);

    const { email, subject, orderID, question, desc } = body;

    const mailOptions = {
      from: email,
      to: "mapsminfo@gmail.com",
      subject: subject,
      text: `
        orderID: ${orderID},
        question: ${question},
        description: ${desc},
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Message not delivered, an error occurred." });
      }

      const response = {
        status: "success",
        message: "Message sent.",
        data: {},
        timestamp: new Date().toISOString(),
      };

      return res.status(200).json(response);
    });
  }
}
