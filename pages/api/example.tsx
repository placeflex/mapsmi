// import { mongoClient } from "@/mongodb";
// import Contact from "";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { GridFSBucket } from "mongodb";

import type { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (mongoClient) {
//     let db = await mongoClient?.db();

//     const bucket = new GridFSBucket(db, {
//       bucketName: "lineart-figures",
//     });

//     if (req.method === "POST") {
//       res.status(200).send(req.body);
//     } else {
//     }
//   }
// }

// export async function POST(req: any) {
//   // const { fullname, email, message } = await req.json();

//   console.log("req", req);

//   try {
//     // await connectDB();
//     // await Contact.create({ fullname, email, message });

//     return NextResponse.json({
//       msg: ["Message sent successfully"],
//       success: true,
//     });
//   } catch (error) {
//     return NextResponse.json({
//       msg: [error],
//       success: false,
//     });
//     // if (error instanceof mongoose.Error.ValidationError) {
//     //   let errorList = [];
//     //   for (let e in error.errors) {
//     //     errorList.push(error.errors[e].message);
//     //   }
//     //   console.log(errorList);
//     //   return NextResponse.json({ msg: errorList });
//     // } else {
//     //   return NextResponse.json({ msg: ["Unable to send message."] });
//     // }
//   }
// }
