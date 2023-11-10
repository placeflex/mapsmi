import mongoose from "mongoose";
const { Schema, models } = mongoose;

const userScheme = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmedEmail: {
      type: Boolean,
      required: false,
    },
    projects: {
      type: Array,
      required: false,
      default: [],
    },
  },
  { timestamps: true }
);

export default models.User || mongoose.model("User", userScheme);
