"use client";
import { useState, useEffect } from "react";
import Axios from "axios";
import AdminSidebar from "components/Sidebar";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Image from "next/image";

export default function CategoryUpload() {
  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<{
    categoryId: string;
    subcategoryId: string;
  } | null>(null);
  const [image, setImage] = useState<File | null>(null); // State to store the uploaded image
  const [imagePreview, setImagePreview] = useState<string>(""); // Preview the uploaded image

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
          category_image: category.category_image,
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      setSubcategories((prev) => [...prev, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleTagRemove = (index: number) => {
    setSubcategories((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setSelectedSubcategory(""); // Reset selected subcategory when category changes
  };

  const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubcategory(e.target.value);
  };

  const handleEditItem = (categoryId: string, subcategoryId: string) => {
    setEditItem({ categoryId, subcategoryId });
    setIsEditMode(true);
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await Axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/category/${categoryId}`
      );
      setCategories((prev) => prev.filter((cat) => cat._id !== categoryId));
      setSubCategories((prev) =>
        prev.filter((sub) => sub.categoryId !== categoryId)
      );
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleDeleteSubcategory = async (subcategoryId: string) => {
    try {
      await Axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/subcategory/${subcategoryId}`
      );
      setSubCategories((prev) =>
        prev.filter((sub) => sub._id !== subcategoryId)
      );
    } catch (error) {
      console.error("Error deleting subcategory:", error);
    }
  };

  const handleUpdateCategory = async () => {
    if (editItem) {
      const { categoryId, subcategoryId } = editItem;

      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/category/${categoryId}/subcategory/${subcategoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: inputValue }),
        }
      );

      setIsEditMode(false);
      setEditItem(null);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryName.trim() || subcategories.length === 0) {
      alert("Please enter a category name and at least one subcategory.");
      return;
    }

    let imageUrl = "";

    // Check if an image is selected
    if (image) {
      const formData = new FormData();
      formData.append("file", image);

      try {
        // Make the API request to upload the image
        const response: any = await Axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/cloudinary`,
          formData
        );

        // Ensure the response contains the image URL
        if (response && response.data && response.data.imageUrl) {
          imageUrl = response.data.imageUrl;
        } else {
          console.error("No image URL received");
          alert("Failed to upload image. Please try again.");
          return;
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image. Please try again.");
        return;
      }
    }

    try {
      // Make the API request to create the category
      const response = await Axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/category`,
        {
          name: categoryName,
          category_image: imageUrl, // Use the uploaded image URL
          subcategories: subcategories.map((sub) => ({ name: sub })),
        }
      );

      const { category, subcategories: newSubcategories } = response.data.data;

      // Update the categories list
      setCategories((prev) => [
        ...prev,
        {
          _id: category._id,
          name: category.name,
          category_image: category.category_image,
          subcategories: newSubcategories,
        },
      ]);

      // Reset the form
      setCategoryName("");
      setSubcategories([]);
      setImagePreview("");
      setImage(null);
    } catch (error) {
      console.error("Error creating category:", error);
      alert("Error creating category. Please try again.");
    }
  };


  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-y-auto text-black">
        <h1 className="text-xl font-bold mb-5">
          Manage Categories & Subcategories
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Category Name
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Subcategories
            </label>
            <div className="flex flex-wrap gap-2 p-2 border rounded-md border-gray-300 bg-white">
              {subcategories.map((subcategory, index) => (
                <div
                  key={index}
                  className="flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full"
                >
                  <span className="mr-2">{subcategory}</span>
                  <button
                    type="button"
                    onClick={() => handleTagRemove(index)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    &times;
                  </button>
                </div>
              ))}
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type and press Enter"
                className="flex-1 outline-none border-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Upload Image
            </label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Category Preview"
                className="mt-4 w-32 h-32 object-cover"
              />
            )}
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {isEditMode ? "Update" : "Upload"}
          </button>
        </form>

        {isEditMode && (
          <div className="mt-6 p-4 border rounded-md bg-white">
            <h2 className="text-lg font-bold mb-4">Edit Subcategory</h2>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md mb-4"
            />
            <button
              type="button"
              onClick={handleUpdateCategory}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        )}

        <div className="mt-6">
          <h2 className="text-lg font-bold mb-4">Category Management</h2>

          {/* Dropdown to select a category */}
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2 border rounded-md mb-4"
          >
            <option value="">Select a Category to Manage</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          {selectedCategory && (
            <>
              {/* Display selected category's image */}
              <div className="mb-4">
                {categories.map(
                  (category) =>
                    category._id === selectedCategory && (
                      <div
                        key={category._id}
                        className="flex items-center space-x-4"
                      >
                        <Image
                          src={category.category_image}
                          alt={category.name}
                          className="w-24 h-24 object-cover rounded-md border"
                          width={50}
                          height={50}
                        />
                        <div className="text-lg font-semibold">
                          {category.name}
                        </div>
                      </div>
                    )
                )}
              </div>

              {/* Display subcategories for the selected category */}
              <div className="flex flex-wrap gap-4 mb-4">
                {subCategories
                  .filter((sub) => sub.categoryId === selectedCategory)
                  .map((sub) => (
                    <div
                      key={sub._id}
                      className="p-4 border rounded-md shadow-sm bg-white flex justify-between items-center flex-grow"
                    >
                      <span>{sub.name}</span>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleEditItem(selectedCategory, sub._id)
                          }
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <AiOutlineEdit size={20} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteSubcategory(sub._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <AiOutlineDelete size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Button to delete the selected category */}
              <button
                type="button"
                onClick={() => handleDeleteCategory(selectedCategory)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete Category
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
