import connectDB from "@/config/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function GET(req: any, { params }: any) {
    try {
      await connectDB();
  
      const { id } = params;
      const product = await Product.findById(id)
        .populate("main_category")
        .populate("sub_categories");
  
      if (!product) {
        return NextResponse.json(
          { message: "Product not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { message: "Product details fetched", data: product },
        { status: 200 }
      );
    } catch (error:any) {
      console.error("Error fetching product details:", error);
      return NextResponse.json(
        { message: "Error fetching product details", error: error.message },
        { status: 500 }
      );
    }
  }
  