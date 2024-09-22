import mongoose, { Schema } from "mongoose";

const subcategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Subcategory =
  mongoose.models.Subcategory || mongoose.model("Subcategory", subcategorySchema);

export default Subcategory;
