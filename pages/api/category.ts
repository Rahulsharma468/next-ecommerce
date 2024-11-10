import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "utils/mongodb";
import Category from "models/Category";
import Subcategory from "models/Subcategory";

export default async function handler(req: any, res: any) {
  await connectDB();

  if (req.method === "POST") {
    try {
      const { name, subcategories, category_image } = req.body;

      if (!name || !category_image || subcategories.length === 0) {
        return res.status(400).json({
          message: "Category name and subcategories are required",
        });
      }

      const category = await Category.create({ name, category_image });

      const subcategoryDocs = subcategories.map((sub: any) => ({
        name: sub.name,
        categoryId: category._id,
      }));

      const createdSubcategories = await Subcategory.insertMany(subcategoryDocs);

      return res.status(201).json({
        message: "Category created successfully",
        data: { category, subcategories: createdSubcategories },
      });
    } catch (error: any) {
      return res.status(500).json({
        message: "Error creating category",
        error: error.message,
      });
    }
  } else if (req.method === "GET") {
    try {
      const categories = await Category.find();
      const subcategories = await Subcategory.find();

      const categoriesWithSubcategories = categories.map((category) => {
        const subs = subcategories.filter(
          (sub) => sub.categoryId.toString() === category._id.toString()
        );
        return { ...category.toObject(), subcategories: subs };
      });

      return res.status(200).json({
        message: "Categories fetched successfully",
        data: categoriesWithSubcategories,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: "Error fetching categories",
        error: error.message,
      });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
