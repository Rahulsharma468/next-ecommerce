import mongoose, { Schema } from "mongoose";

const ProductSchema: any = new Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_price: {
      type: Number,
      required: true,
    },
    discounted_price: {
      type: Number,
    },
    discount_percentage: {
      type: Number,
    },
    product_image: {
      type: String,
      required: true,
    },
    main_category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true, 
    },
    sub_categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subcategory",
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
