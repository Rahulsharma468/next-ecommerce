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
    discounted_price: discountedPrice || null,
    discount_percentage: discountPercentage || null,
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
  try {
    await connectDB();

    const url = new URL(req.url);
    const search = url.searchParams.get("search");
    const category = url.searchParams.get("category");
    const subcategory = url.searchParams.get("subcategory");
    const isOnSale = url.searchParams.get("isOnSale");
    const sortBy = url.searchParams.get("sortBy");
    const sortOrder = url.searchParams.get("sortOrder");

    // Create a filter object
    let filter: any = {};

    // Search filter (case-insensitive search by product name)
    if (search) {
      filter.product_name = { $regex: search, $options: "i" };
    }

    // Filter by category
    if (category) {
      filter.main_category = category;
    }

    // Filter by subcategory
    if (subcategory) {
      filter.sub_categories = { $in: subcategory.split(",") };
    }

    // Filter by isOnSale
    if (isOnSale) {
      filter.isOnSale = isOnSale === "true";
    }

    // Default sort options
    let sortOptions: any = {};
    if (sortBy) {
      const sortField = sortBy === "priceLowToHigh" ? "product_price" : sortBy === "priceHighToLow" ? "product_price" : sortBy;
      sortOptions[sortField] = sortOrder === "desc" ? -1 : 1;
    } else {
      sortOptions.createdAt = -1; // Default to newest first
    }

    // Fetch products with filters, search, sorting, and populate category and subcategory details
    const products = await Product.find(filter)
      .populate("main_category", "name") // Populate main category name
      .populate("sub_categories", "name") // Populate subcategory names
      .sort(sortOptions);

    return NextResponse.json(
      { message: "Products fetched successfully", data: products },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Error fetching products", error: error.message },
      { status: 500 }
    );
  }
}

