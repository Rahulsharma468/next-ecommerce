import Image from "next/image";
import MainImage from "@/public/main.jpg";
import { CiSearch, CiUser } from "react-icons/ci";
import { BsHandbag } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/navigation";
function Navbar() {

  const router = useRouter();

  return (
    <div className="flex justify-center items-center self-stretch px-16 text-sm font-semibold tracking-wide leading-5 bg-sky-300 text-black text-opacity-80 max-md:px-5">
      <div className="flex gap-5 justify-between py-2 pr-12 pl-12 w-full max-w-[1400px] max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-wrap">
          <Image
            loading="lazy"
            src={MainImage}
            alt="image"
            className="flex-1 shrink-0 w-full aspect-[2.86]"
            width={100}
            height={100}
          />
          <div className="flex flex-wrap gap-5 justify-between items-center px-3 my-auto">
            <div className="self-stretch my-auto text-black" onClick={() => router.push('/newarrival')}>Home</div>
            <div className="flex gap-3 items-center self-stretch">
              <div className="self-stretch my-auto">NEW ARRIVALS</div>
              <div className="flex flex-1 gap-2.5 self-stretch py-3 pl-3 whitespace-nowrap">
                <div>Products</div>
                <IoIosArrowDown className="shrink-0 my-auto w-6 aspect-[1.67]" />
              </div>
              <div className="self-stretch my-auto">Combos & Hampers</div>
            </div>
            <div className="flex gap-5 justify-between self-stretch my-auto">
              <div>Gifting</div>
              <div>Celebritys Choice</div>
              <div>CLEARANCE SALE</div>
            </div>
          </div>
        </div>
        <div className="flex gap-5 justify-between self-stretch items-center">
          <CiSearch className="w-6 h-6 mr-1" />
          <CiUser className="w-6 h-6 mr-1" />
          <BsHandbag className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
