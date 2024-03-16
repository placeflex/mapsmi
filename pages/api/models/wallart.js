import mongoose from "mongoose";
const { Schema, models } = mongoose;

const wallartScheme = new Schema(
  {
    type: {
      type: String,
      required: true,
      default: "",
    },
    poster: {
      type: Object,
      required: true,
      default: {},
    },
    customCoordinates: {
      type: Object,
      required: true,
      default: {},
    },
    selectedAttributes: {
      type: Object,
      required: true,
      default: {},
    },
    path: {
      type: String,
      required: true,
      default: "",
    },
    productId: {
      type: Number,
      required: true,
      default: 0,
    },
    date: {
      type: String,
      required: true,
      default: "",
    },
    locationsDropdown: {
      type: Array,
      required: true,
      default: [],
    },
    locations: {
      type: Array,
      required: true,
      default: [],
    },
    markers: {
      type: Array,
      required: true,
      default: [],
    },
    uuid: {
      type: String,
      required: true,
      default: "",
    },
    connectLocations: {
      type: Boolean,
      required: true,
      default: false,
    },
    renderMarkers: {
      type: Boolean,
      required: true,
      default: false,
    },
    renderLabels: {
      type: Boolean,
      required: true,
      default: false,
    },
    elementsColor: {
      type: String,
      required: true,
      default: "#fff",
    },
    labelsTextColor: {
      type: String,
      required: true,
      default: "#fff",
    },
  },
  { timestamps: true }
);

export default models["popular-wallarts"] ||
  mongoose.model("popular-wallarts", wallartScheme);
