import { useState } from "react";
import Image from "next/image";
import MainImage from "public/HASTHETHICS.png";
import { CiSearch, CiUser } from "react-icons/ci";
import { BsHandbag } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleRedirect = () => {
    router.push("/signin");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex justify-center items-center self-stretch px-6 text-sm font-semibold tracking-wide leading-5 bg-sky-300 text-black text-opacity-80">
      <div className="flex gap-5 justify-between py-2 w-full max-w-[1400px]">
        {/* Left Section: Logo and Links */}
        <div className="flex items-center gap-5">
          <Image
            loading="lazy"
            src={MainImage}
            alt="image"
            className="w-12 h-auto"
            width={50}
            height={150}
          />
          <div className="hidden md:flex gap-5 items-center">
            <div onClick={() => router.push("/newarrival")}>Home</div>
            <div className="flex items-center gap-2">
              <span>NEW ARRIVALS</span>
              <IoIosArrowDown className="w-4 h-4" />
            </div>
            <span>Combos & Hampers</span>
            <span>Gifting</span>
            <span>Celebrity`s Choice</span>
            <span>CLEARANCE SALE</span>
          </div>
        </div>

        {/* Right Section: Icons */}
        <div className="flex items-center gap-5">
          <CiSearch className="w-6 h-6" />
          <CiUser className="w-6 h-6" onClick={handleRedirect} />
          <BsHandbag className="w-6 h-6" />
          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <HiOutlineX className="w-6 h-6" />
            ) : (
              <HiOutlineMenu className="w-6 h-6" />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-sky-300 z-10 md:hidden">
          <div className="flex flex-col items-center gap-4 py-4">
            <div onClick={() => { router.push("/newarrival"); toggleMobileMenu(); }}>Home</div>
            <div className="flex items-center gap-2">
              <span>NEW ARRIVALS</span>
              <IoIosArrowDown className="w-4 h-4" />
            </div>
            <span onClick={toggleMobileMenu}>Combos & Hampers</span>
            <span onClick={toggleMobileMenu}>Gifting</span>
            <span onClick={toggleMobileMenu}>Celebrity`s Choice</span>
            <span onClick={toggleMobileMenu}>CLEARANCE SALE</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
