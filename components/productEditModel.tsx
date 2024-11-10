import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

interface SubCategory {
  _id: string;
  name: string;
  categoryId: string;
}

interface MainCategory {
  _id: string;
  name: string;
  subcategories: SubCategory[];
  category_image: string;
  createdAt: string;
  updatedAt: string;
}

interface Product {
  product_name: string;
  product_price: number; // Assuming price is a number
  product_image: any;
  main_category: { _id: string };
  sub_categories: SubCategory[]; // Ensure this matches your data structure
  isOnSale: boolean; // If there's an "on sale" status
}

interface ProductEditModalProps {
  product: Product;
  categories: MainCategory[];
  onClose: () => void;
  onSave: (updatedProduct: Product) => void;
}

const ProductEditModal: React.FC<ProductEditModalProps> = ({ product, categories, onClose, onSave }) => {
  const [editedProduct, setEditedProduct] = useState<Product>(product);
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>(product.main_category._id);
  const [availableSubCategories, setAvailableSubCategories] = useState<SubCategory[]>([]);
  const [productImage, setProductImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Update available subcategories based on the selected main category
    if (selectedMainCategory) {
      const mainCategory = categories.find(category => category._id === selectedMainCategory);
      setAvailableSubCategories(mainCategory ? mainCategory.subcategories : []);
    } else {
      setAvailableSubCategories([]);
    }
  }, [selectedMainCategory, categories]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleMainCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMainCategory(e.target.value);
  };

  const handleSubCategoryChange = (subId: string) => {
    setEditedProduct(prevState => {
      const subCategories = prevState.sub_categories.map(sub => sub._id);
      if (subCategories.includes(subId)) {
        return {
          ...prevState,
          sub_categories: prevState.sub_categories.filter(sub => sub._id !== subId),
        };
      } else {
        const selectedSubCategory = availableSubCategories.find(sub => sub._id === subId);
        if (selectedSubCategory) {
          return {
            ...prevState,
            sub_categories: [...prevState.sub_categories, selectedSubCategory],
          };
        }
      }
      return prevState;
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductImage(file);
    }
  };

  const uploadImageToCloudinary = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_upload_preset'); // replace with your actual preset

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return data.secure_url; // return the uploaded image URL
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return null;
    }
  };

  const handleSaveChanges = async () => {
    const uploadedImageUrl = productImage ? await uploadImageToCloudinary(productImage) : editedProduct.product_image;

    if (!uploadedImageUrl && productImage) {
      setError('Failed to upload image');
      return;
    }

    const updatedProduct: Product = {
      ...editedProduct,
      main_category: { _id: selectedMainCategory },
      product_image: uploadedImageUrl,
    };

    onSave(updatedProduct);
  };

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
          Edit {editedProduct.product_name}
        </h2>

        {/* Product Name Input */}
        <label className="block mb-2 font-medium">Product Name</label>
        <input
          type="text"
          name="product_name"
          value={editedProduct.product_name}
          onChange={handleInputChange}
          className="border px-4 py-2 rounded-md w-full mb-4"
        />

        {/* Product Price Input */}
        <label className="block mb-2 font-medium">Product Price</label>
        <input
          type="number"
          name="product_price"
          value={editedProduct.product_price}
          onChange={handleInputChange}
          className="border px-4 py-2 rounded-md w-full mb-4"
        />

        {/* Main Category Selector */}
        <label className="block mb-2 font-medium">Main Category</label>
        <select
          name="main_category"
          value={selectedMainCategory}
          onChange={handleMainCategoryChange}
          className="border px-4 py-2 rounded-md w-full mb-4"
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Subcategory Checkboxes */}
        {selectedMainCategory && (
          <>
            <label className="block mb-2 font-medium">Subcategories</label>
            <div className="flex flex-col mb-4">
              {availableSubCategories.map(sub => (
                <label key={sub._id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editedProduct.sub_categories.some(s => s._id === sub._id)}
                    onChange={() => handleSubCategoryChange(sub._id)}
                    className="form-checkbox h-5 w-5 text-indigo-600"
                  />
                  <span className="ml-2">{sub.name}</span>
                </label>
              ))}
            </div>
          </>
        )}

        {/* Product Image Upload */}
        <label className="block mb-2 font-medium">Product Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border px-4 py-2 rounded-md w-full mb-4"
        />
        {productImage && <p>Selected file: {productImage.name}</p>}
        {error && <p className="text-red-500">{error}</p>}

        <button
          onClick={handleSaveChanges}
          className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProductEditModal;
