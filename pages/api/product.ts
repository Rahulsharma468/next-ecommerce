import connectDB from "utils/mongodb";
import Product from "models/Product";

// Middleware to connect to the database
async function handler(req: any, res: any) {
  await connectDB();

  if (req.method === "POST") {
    return handlePost(req, res);
  } else if (req.method === "GET") {
    return handleGet(req, res);
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Handle POST requests (creating a product)
async function handlePost(req: any, res: any) {
  try {
    const {
      product_name,
      product_price,
      discountedPrice,
      discountPercentage,
      product_image,
      main_category,
      sub_categories,
      isOnSale,
    } = req.body;

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

    res.status(200).json({ message: "Product is created", data: product });
  } catch (error: any) {
    console.error("Error creating product:", error);
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
}

// Handle GET requests (fetching products)
async function handleGet(req: any, res: any) {
  try {
    const { search, category, subcategory, isOnSale, sortBy, sortOrder } =
      req.query;

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
      const sortField =
        sortBy === "priceLowToHigh"
          ? "product_price"
          : sortBy === "priceHighToLow"
          ? "product_price"
          : sortBy;
      sortOptions[sortField] = sortOrder === "desc" ? -1 : 1;
    } else {
      sortOptions.createdAt = -1; // Default to newest first
    }

    // Fetch products with filters, search, sorting, and populate category and subcategory details
    const products = await Product.find(filter)
      .populate("main_category", "name") // Populate main category name
      .populate("sub_categories", "name") // Populate subcategory names
      .sort(sortOptions);

    res
      .status(200)
      .json({ message: "Products fetched successfully", data: products });
  } catch (error: any) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
}

export default handler;
