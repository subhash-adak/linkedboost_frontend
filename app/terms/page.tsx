"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
export default function TermsPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAgree = () => {
    router.push("/register");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
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
              {["Features", "Pricing", "Login","Register"].map((item) => (
                <a
                  key={item}
                  href={item === "Login" ? "/login" : item === "Register" ? "/register" : `/#${item.toLowerCase()}`}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
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
              <div className="flex flex-row justify-between items-center gap-2 pt-4 px-2">
                {["Features", "Pricing", "Login", "Register"].map((item) => (
                  <a
                    key={item}
                    href={item === "Login" ? "/login" : item === "Register" ? "/register" : `/#${item.toLowerCase()}`}
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Terms Content */}
      {/* Terms Content */}
<main className="px-6 md:px-10 lg:px-16 xl:px-32 py-16 max-w-5xl mx-auto animate-fade-in-up">
  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6 md:p-10 space-y-8">
    <section>
      <h1 className="text-4xl font-bold mb-4 text-center text-cyan-500">Terms & Conditions</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto">
        Please review the terms below carefully. By continuing to use LinkedBoost, you agree to abide by them.
      </p>
    </section>

    <section className="space-y-6 text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300 max-h-[500px] overflow-y-auto pr-2">
      <p>
        Welcome to LinkedBoost. These terms and conditions outline the rules and regulations for the use of our platform. By accessing this website, we assume you accept these terms in full.
      </p>
      <ul className="list-disc ml-6 mt-2 space-y-2">
        <li>You agree to use the platform ethically and responsibly.</li>
        <li>No spamming or unauthorized access attempts are allowed.</li>
        <li>Data collected during automation must comply with LinkedIn policies.</li>
        <li>Violation of these terms may result in account suspension.</li>
        <li>We reserve the right to update terms without prior notice.</li>
      </ul>
    </section>

    <div className="text-center pt-4">
      <button
        onClick={handleAgree}
        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        I Agree
      </button>
    </div>
  </div>
</main>

    </div>
  );
}
