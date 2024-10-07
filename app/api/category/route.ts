import { NextResponse } from "next/server";
import connectDB from "@/config/mongodb";
import Category from "@/models/category";
import Subcategory from "@/models/subCategory";

// POST request to create a category and its subcategories
export async function POST(request: Request) {
  try {
    const { name, subcategories, category_image } = await request.json();

    if (!name || !category_image || subcategories.length === 0) {
      return NextResponse.json(
        { message: "Category name and subcategories are required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Create the main category
    const category = await Category.create({ name, category_image });

    // Create subcategories with reference to the main category
    const subcategoryDocs = subcategories.map((sub: any) => ({
      name: sub.name,
      categoryId: category._id,
    }));

    const createdSubcategories = await Subcategory.insertMany(subcategoryDocs);

    return NextResponse.json(
      {
        message: "Category created successfully",
        data: { category, subcategories: createdSubcategories },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error creating category", error: error.message },
      { status: 500 }
    );
  }
}

// GET request to fetch all categories and their subcategories
export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find();
    const subcategories = await Subcategory.find();

    // Map categories with their corresponding subcategories
    const categoriesWithSubcategories = categories.map((category) => {
      const subs = subcategories.filter(
        (sub) => sub.categoryId.toString() === category._id.toString()
      );
      return { ...category.toObject(), subcategories: subs };
    });

    return NextResponse.json(
      {
        message: "Categories fetched successfully",
        data: categoriesWithSubcategories,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error fetching categories", error: error.message },
      { status: 500 }
    );
  }
}
