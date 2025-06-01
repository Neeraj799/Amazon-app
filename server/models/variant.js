import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
  {
    ram: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);

export default variantSchema;
