import { NextResponse } from "next/server";
import connectDB from "@/config/mongodb";
import Category from "@/models/category";
import Subcategory from "@/models/subCategory";

// POST request to create a category
export async function POST(request: Request) {
  try {
    const { name, subcategories } = await request.json();

    if (!name) {
      return NextResponse.json(
        { message: "Category name is required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Create main category
    const category = await Category.create({ name });

    // If there are subcategories, create them with the reference to the main category
    if (subcategories && subcategories.length > 0) {
      const subcategoryDocs = subcategories.map((subName: string) => ({
        name: subName,
        categoryId: category._id, // Link subcategory to category
      }));

      await Subcategory.insertMany(subcategoryDocs);
    }

    return NextResponse.json(
      { message: "Category created successfully", data: category },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error creating category", error: error.message },
      { status: 500 }
    );
  }
}

// GET request to fetch all categories
export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find();
    const subcategories = await Subcategory.find();

    // Structure the response with categories and their corresponding subcategories
    const categoriesWithSubcategories = categories.map((category) => {
      return {
        ...category.toObject(),
        subcategories: subcategories.filter(
          (subcategory) =>
            subcategory.categoryId.toString() === category._id.toString()
        ),
      };
    });

    return NextResponse.json(
      {
        message: "Categories and subcategories fetched successfully",
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

// PUT request to update a category or subcategory
export async function PUT(request: Request) {
  try {
    const { type, id, name } = await request.json();

    if (!type || !id || !name) {
      return NextResponse.json(
        { message: "Type, ID, and name are required" },
        { status: 400 }
      );
    }

    await connectDB();

    if (type === "category") {
      await Category.findByIdAndUpdate(id, { name });
    } else if (type === "subcategory") {
      await Subcategory.findByIdAndUpdate(id, { name });
    } else {
      return NextResponse.json({ message: "Invalid type" }, { status: 400 });
    }

    return NextResponse.json({ message: "Update successful" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error updating", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE request to delete a category or subcategory
export async function DELETE(request: Request) {
  try {
    const { type, id } = await request.json();

    if (!type || !id) {
      return NextResponse.json(
        { message: "Type and ID are required" },
        { status: 400 }
      );
    }

    await connectDB();

    if (type === "category") {
      await Category.findByIdAndDelete(id);
      await Subcategory.deleteMany({ categoryId: id });
    } else if (type === "subcategory") {
      await Subcategory.findByIdAndDelete(id);
    } else {
      return NextResponse.json({ message: "Invalid type" }, { status: 400 });
    }

    return NextResponse.json({ message: "Delete successful" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error deleting", error: error.message },
      { status: 500 }
    );
  }
}
