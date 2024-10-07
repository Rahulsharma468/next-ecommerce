import { NextResponse } from "next/server";
import connectDB from "@/config/mongodb";
import Subcategory from "@/models/subCategory";

// PUT request to update a subcategory name
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json({ message: "Name is required" }, { status: 400 });
    }

    await connectDB();
    await Subcategory.findByIdAndUpdate(params.id, { name });

    return NextResponse.json({ message: "Subcategory updated successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error updating subcategory", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE request to delete a subcategory
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    await Subcategory.findByIdAndDelete(params.id);

    return NextResponse.json({ message: "Subcategory deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error deleting subcategory", error: error.message },
      { status: 500 }
    );
  }
}
