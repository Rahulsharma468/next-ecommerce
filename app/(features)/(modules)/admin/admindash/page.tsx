"use client";

import { useEffect, useState } from "react";
import Axios from "axios";
import AdminSidebar from "@/app/components/adminSideba";

function Home() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("http://localhost:3000/api/product");
        setProductList(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Product List</h1>
        <ul className="space-y-4">
          {productList &&
            productList.map((product: any) => (
              <li
                key={product._id}
                className="border border-gray-300 p-4 rounded-lg shadow-md"
              >
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Product Name:</span>
                    <span>{product.product_name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Product Price:</span>
                    <span>${product.product_price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">On Sale:</span>
                    <span>{product.isOnSale ? "Yes" : "No"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Created At:</span>
                    <span>
                      {new Date(product.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Updated At:</span>
                    <span>
                      {new Date(product.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
