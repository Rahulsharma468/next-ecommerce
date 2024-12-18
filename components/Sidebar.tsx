"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";

function Sidebar() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-row bg-gray-100">
      <div className="flex flex-col w-64 bg-white shadow-md">
        {/* Logo Section */}
        <div className="flex items-center justify-center h-20 bg-indigo-600">
          <Image
            src="/logo.svg"
            alt="Admin Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>

        {/* Menu Section */}
        <ul className="flex flex-col py-6 space-y-2">
          <li>
            <Link
              href="/admin"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 transition-colors duration-200 ease-in-out"
            >
              <i className="bx bx-home text-xl"></i>
              <span className="ml-4 text-sm font-medium">Dashboard</span>
            </Link>
          </li>

          <li>
            <Link
              href="/admin/products"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 transition-colors duration-200 ease-in-out"
            >
              <i className="bx bx-music text-xl"></i>
              <span className="ml-4 text-sm font-medium">Products</span>
            </Link>
          </li>

          <li>
            <Link
              href="/admin/category"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 transition-colors duration-200 ease-in-out"
            >
              <i className="bx bx-category text-xl"></i>
              <span className="ml-4 text-sm font-medium">Category</span>
            </Link>
          </li>

          {/* Logout */}
          <li>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-red-100 hover:text-red-600 transition-colors duration-200 ease-in-out"
            >
              <i className="bx bx-log-out text-xl"></i>
              <span className="ml-4 text-sm font-medium">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
