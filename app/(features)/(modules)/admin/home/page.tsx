"use client";

import { useState, useEffect } from "react";
import Axios from "axios";
import {
  AiOutlineSearch,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { FiX } from "react-icons/fi";
import AdminSidebar from "@/app/components/adminSidebar";
import ProductEditModal from "@/app/components/productEditModal";

const ProductDetailsModal = ({ product, onClose }: any) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 transform transition-transform duration-300 scale-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition-colors duration-200"
        >
          <FiX size={24} />
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {product.product_name}
        </h2>
        <img
          src={product.product_image}
          alt={product.product_name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <div className="mb-4">
          <p className="text-lg font-medium">
            <strong>Price:</strong> ₹{product.product_price}
          </p>
          {product.isOnSale && (
            <p className="text-lg font-medium text-red-600">
              <strong>Discounted Price:</strong> ₹{product.discounted_price}
            </p>
          )}
        </div>
        <p className="text-gray-700">
          <strong>Category:</strong> {product.main_category?.name}
        </p>
        <p className="text-gray-700">
          <strong>Subcategories:</strong>{" "}
          {product.sub_categories.map((sub: any) => sub.name).join(", ")}
        </p>
      </div>
    </div>
  );
};

const ProductPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSale, setFilterSale] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDetailsMode, setIsDetailsMode] = useState(false);
  // Fetch categories
  useEffect(() => {
    Axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/category`)
      .then((response) => setCategories(response.data.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let params: any = {};

        if (searchTerm) params.search = searchTerm;
        if (filterCategory) params.category = filterCategory;
        if (filterSale) params.isOnSale = String(filterSale);

        // Sorting logic
        if (sortOption === "name") {
          params.sortBy = "product_name";
          params.sortOrder = "asc";
        } else if (sortOption === "priceLowToHigh") {
          params.sortBy = "product_price";
          params.sortOrder = "asc";
        } else if (sortOption === "priceHighToLow") {
          params.sortBy = "product_price";
          params.sortOrder = "desc";
        }

        const queryParams = new URLSearchParams(params).toString();
        const response = await Axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/product?${queryParams}`
        );
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [searchTerm, filterCategory, filterSale, sortOption]);

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setIsEditMode(true);
    setIsDetailsMode(false);
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await Axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/product/${productId}`
      );
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleSaveChanges = async (updatedProduct: any) => {
    console.log(selectedProduct)
    console.log(updatedProduct)
    // try {
    //   const response = await Axios.put(
    //     `${process.env.NEXT_PUBLIC_BACKEND_URI}/product/${updatedProduct._id}`,
    //     updatedProduct
    //   );

    //   setProducts((prevProducts) =>
    //     prevProducts.map((product) =>
    //       product._id === updatedProduct._id ? updatedProduct : product
    //     )
    //   );

    //   setIsEditMode(false);
    //   setSelectedProduct(null);
    // } catch (error) {
    //   console.error("Error updating product:", error);
    // }
  };

  const handleViewProductDetails = (product: any) => {
    setSelectedProduct(product);
    setIsDetailsMode(true); // Enable details view
    setIsEditMode(false); // Ensure edit mode is off
  };

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="w-full p-6">
        <h2 className="text-2xl font-semibold mb-4">Product Management</h2>

        {/* Search & Filter */}
        <div className="mb-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <AiOutlineSearch className="absolute top-2 left-2 text-gray-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 border rounded-md"
              />
            </div>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="">Sort by</option>
              <option value="name">Name</option>
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="">Filter by Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filterSale}
                onChange={(e) => setFilterSale(e.target.checked)}
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <span className="ml-2">On Sale</span>
            </label>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="relative border p-4 rounded-md shadow-sm hover:shadow-lg"
            >
              <img
                src={product.product_image}
                alt={product.product_name}
                className="w-full h-40 object-cover mb-4"
              />
              <h3 className="text-lg font-semibold">{product.product_name}</h3>
              <p className="text-gray-500">₹{product.product_price}</p>

              {/* View Details Button */}
              <div className="flex justify-between items-center mt-2">
                <button
                   onClick={() => handleViewProductDetails(product)}
                  className="w-full bg-indigo-600 text-white py-2 rounded-md"
                >
                  View Details
                </button>

                {/* Edit and Delete Icons */}
                <div className="flex space-x-2 ml-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="text-blue-500 border border-blue-500 rounded-[10px] p-2 transition-colors duration-200 hover:bg-blue-100"
                  >
                    <AiOutlineEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="text-red-500 border border-red-500 rounded-[10px] p-2 transition-colors duration-200 hover:bg-red-100"
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modals */}
        {isDetailsMode && selectedProduct && ( 
          <ProductDetailsModal
            product={selectedProduct}
            onClose={() => setIsDetailsMode(false)} 
          />
        )}
        {isEditMode && selectedProduct && (
          <ProductEditModal
            product={selectedProduct}
            categories={categories}
            onClose={() => setIsEditMode(false)} 
            onSave={handleSaveChanges}
          />
        )}
      </div>
    </div>
  );
};

export default ProductPage;
