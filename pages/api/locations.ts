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

    console.log("locationName", locationName);

    console.log("process.env.MAPBOX_TOKEN", process.env.MAPBOX_TOKEN);

    const response = await axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          locationName
        )}.json?access_token=${process.env.MAPBOX_GEO_TOKEN}&autocomplete=true`
      )
      .then(({ data }) => {
        // console.log("data", data);

        res.status(200).json(data.features);
      })
      .catch(err => {
        console.log("err", err);
        res.status(404).json("Not found.");
      });

    // console.log("response", response);
  }

  if (req.method === "GET") {
    res.status(200).json(["SUCCES"]);
  }
}
