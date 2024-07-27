"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export const Header = () => {
  const pathname = usePathname();

  return (
    <div className="bg-gray-700 flex justify-center items-center py-4 sm:py-2">
    <nav className="bg-gray-700 text-white py-2 sm:py-3 max-w-screen-xl flex justify-between items-center w-full px-4">
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
          href="/sign-in"
          className={`text-sm sm:text-xl font-bold no-underline transition-colors duration-300 ${
            pathname === "/sign-in" ? "text-orange-300" : "text-gray-100 hover:text-orange-200"
          }`}
        >
          Sign in
        </Link>
        <Link
          href="/login"
          className={`text-sm sm:text-xl font-bold no-underline transition-colors duration-300 ${
            pathname === "/login" ? "text-orange-300" : "text-gray-100 hover:text-orange-200"
          }`}
        >
          Login
        </Link>
      </div>
    </nav>
  </div>
  );
};
