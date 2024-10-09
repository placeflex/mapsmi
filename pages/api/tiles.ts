import { connectDB } from "@/mongodb";
// import Contact from "";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

import path from "path";
import fs from "fs";
import stream from "stream";

import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { zoom, y, x }: any = req.query;

    console.log("process.cwd()", process.cwd());

    const tilePath = path.join(
      // process.cwd(),
      // "public",
      // "tiles",
      "/Users",
      "flex",
      "Desktop",
      "save",
      "ventage512",
      `${zoom}_${x}_${y}.png`
    );

    console.log("tilePath", tilePath);

    const imageBuffer = fs.readFileSync(tilePath);

    // Устанавливаем заголовки ответа
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "s-maxage=31536000, immutable");

    // Отправляем изображение как ответ
    res.end(imageBuffer);
  }
}

// // pages/api/tiles.js
// import fs from "fs";
// import path from "path";

// export default function handler(req, res) {
//   const { zoom, x, y } = req.query;

//   // Формируем путь к файлу тайла с использованием слэшей вместо подчеркиваний
//   const tilePath = path.join(
//     process.cwd(),
//     "public",
//     "tiles",
//     zoom,
//     `${x}_${y}.png`
//   );

//   console.log("tilePath", tilePath);

//   if (fs.existsSync(tilePath)) {
//     const fileContents = fs.readFileSync(tilePath);
//     res.writeHead(200, { "Content-Type": "image/png" });
//     res.end(fileContents, "binary");
//   } else {
//     res.status(404).end();
//   }
// }
