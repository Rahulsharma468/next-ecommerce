"use client";

import { useState } from "react";
import Axios from "axios";
import AdminSidebar from "@/app/components/adminSideba";
function AddProductForm() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [isOnSale, setIsOnSale] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await Axios.post("http://localhost:3000/api/product", {
        product_name: productName,
        product_price: productPrice,
        isOnSale: isOnSale,
      });
      //   onProductAdded(response.data.data);
      setProductName("");
      setProductPrice("");
      setIsOnSale(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg mx-auto p-4 shadow-md rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Price
          </label>
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={isOnSale}
              onChange={(e) => setIsOnSale(e.target.checked)}
              className="form-checkbox"
            />
            <span className="ml-2 text-sm">On Sale</span>
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProductForm;
