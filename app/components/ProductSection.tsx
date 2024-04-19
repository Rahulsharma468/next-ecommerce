import React from "react";
import Image from "next/image";

interface ProductSectionProps {
  title: string;
  data: any;
}
const ProductSection: React.FC<ProductSectionProps> = ({ title, data }) => {
  return (
    <div>
      <div className="flex flex-col text-black items-center">
        <span className="text-4xl font-semibold">{title}</span>
      </div>
      <div className="flex flex-col justify-center items-center px-16 py-11 bg-white max-md:px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
          {data &&
            data.map((item: any) => (
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
                  {item.price && (
                    <>
                      <div className="flex gap-3.5 mt-4">
                        {item.price && (
                          <div className="grow text-sm text-neutral-900 text-opacity-80">
                            {item.price}
                          </div>
                        )}
                        {item.discountedPrice && (
                          <div className="text-base text-neutral-900">
                            {item.discountedPrice}
                          </div>
                        )}
                      </div>
                      <div className="mt-3 text-base text-red-600">
                        {item.discountedPrice && "(18% off )"}{" "}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
        </div>
        <div className="items-center justify-center px-8 py-4 shadow-sm cursor-pointer bg-yellow-300 max-md:px-5 mt-4 relative">
  View all
  <div className="absolute inset-0 border border-yellow-300 rounded hover:border-yellow-900"></div>
</div>

      </div>
    </div>
  );
};

export default ProductSection;
