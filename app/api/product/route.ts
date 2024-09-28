import connectDB from "@/config/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const {
    product_name,
    product_price,
    discountedPrice,
    discountPercentage,
    product_image,
    main_category,
    sub_categories,
    isOnSale,
  } = await request.json();

  // Connect to the database
  await connectDB();

  // Create the product in the database
  const product = await Product.create({
    product_name,
    product_price,
    discountedPrice: discountedPrice || null,
    discountPercentage: discountPercentage || null,
    product_image, // Image URL
    main_category, // Main category
    sub_categories: sub_categories || [], // Subcategories array
    isOnSale: isOnSale || false, // Default to false if not provided
  });

  // Return the response
  return NextResponse.json(
    { message: "Product is created", data: product },
    { status: 200 }
  );
}

export async function GET(req: any) {
  await connectDB();
  const products = await Product.find();
  return NextResponse.json(
    { message: "Product is fetched", data: products },
    { status: 200 }
  );
}
