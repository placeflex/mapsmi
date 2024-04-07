import mongoose from "mongoose";
const { Schema, models } = mongoose;

const wallartScheme = new Schema({
  // type: {
  //   type: String,
  //   required: true,
  //   default: "",
  // },
  poster: {
    type: Object,
    required: true,
    default: {},
  },
  customCoordinates: {
    type: Object,
    required: false,
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
    required: false,
    default: "",
  },
  locationsDropdown: {
    type: Array,
    required: false,
    default: [],
  },
  locations: {
    type: Array,
    required: false,
    default: [],
  },
  markers: {
    type: Array,
    required: false,
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
  design_category: {
    type: Array,
    required: true,
    default: [],
  },
  design_type: {
    type: Array,
    required: true,
    default: [],
  },
  gift: {
    type: Array,
    required: true,
    default: [],
  },
  product_type: {
    type: Array,
    required: true,
    default: [],
  },
  orientation: {
    type: Array,
    required: true,
    default: [],
  },
  featured: {
    type: Array,
    required: true,
    default: [],
  },
  cities: {
    type: Array,
    required: true,
    default: [],
  },
  price: {
    type: [Number, String],
    required: false,
    default: "",
  },
  name: {
    type: String,
    required: false,
    default: "",
  },
  routeType: {
    type: Number,
    required: false,
    default: 0,
  },
  labelsStyle: {
    type: String,
    required: false,
    default: "fill",
  },
});

export default models["popular-wallarts"] ||
  mongoose.model("popular-wallarts", wallartScheme);
