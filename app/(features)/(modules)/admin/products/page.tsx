"use client";

import { useState, useEffect } from "react";
import Axios from "axios";
import AdminSidebar from "@/app/components/adminSidebar";

async function getSignature() {
  const response = await Axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/sign`
  );

  console.log(response);

  const { signature, timestamp } = response.data.data;
  return { signature, timestamp };
}

function AddProductForm() {
  const [productPrice, setProductPrice] = useState("");
  const [productName, setProductName] = useState("");
  const [isOnSale, setIsOnSale] = useState(false);
  const [productImage, setProductImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [mainCategory, setMainCategory] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState<any[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>(
    []
  );
  const [error, setError] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/category`
        );
        const fetchedCategories = response.data.data;

        const categoryOptions = fetchedCategories.map((category: any) => ({
          _id: category._id,
          name: category.name,
        }));

        const subcategoryOptions = fetchedCategories.reduce(
          (acc: any[], category: any) => {
            const subs = category.subcategories.map((sub: any) => ({
              _id: sub._id,
              name: sub.name,
              categoryId: category._id,
            }));
            return [...acc, ...subs];
          },
          []
        );

        setCategories(categoryOptions);
        setSubCategories(subcategoryOptions);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (category) {
      const filtered = subCategories.filter(
        (sub) => sub.categoryId === category
      );
      setFilteredSubCategories(filtered);
    } else {
      setFilteredSubCategories([]);
    }
  }, [category, subCategories]);

  const handleImageChange = (e: any) => {
    setProductImage(e.target.files[0]);
  };

  const handleMainCategoryChange = (e: any) => {
    const selectedCategoryId = e.target.value;
    setMainCategory(selectedCategoryId);
  };

  const handleCategoryChange = (e: any) => {
    const selectedCategoryId = e.target.value;
    setCategory(selectedCategoryId);
  };

  const handleSubCategoryChange = (e: any) => {
    const { value, checked } = e.target;
    setSelectedSubCategories((prevSelected) =>
      checked
        ? [...prevSelected, value]
        : prevSelected.filter((sub) => sub !== value)
    );
  };

  const uploadImageToCloudinary = async (file: File) => {
    try {
      const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

      const { signature, timestamp } = await getSignature();
      console.log('datata :: ' , signature, timestamp)
      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp.toString());
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '');
      // formData.append("folder", process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || "");
      
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      console.log("Dataatatta ::: " , data);
      return data.secure_url; 
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);

    try {
      let uploadedImageUrl = "";
      console.log('Product Image:: ' , productImage)
      if (productImage) {
        // Upload image to Cloudinary
        uploadedImageUrl = await uploadImageToCloudinary(productImage);
        if (!uploadedImageUrl) {
          throw new Error("Failed to upload image");
        }
      }

      const data = {
        product_name: productName,
        product_price: productPrice,
        isOnSale: isOnSale,
        product_image: uploadedImageUrl,
        main_category: mainCategory,
        sub_categories: selectedSubCategories,
      };

      console.log(data);

      // Uncomment the following line to make the API request
      const productResponse = await Axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/product`, data);
      console.log(productResponse);
      setProductName("");
      setProductPrice("");
      setIsOnSale(false);
      setProductImage(null);
      setMainCategory("");
      setCategory("");
      setSelectedSubCategories([]);
    } catch (error: any) {
      console.error("Error adding product:", error);
      setError(error);
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg text-black"
      >
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          Add New Product
        </h2>
        {error && <div className="text-red-600 mb-4">{error.message}</div>}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Price
          </label>
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Image
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            accept="image/*"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Main Category
          </label>
          <select
            value={mainCategory}
            onChange={handleMainCategoryChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">Select a Main Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subcategories
          </label>
          <div className="space-y-2">
            {filteredSubCategories.map((sub) => (
              <div key={sub._id} className="flex items-center">
                <input
                  type="checkbox"
                  id={sub._id}
                  value={sub._id}
                  checked={selectedSubCategories.includes(sub._id)}
                  onChange={handleSubCategoryChange}
                  className="form-checkbox h-5 w-5 text-indigo-600 border-gray-300 rounded"
                />
                <label htmlFor={sub._id} className="ml-3 text-sm text-gray-700">
                  {sub.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-5 flex items-center">
          <input
            type="checkbox"
            checked={isOnSale}
            onChange={(e) => setIsOnSale(e.target.checked)}
            className="form-checkbox h-5 w-5 text-indigo-600 border-gray-300 rounded"
          />
          <label className="ml-3 text-sm text-gray-700">On Sale</label>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProductForm;

