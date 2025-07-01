"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
export default function PrivacyPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fade-in animation on mount
  useEffect(() => {
    document.body.classList.add("animate-fade-in-up");
    return () => {
      document.body.classList.remove("animate-fade-in-up");
    };
  }, []);

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
              {["Features", "Pricing", "Login", "Register"].map((item) => (
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
                    href={item === "Login" ? "/login" : item === "Register" ? "/register" :  `/#${item.toLowerCase()}`}
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

      {/* Privacy Policy Content */}
      <main className="px-6 md:px-10 lg:px-16 xl:px-32 py-16 max-w-5xl mx-auto animate-fade-in-up">
  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6 md:p-10 space-y-10">
    <section>
      <h1 className="text-4xl font-bold mb-4 text-center text-cyan-500">Privacy Policy</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto">
        This Privacy Policy explains how LinkedBoost collects, uses, and protects your data when using our platform.
      </p>
    </section>

    <section className="space-y-6 text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300">
      <div>
        <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400">1. Data We Collect</h2>
        <ul className="list-disc ml-6 mt-2 space-y-2">
          <li>Email address, name, and contact information</li>
          <li>Usage data like clicks, login times, and automation actions</li>
          <li>LinkedIn profile data used during automation</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400">2. How We Use Your Data</h2>
        <p>We use the collected data to:</p>
        <ul className="list-disc ml-6 mt-2 space-y-2">
          <li>Provide and maintain platform services</li>
          <li>Personalize automation actions for your campaigns</li>
          <li>Improve analytics and user experience</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400">3. Data Protection</h2>
        <p>
          All user data is stored securely. We use encryption, secure authentication, and never sell your personal data to third parties.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400">4. Your Rights</h2>
        <p>
          You have the right to access, update, or delete your personal data. Please contact us for any data-related inquiries.
        </p>
      </div>
    </section>

    <div className="text-center pt-4">
      <button
        onClick={() => router.push("/register")}
        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        I Agree & Register
      </button>
    </div>
  </div>
</main>

      {/* Animation CSS */}
      <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out both;
        }
      `}</style>
    </div>
  );
}
