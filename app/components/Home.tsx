"use client";
import Dummy from "@/app/assets/dummy/dummy.json";
import CategoryDummy from "@/app/assets/dummy/categories.json";
import Image from "next/image";
import Navbar from "../components/Navbar";
import ProductSection from "./ProductSection";
import Carousel from "./carousel";
function Home() {
  return (
    <>
      <div>
        <div className="flex justify-center items-center px-16 py-px w-full font-semibold text-black bg-sky-300 leading-[130%] max-md:px-5 max-md:max-w-full">
          <div className="flex flex-col max-md:max-w-full">
            <div className="flex flex-wrap items-start px-3 pt-1 pb-3">
              <div className="text-sm tracking-wider text-center max-md:max-w-full">
                Use Code SHARK10 for 10% off on your 1st order. Free Shipping on
                Prepaid orders above Rs.2000
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center px-16 py-px w-full font-semibold text-black bg-yellow-300 leading-[130%] max-md:px-5 max-md:max-w-full">
          <div className="flex flex-col max-md:max-w-full">
            <div className="flex flex-wrap items-start px-3 pt-1 pb-3 ">
              <div className="text-sm tracking-wider text-center max-md:max-w-full">
                Dispatch time for pre order items is 7-10 days
              </div>
            </div>
          </div>
        </div>
      </div>

      <Navbar />

      <Carousel />

      <ProductSection title="New Arrivals" data={Dummy} />
      <ProductSection title="Categories" data={CategoryDummy} />
      <ProductSection title="Best Sellers" data={Dummy} />

      {/* <div className="flex flex-col justify-center items-center ">
        New Arrival
      </div>
      <div className="flex flex-col justify-center items-center px-16 py-11 bg-white max-md:px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
          {Dummy &&
            Dummy.map((item) => (
              <div key={item.id} className="flex justify-center">
                <div className="flex flex-col grow items-center pb-8 mx-auto w-full tracking-wider text-center bg-zinc-100 leading-[150%] max-md:mt-7">
                  <div className="flex overflow-hidden relative flex-col items-end self-stretch px-16 pt-3.5 pb-20 w-full text-sm font-bold leading-3 text-black whitespace-nowrap aspect-square max-md:pl-5">
                    <Image
                      loading="lazy"
                      src={`/${item.imageSrc}`}
                      alt="productImage"
                      className="object-cover absolute inset-0 size-full"
                      width={100}
                      height={100}
                    />
                    {item.isOnSale && (
                      <div className="absolute right-3 justify-center px-3.5 py-1.5 mb-32 bg-white rounded-[40px] max-md:mb-10">
                        Sale
                      </div>
                    )}
                  </div>
                  <div className="mt-8 text-lg font-semibold tracking-wide leading-6 text-neutral-900">
                    {item.name}
                  </div>
                  <div className="flex gap-3.5 mt-4">
                    <div className="grow text-sm text-neutral-900 text-opacity-80">
                      {item.discountedPrice}
                    </div>
                    <div className="text-base text-neutral-900">
                      {item.discountedPrice}
                    </div>
                  </div>
                  <div className="mt-3 text-base text-red-600">(18% off )</div>
                </div>
              </div>
            ))}
        </div>
        <div className="items-center justify-center px-8 py-4 shadow-sm w-[140px] bg-yellow-300 max-md:px-5 mt-4">
          View all
        </div>
      </div>
      <div className="flex flex-col justify-center items-center ">
        Categories
      </div>
      <div className="flex flex-col justify-center items-center px-16 py-11 bg-white max-md:px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
          {CategoryDummy &&
            CategoryDummy.map((item) => (
              <div key={item.id} className="flex justify-center">
                <div className="flex flex-col grow pb-7 w-full text-lg font-semibold tracking-wide leading-6 text-center bg-zinc-100 text-neutral-900 max-md:mt-7">
                  <Image
                    loading="lazy"
                    src={`/${item.image}`}
                    alt="productImage"
                    className="object-cover inset-0 size-full"
                    width={100}
                    height={100}
                  />
                  <div className="self-center mt-8">
                    {item.category_name}
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="items-center justify-center px-8 py-4 shadow-sm w-[140px] bg-yellow-300 max-md:px-5 mt-4">
          View all
        </div>
      </div>

      <div className="flex flex-col justify-center items-center ">
        Best Sellers
      </div>
      <div className="flex flex-col justify-center items-center px-16 py-11 bg-white max-md:px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
          {Dummy &&
            Dummy.map((item) => (
              <div key={item.id} className="flex justify-center">
                <div className="flex flex-col grow items-center pb-8 mx-auto w-full tracking-wider text-center bg-zinc-100 leading-[150%] max-md:mt-7">
                  <div className="flex overflow-hidden relative flex-col items-end self-stretch px-16 pt-3.5 pb-20 w-full text-sm font-bold leading-3 text-black whitespace-nowrap aspect-square max-md:pl-5">
                    <Image
                      loading="lazy"
                      src={`/${item.imageSrc}`}
                      alt="productImage"
                      className="object-cover absolute inset-0 size-full"
                      width={100}
                      height={100}
                    />
                    {item.isOnSale && (
                      <div className="absolute right-3 justify-center px-3.5 py-1.5 mb-32 bg-white rounded-[40px] max-md:mb-10">
                        Sale
                      </div>
                    )}
                  </div>
                  <div className="mt-8 text-lg font-semibold tracking-wide leading-6 text-neutral-900">
                    {item.name}
                  </div>
                  <div className="flex gap-3.5 mt-4">
                    <div className="grow text-sm text-neutral-900 text-opacity-80">
                      {item.discountedPrice}
                    </div>
                    <div className="text-base text-neutral-900">
                      {item.discountedPrice}
                    </div>
                  </div>
                  <div className="mt-3 text-base text-red-600">(18% off )</div>
                </div>
              </div>
            ))}
        </div>
        <div className="items-center justify-center px-8 py-4 shadow-sm w-[140px] bg-yellow-300 max-md:px-5 mt-4">
          View all
        </div>
      </div> */}
    </>
  );
}

export default Home;
