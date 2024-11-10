import { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Navbar from "components/Navbar";
import Carousel from "components/Carousel";
import ProductSection from "components/ProductSection";
import Axios from "axios";
import Dummy from "dummy/dummy.json";
import CategoryDummy from "dummy/categories.json";

const HomePage: NextPage = () => {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/product`
        );
        console.log(response.data);
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/category`
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const user = session?.user;
  return (
    <>
      <Navbar />

      <Carousel />
      <ProductSection
        title="New Arrivals"
        data={products.length ? products : Dummy}
      />
      <ProductSection
        title="Categories"
        data={categories.length ? categories : CategoryDummy}
      />
      <ProductSection
        title="Best Sellers"
        data={products.length ? products : Dummy}
      />

      {/* <div className="container">
        <div className="grid place-content-center min-h-screen">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-4xl my-8">Welcome to NextJS Starter</h1>

            {user ? (
              <>
                <h2>You are logged in as {user?.email} </h2>

                <button
                  className="btn"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link className="btn btn-outline" href="/signin">
                Sign In
              </Link>
            )}
          </div> */}
      {/* </div> */}
      {/* </div> */}
    </>
  );
};

export default HomePage;
