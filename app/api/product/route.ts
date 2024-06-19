import connectDB from "@/config/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const { name, price } = await request.json();

  await connectDB();
  const product = await Product.create({
    product_name: name,
    product_price: price,
  });
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
