import React from "react";
import Image from "next/image";

interface ProductSectionProps {
  title: string;
  data: any[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, data }) => {
  return (
    <div className="my-8">
      <div className="flex flex-col text-black items-center mb-8">
        <h2 className="text-4xl font-semibold">{title}</h2>
      </div>
      <div className="flex flex-col justify-center items-center px-16 py-11 bg-white max-md:px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
          {data?.map((item: any) => (
            <div key={item.id} className="flex justify-center">
              <div className="flex flex-col grow items-center pb-8 mx-auto w-full tracking-wider text-center bg-zinc-100 leading-[150%] max-md:mt-7">
                {/* Image Section */}
                <div className="relative flex-col items-end self-stretch px-16 pt-3.5 pb-20 w-full aspect-square max-md:pl-5">
                  <Image
                    loading="lazy"
                    src={item.product_image || item.category_image}
                    alt={item.name}
                    className="object-cover absolute inset-0 size-full"
                    fill={true}
                    sizes={"max-wdith: 50px"}
                  />
                  {item.isOnSale && (
                    <div className="absolute top-4 right-4 px-3.5 py-1.5 bg-white rounded-full">
                      Sale
                    </div>
                  )}
                </div>
                {/* Product Info Section */}
                <div className="mt-8 text-lg font-semibold text-neutral-900">{item.name || item.product_name}</div>
                {item.price && (
                  <>
                    <div className="flex gap-3.5 mt-4">
                      <div className="text-sm text-neutral-900 text-opacity-80">{item.price}</div>
                      {item.discounted_price && (
                        <div className="text-base text-neutral-900">{item.discounted_price}</div>
                      )}
                    </div>
                    {item.discounted_price && (
                      <div className="mt-3 text-base text-red-600">{`(${item.discountPercentage}% off)`}</div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* View All Button */}
        <button className="mt-6 px-8 py-4 bg-yellow-300 text-center shadow-sm hover:shadow-md transition-all">
          View All
        </button>
      </div>
    </div>
  );
};

export default ProductSection;
