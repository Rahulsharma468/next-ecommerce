import mongoose, { Schema } from "mongoose";

const ProductSchema: any = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountedPrice: {
      type: Number,
    },
    discountPercentage: {
      type: Number,
    },
    imageSrc: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    subcategories: [
      {
        type: Schema.Types.ObjectId,
        ref: "SubCategory",
      },
    ],
    isOnSale: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
