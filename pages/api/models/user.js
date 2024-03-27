import mongoose from "mongoose";
const { Schema, models } = mongoose;

const userScheme = new Schema(
  {
    email: {
      type: String,
      required: true,
      default: "",
    },
    name: {
      type: String,
      required: true,
      default: "",
    },
    surname: {
      type: String,
      required: true,
      default: "",
    },
    password: {
      type: String,
      required: true,
      default: "",
    },
    confirmedEmail: {
      type: Boolean,
      required: false,
      default: false,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    // projects: {
    //   type: Array,
    //   required: false,
    //   default: [],
    // },
  },
  { timestamps: true }
);

export default models.User || mongoose.model("User", userScheme);
