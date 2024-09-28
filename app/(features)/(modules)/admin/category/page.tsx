"use client";
import { useState, useEffect } from "react";
import Axios from "axios";
import AdminSidebar from "@/app/components/adminSidebar";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle form submission
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
