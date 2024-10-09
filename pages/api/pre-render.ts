import { connectDB } from "@/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { errors } from "./helpers/errors";

import bcrypt from "bcryptjs";

import { verifyToken, generateToken } from "./helpers/tokens";

import { generateScreen } from "../api/helpers/generateScreen";

// schemes
import User from "./models/user";
import { message } from "antd";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // await connectDB();
    const token = req.headers.authorization;
    const decoded = verifyToken(String(token));

    try {
      if (decoded && typeof decoded === "object") {
        const project = req.body;

        const screen = await generateScreen({
          project,
          originBuffer: true,
        });

        if (screen instanceof Buffer) {
          const base64Image = screen.toString("base64");

          res.status(200).json({
            data: `data:image/png;base64,${base64Image}`,
            message: "OK",
          });
        } else {
          res.status(500).json({
            success: false,
            error: "Failed to generate image",
            message: "Image generation failed.",
          });
        }
      } else {
        return res
          .status(400)
          .json({ success: false, error: "Permission denied" });
      }
    } catch {}
  }
}
