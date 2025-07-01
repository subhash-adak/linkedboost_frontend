"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import {ThemeToggle} from "./theme-toggle"; // Adjust the import path as necessary
export default function DashboardHeader() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleLogout = async () => {
    try {
      await fetch(`http://localhost:8000/logout`, {
        method: "POST",
      });
    } catch (e) {
      // Optionally handle error
    }
    sessionStorage.removeItem("access_token");
    localStorage.removeItem("access_token");
    router.push("/");
  };

  return (
    <header className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Left side with logo and theme toggle */}
          <div className="flex items-center space-x-4">
          <a
            href="/"
            className="flex items-center space-x-2 flex-shrink-0 group"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              LinkedBoost
            </span>
          </a>
 <ThemeToggle />
          </div>
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {["Features", "Pricing"].map((item) => (
              <a
                key={item}
                href={`/#${item.toLowerCase()}`}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors duration-300 border-none bg-transparent relative group"
            >
              Logout
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
            </button>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="pb-4 border-t border-gray-200 dark:border-gray-700 mt-4">
            <div className="flex flex-row flex-wrap justify-between items-center gap-2 pt-4 px-2">
              {["Features", "Pricing"].map((item) => (
                <a
                  key={item}
                  href={`/#${item.toLowerCase()}`}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors duration-300 border-none bg-transparent text-left"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
