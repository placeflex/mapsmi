import { connectDB } from "@/mongodb";
// import Contact from "";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";

connectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { locationName } = req.body;
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        locationName
      )}.json?access_token=${process.env.MAPBOX_TOKEN}&autocomplete=true`
    );

    res.status(200).json(response.data.features);
  }

  if (req.method === "GET") {
    res.status(200).json(["SUCCES"]);
  }
}
