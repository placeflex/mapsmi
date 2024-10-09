import formatCoords from "formatcoords";
import DmsCoordinates from "dms-conversion";

export const getLatLngData = (latitude, longitude) => {
  const f = formatCoords(latitude, longitude);

  console.log("f ", f);

  const [latitudeDecimalDegrees, longitudeDecimalDegrees] = f
    .format("d", { latLonSeparator: "x", decimalPlaces: 4 })
    .split("x");

  const dmsCoords = new DmsCoordinates(latitude, longitude);

  console.log("dmsCoords", dmsCoords);

  const { longitude: longitudeData, latitude: latitudeData } =
    dmsCoords.dmsArrays;

  return {
    latitudeData: mapData(latitudeData, latitudeDecimalDegrees),
    longitudeData: mapData(longitudeData, longitudeDecimalDegrees),
  };
};

const formatDms = value => {
  if (value < 10) {
    return `0${value}`;
  }

  return value;
};

const mapData = (rawData, formattedDecimalDegrees) => {
  const [degrees, minutes, seconds, direction] = rawData;
  return {
    degrees: formatDms(degrees),
    minutes: formatDms(minutes),
    seconds: formatDms(formatSeconds(seconds)),
    direction,
    formattedDecimalDegrees,
  };
};

export const transformCoordsDataToString = ({ latitudeData, longitudeData }) =>
  `${latitudeData.formattedDecimalDegrees} / ${longitudeData.formattedDecimalDegrees}`;

const formatSeconds = value => Math.trunc(value);
