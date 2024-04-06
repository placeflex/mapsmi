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
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${locationName}&key=AIzaSyAKTvkEE0rTN3fmKqPejI3zVdEJWjeVgL4`
    );

    const predictions = response.data.predictions || [];

    return res.status(200).json(predictions);
  }

  if (req.method === "GET") {
    const { placeId } = req.query;

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyAKTvkEE0rTN3fmKqPejI3zVdEJWjeVgL4`
    );

    const location = response.data.result.geometry.location;
    const viewport = response.data.result.geometry.viewport;

    const center = [
      (viewport.northeast.lng + viewport.southwest.lng) / 2,
      (viewport.northeast.lat + viewport.southwest.lat) / 2,
    ];

    const bbox = [
      viewport.southwest.lng,
      viewport.southwest.lat,
      viewport.northeast.lng,
      viewport.northeast.lat,
    ];

    console.log("response", response);

    const locationResult = {
      lat: response.data.result.geometry.location.lat,
      lng: response.data.result.geometry.location.lng,
      description: response.data.result.formatted_address,
      name: response.data.result.name,
      vacinity: response.data.result.vicinity,
      place_id: response.data.result.place_id,
      bbox,
      center,
      geometry: {
        type: "Point",
        coordinates: [location.lng, location.lat],
      },
    };

    res.status(200).json(locationResult);
  }
}
