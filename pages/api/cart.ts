import { connectDB } from "@/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

import { verifyToken } from "./helpers/tokens";
import { errors } from "./helpers/errors";

import B2 from "backblaze-b2";

// import { handleScreen } from "@/pages/api/helpers/screenshot";
import { generateScreen } from "@/pages/api/helpers/generateScreen";
import { generateScreenForCart } from "@/pages/api/helpers/generateScreenForCart";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const b2 = new B2({
      applicationKeyId: process.env.BUCKET_KEY,
      applicationKey: process.env.BUCKET_SECRET,
    });

    const projectPayload = req.body;
    const id = uuidv4();

    await b2.authorize();

    const uploadurl = await b2.getUploadUrl({
      bucketId: "e4622d010a503bd483d80013",
    });

    const screen = await generateScreenForCart(projectPayload);

    const date = new Date().toISOString();

    const fileInfo = await b2.uploadFile({
      uploadUrl: uploadurl.data.uploadUrl,
      uploadAuthToken: uploadurl.data.authorizationToken,
      fileName: `cart/cart-${date}-${projectPayload.uuid}.png`,
      data: screen,
    });

    const { data } = await fileInfo;

    res.status(200).json({
      success: true,
      data: {
        ...projectPayload,
        path: `https://splashplacestest.s3.us-west-004.backblazeb2.com/cart/cart-${date}-${projectPayload.uuid}.png`,
        fileId: data.fileId,
        // uuid: id,
      },
      message: "Project added to cart.",
    });
  }

  if (req.method === "PATCH") {
    try {
      const projectPayload = req.body;

      const fileName = projectPayload.path.match(/cart-(.*?)\.png/)[1];

      const b2 = new B2({
        applicationKeyId: process.env.BUCKET_KEY,
        applicationKey: process.env.BUCKET_SECRET,
      });

      await b2.authorize();

      const uploadurl = await b2.getUploadUrl({
        bucketId: "e4622d010a503bd483d80013",
      });

      await b2.deleteFileVersion({
        fileName: `cart/cart-${fileName}.png`,
        fileId: projectPayload.fileId,
      });

      res.status(200).json({
        success: true,
        message: "Project and preview deleted.",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error updating project.",
        error: error,
      });
    }
  }
}
