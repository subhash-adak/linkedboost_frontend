"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Menu,
  X,
} from "lucide-react";

import {ThemeToggle} from "@/components/theme-toggle";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [puzzleQuestion, setPuzzleQuestion] = useState<{ q: string; answer: number; a: number; b: number }>({ q: "", answer: 0, a: 0, b: 0 });
  const [puzzleAnswer, setPuzzleAnswer] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState<"request" | "verify">("request");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  // Add these states at the top with other state declarations
const [resendCooldown, setResendCooldown] = useState<number>(0);
const [canResendOTP, setCanResendOTP] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const [loading, setLoading] = useState(false);
  const API=process.env.BACKEND_URL;
const generatePuzzle = () => {
  const a = Math.floor(Math.random() * 9) + 2;
  const b = Math.floor(Math.random() * 9) + 2;
  setPuzzleQuestion({ a, b, q: `What is ${a} × ${b}?`, answer: a * b });
};

// ✅ Generate random math puzzle on mount
useEffect(() => {
  const a = Math.floor(Math.random() * 9) + 2;
  const b = Math.floor(Math.random() * 9) + 2;
  setPuzzleQuestion({ a, b, q: `What is ${a} × ${b}?`, answer: a * b });
}, []);

// Add this useEffect to handle the cooldown timer
useEffect(() => {
  if (resendCooldown <= 0) {
    setCanResendOTP(true);
    return;
  }

  const timer = setInterval(() => {
    setResendCooldown((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [resendCooldown]);

const handleRequest = async () => {
  setError("");
  setMessage("");
  setLoading(true);

  if (!email.trim()) {
    setError("Email is required");
    setLoading(false);
    return;
  }

  if (!puzzleAnswer.trim()) {
    setError("Please answer the puzzle");
    setLoading(false);
    return;
  }

  if (isNaN(parseInt(puzzleAnswer))) {
    setError("Answer must be a number");
    setLoading(false);
    return;
  }

  const res = await fetch("http://localhost:8000/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      puzzle_a: puzzleQuestion.a,
      puzzle_b: puzzleQuestion.b,
      puzzle_answer: parseInt(puzzleAnswer),
    }),
  });

  const data = await res.json();
  setLoading(false);

  if (res.ok) {
    setMessage("OTP sent to your email");
    setStep("verify");
    setResendCooldown(60); // Start initial 60 second cooldown
    setCanResendOTP(false);
  } else {
    const errMsg =
      typeof data.detail === "string"
        ? data.detail
        : Array.isArray(data.detail)
        ? data.detail.map((d: { msg: string }) => d.msg).join(", ")
        : "Request failed";

    setError(errMsg);
    generatePuzzle();
    setPuzzleAnswer("");
  }
};

const handleResendOTP = async () => {
  try {
    setLoading(true);
    setError("");

    const res = await fetch("http://localhost:8000/resend-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(email) // Send email as string directly, not as an object
    });

    const data = await res.json();

    if (!res.ok) {
      const errMsg = typeof data.detail === "string" 
        ? data.detail 
        : Array.isArray(data.detail)
        ? data.detail.map((d: { msg: string }) => d.msg).join(", ")
        : "Failed to resend OTP";
      setError(errMsg);
      return;
    }

    setMessage("OTP has been resent to your email");
    setResendCooldown(60);
    setCanResendOTP(false);

  } catch (err) {
    setError("Failed to resend OTP");
  } finally {
    setLoading(false);
  }
};

const handleReset = async () => {
  setError("");
  setMessage("");
  setLoading(true);

  const res = await fetch("http://localhost:8000/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      otp,
      new_password: newPassword,
    }),
  });

  const data = await res.json();
  setLoading(false);

  if (res.ok) {
    setMessage("Password updated successfully. Redirecting...");
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  } else {
    setError(data.detail || "Reset failed");
  }
};

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            <div className="flex items-center space-x-4">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-2 flex-shrink-0 group">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                LinkedBoost
              </span>
            </a>
           <ThemeToggle />
</div>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {["Features", "Pricing", "Login"].map((item) => {
  const href =
    item === "Login" ? "/login" : `/${`#${item.toLowerCase()}`}`; // always root + anchor
  return (
    <a
      key={item}
      href={href}
      className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 relative group"
    >
      {item}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
    </a>
  );
})}

              {/* <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300">
                Get Started
              </button> */}
            </nav>
           
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
         
          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
            <div className="pb-4 border-t border-gray-200 dark:border-gray-700 mt-4">
              <div className="flex flex-row justify-between items-center gap-2 pt-4 px-2">
                {["Features", "Pricing", "Login"].map((item) => {
  const href = item === "Login" ? "/login" : `/#${item.toLowerCase()}`;
  return (
    <a
      key={item}
      href={href}
      className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 relative group"
    >
      {item}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
    </a>
  );
})}

              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Form Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-md bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-2xl shadow-purple-500/10 border border-gray-200/50 dark:border-gray-700/50 p-8 animate-fade-in-up">
          <div className="text-center mb-6 space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl animate-bounce-slow">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Forgot Password
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Reset your LinkedBoost password
            </p>
          </div>

          <div className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-400"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Puzzle */}
            {step === "request" && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{puzzleQuestion.q}</label>
                  <input
                    type="number"
                    placeholder="Your answer"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-400"
                    value={puzzleAnswer}
                    onChange={(e) => setPuzzleAnswer(e.target.value)}
                  />
                </div>
                <button
  onClick={handleRequest}
  disabled={loading}
  className={`mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-medium transition-all duration-300 ${
    loading ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg hover:scale-105"
  }`}
>
  {loading ? "Sending OTP..." : "Send OTP"}
</button>

              </>
            )}

            {/* OTP and Reset */}
            {step === "verify" && (
              <>
                {/* <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">OTP</label>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-400"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div> */}
                <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">OTP</label>
        <button
          onClick={handleResendOTP}
          disabled={!canResendOTP || loading}
          className="text-sm text-purple-600 hover:text-purple-500 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {resendCooldown > 0 
            ? `Resend in ${resendCooldown}s` 
            : "Resend OTP"}
        </button>
      </div>
      <input
        type="text"
        placeholder="Enter OTP"
        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-400"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
    </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="New password"
                      className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-400"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button
  onClick={handleReset}
  disabled={loading}
  className={`mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-medium transition-all duration-300 ${
    loading ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg hover:scale-105"
  }`}
>
  {loading ? "Resetting..." : "Reset Password"}
</button>

              </>
            )}

           
{message && (
  <div className="space-y-4">
    <div className="text-green-600 text-sm flex items-center gap-2 mt-2 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
      <CheckCircle className="w-4 h-4" /> {message}
    </div>
    
    {/* Gmail Button - Only show when OTP is sent */}
    {message.includes("OTP sent") && (
      <button
        onClick={() => {
          const gmailUrl = `https://mail.google.com/mail/u/${email}/#search/subject:(Password Reset OTP)`;
          window.open(gmailUrl, '_blank');
        }}
        className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-2 px-4 rounded-xl transition-all duration-200 group dark:bg-gray-800 dark:text-white "
      >
        <img 
          src="https://www.google.com/gmail/about/static/images/logo-gmail.png" 
          alt="Gmail" 
          className="w-5 h-5" 
        />
        <span className="group-hover:text-purple-500 transition-colors duration-200 ">
          Open Gmail to Get OTP
        </span>
      </button>
    )}
  </div>
)}
            {error && (
              <div className="text-red-600 text-sm flex items-center gap-2 mt-2">
                <AlertCircle className="w-4 h-4" /> {error}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
