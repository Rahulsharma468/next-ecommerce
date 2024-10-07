import { NextResponse } from "next/server";
import connectDB from "@/config/mongodb";
import Category from "@/models/category";
import Subcategory from "@/models/subCategory";

// PUT request to update a category name
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json({ message: "Name is required" }, { status: 400 });
    }

    await connectDB();
    await Category.findByIdAndUpdate(params.id, { name });

    return NextResponse.json({ message: "Category updated successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error updating category", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE request to delete a category and its subcategories
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    // Delete the category
    await Category.findByIdAndDelete(params.id);

    // Delete the associated subcategories
    await Subcategory.deleteMany({ categoryId: params.id });

    return NextResponse.json({ message: "Category and subcategories deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error deleting category", error: error.message },
      { status: 500 }
    );
  }
}
