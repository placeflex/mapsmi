import { connectDB } from "@/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { errors } from "./helpers/errors";

import bcrypt from "bcryptjs";

import { verifyToken, generateToken } from "./helpers/tokens";

// schemes
import User from "./models/user";

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

  if (req.method === "GET") {
    await connectDB();
    const token = req.headers.authorization;
    const decoded = verifyToken(String(token));

    try {
      if (decoded && typeof decoded === "object") {
        User.findOne({ email: decoded?.email })
          .then(async user => {
            console.log("user", user);

            const { name, email, role, confirmedEmail, ...userFields } = user;

            // const token = await generateToken({
            //   email,
            // });

            return res.status(200).json({
              role,
              name,
              // token,
              confirmedEmail,
              email,
            });
          })
          .catch(err => {
            res.status(404).json({
              error: `User not Found.`,
            });
          });
      } else {
        const { TOKEN_EXPIRED } = errors;
        res
          .status(TOKEN_EXPIRED.status)
          .json({ message: TOKEN_EXPIRED.message });
      }
    } catch {}
  }
}
