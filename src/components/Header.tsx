"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export const Header = () => {
  const pathname = usePathname();

  return (
    <div className="bg-gray-700 flex justify-center items-center h-16">
    <nav className="bg-gray-700 text-white h-16 max-w-screen-xl flex justify-between items-center w-full px-2">
      <div className="flex items-center space-x-4 sm:space-x-6">
        <Link
          href="/"
          className={`text-sm sm:text-xl font-bold no-underline transition-colors duration-300 ${
            pathname === "/" ? "text-orange-300" : "text-gray-100 hover:text-orange-200"
          }`}
        >
          Home
        </Link>
        <Link
          href="/admin-panel"
          className={`text-sm sm:text-xl font-bold no-underline transition-colors duration-300 ${
            pathname === "/admin-panel" ? "text-orange-300" : "text-gray-100 hover:text-orange-200"
          }`}
        >
          Admin
        </Link>
      </div>
      <div className="flex items-center space-x-4 sm:space-x-6">
        <Link
          href="/logout"
          className={`text-sm sm:text-xl font-bold no-underline transition-colors duration-300 px-2 py-2 rounded-md ${
            pathname === "/sign-up"
              ? "bg-white text-black border-gray-300"
              : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
          }`}
        >
          Log out
        </Link>

        <Link
          href="/sign-up"
          className={`text-sm sm:text-xl font-bold no-underline transition-colors duration-300 px-2 py-2 rounded-md ${
            pathname === "/sign-up"
              ? "bg-white text-black border-gray-300"
              : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
          }`}
        >
          Sign up
        </Link>
        <Link
          href="/login"
          className={`text-sm sm:text-xl font-bold no-underline transition-colors duration-300 px-2 py-2 rounded-md ${
            pathname === "/login"
              ? "bg-green-500 text-white border-green-600"
              : "bg-green-400 text-white border-green-500 hover:bg-green-500"
          }`}
        >
          Log in
        </Link>
      </div>
    </nav>
  </div>
  
  );
};
