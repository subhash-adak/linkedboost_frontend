


// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import {ThemeToggle} from "@/components/theme-toggle";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Menu,
//   X,
//   CheckCircle,
//   AlertCircle,
//   Mail,
//   Lock,
//   Eye,
//   EyeOff,
// } from "lucide-react";

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [error, setError] = useState("");
//   const [focusedField, setFocusedField] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:8000/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         setError(data.detail || "Login failed");
//         setLoading(false);
//         return;
//       }
//       if (rememberMe) {
//         localStorage.setItem("access_token", data.access_token);
//         sessionStorage.setItem("access_token", data.access_token);
//       } else {
//         localStorage.setItem("access_token", data.access_token);
//         sessionStorage.setItem("access_token", data.access_token);
//       }
//       router.push("/dashboard");
//     } catch {
//       setError("Network error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen flex-col bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
//       {/* Animated Background */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
//         <div className="absolute top-40 left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 z-0"></div>
//       </div>

//       {/* Header */}
//       <header className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 z-50 transition-all duration-300">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16 lg:h-20">
//             <div className="flex items-center space-x-4">
//             <a
//               href="/"
//               className="flex items-center space-x-2 flex-shrink-0 group"
//             >
//               <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
//                 <span className="text-white font-bold text-sm">L</span>
//               </div>
//               <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                 LinkedBoost
//               </span>
//             </a>
// <ThemeToggle />
// </div>
//             {/* Desktop Nav */}
//             <nav className="hidden md:flex items-center space-x-6">
//               {["Features", "Pricing", "Register"].map((item) => (
//                 <a
//                   key={item}
//                   href={item === "Register" ? "/register" : `/#${item.toLowerCase()}`}
//                   className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 relative group"
//                 >
//                   {item}
//                   <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
//                 </a>
//               ))}
//             </nav>

//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//             >
//               {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>

//           {/* Mobile Menu */}
//           <div
//             className={`md:hidden transition-all duration-300 ease-in-out ${
//               mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
//             } overflow-hidden`}
//           >
//             <div className="pb-4 border-t border-gray-200 dark:border-gray-700 mt-4">
//               <div className="flex flex-row justify-between items-center gap-2 pt-4 px-2">
//                 {["Features", "Pricing", "Register"].map((item) => (
//                   <a
//                     key={item}
//                     href={item === "Register" ? "/register" : `/#${item.toLowerCase()}`}
//                     className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors relative group"
//                   >
//                     {item}
//                     <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Login Form */}
//       <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 relative z-10">
//         <div className="w-full max-w-md animate-fade-in-up">
//           <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-purple-500/10 p-8 border border-gray-200/50 dark:border-gray-700/50">
//             <div className="space-y-2 text-center mb-6">
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl animate-bounce-slow">
//                 <Lock className="w-8 h-8 text-white" />
//               </div>
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                 Login
//               </h1>
//               <p className="text-gray-600 dark:text-gray-400">Access your LinkedBoost account</p>
//             </div>

//             <form className="space-y-6" onSubmit={handleSubmit}>
//               {/* Email Field */}
//               <div className="space-y-2">
//                 <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                   Email
//                 </Label>
//                 <div className={`relative transform transition-all duration-300 ${focusedField === 'email' ? 'scale-105' : ''}`}>
//                   <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//                   <input
//                     id="email"
//                     type="email"
//                     placeholder="name@example.com"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     onFocus={() => setFocusedField('email')}
//                     onBlur={() => setFocusedField('')}
//                     className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
//                     required
//                   />
//                   {email && email.includes('@') && (
//                     <CheckCircle className="absolute right-3 top-3 w-5 h-5 text-green-500 animate-fade-in" />
//                   )}
//                 </div>
//               </div>

//               {/* Password Field */}
//               <div className="space-y-2">
//                 <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                   Password
//                 </Label>
//                 <div className={`relative transform transition-all duration-300 ${focusedField === 'password' ? 'scale-105' : ''}`}>
//                   <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//                   <input
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="••••••••"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     onFocus={() => setFocusedField('password')}
//                     onBlur={() => setFocusedField('')}
//                     className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                   >
//                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//               </div>

//               {/* Remember Me */}
//               <div className="flex items-center justify-between text-sm">
//                 <div className="flex items-center space-x-2">
//                   <Checkbox
//                     id="remember"
//                     checked={rememberMe}
//                     onCheckedChange={(checked) => setRememberMe(!!checked)}
//                   />
//                   <Label htmlFor="remember">Remember me</Label>
//                 </div>
//                 <Link href="/forgot-password" className="text-purple-600 hover:underline">Forgot password?</Link>
//               </div>

//               {/* Submit Button */}
//               <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600" disabled={loading}>
//                 {loading ? "Logging in..." : "Login"}
//               </Button>

//               {error && (
//                 <div className="text-red-500 text-center text-sm flex items-center justify-center gap-2">
//                   <AlertCircle className="w-4 h-4" />
//                   {error}
//                 </div>
//               )}
//             </form>

//             <div className="text-center text-sm mt-6">
//               Don&apos;t have an account?{" "}
//               <Link href="/register" className="text-purple-600 hover:underline">Register</Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fade-in-up {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes bounce-slow {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-10px); }
//         }
//         @keyframes blob {
//           0% { transform: translate(0px, 0px) scale(1); }
//           33% { transform: translate(30px, -50px) scale(1.1); }
//           66% { transform: translate(-20px, 20px) scale(0.9); }
//           100% { transform: translate(0px, 0px) scale(1); }
//         }
//         .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
//         .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
//         .animate-blob { animation: blob 7s infinite; }
//         .animation-delay-2000 { animation-delay: 2s; }
//         .animation-delay-4000 { animation-delay: 4s; }
//       `}</style>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {ThemeToggle} from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Menu,
  X,
  CheckCircle,
  AlertCircle,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [focusedField, setFocusedField] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Google Sign-In Initialization
  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          callback: handleGoogleSignIn,
          auto_select: false,
          cancel_on_tap_outside: false,
        });
      }
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.head.appendChild(script);
    } else {
      initializeGoogleSignIn();
    }
  }, []);

  // const handleGoogleSignIn = async (response: any) => {
  //   setError("");
  //   setSuccess("");
    
  //   try {
  //     const res = await fetch("http://localhost:8000/google-auth", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ id_token: response.credential })
  //     });
      
  //     const data = await res.json();
      
  //     if (!res.ok) {
  //       setError(data.detail || "Google sign-in failed");
  //     } else {
  //       localStorage.setItem("access_token", data.access_token);
  //       sessionStorage.setItem("access_token", data.access_token);
  //       setSuccess("Google sign-in successful! Redirecting...");
  //       setTimeout(() => router.push("/dashboard"), 100);
  //     }
  //   } catch (err) {
  //     setError("Google login failed: network error");
  //   } finally {
  //     setGoogleLoading(false);
  //   }
  // };
 const handleGoogleSignIn = async (response: any) => {
    setError("");
    setSuccess("");
    
    try {
      // Use google-login endpoint instead of google-auth for login page
      const res = await fetch("http://localhost:8000/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_token: response.credential })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        // Handle specific error for non-existing users
        if (res.status === 404 || data.detail?.includes("not found") || data.detail?.includes("No account")) {
          setError("No account found with this Google account. Please register first or use email/password login.");
        } else {
          setError(data.detail || "Google sign-in failed");
        }
      } else {
        localStorage.setItem("access_token", data.access_token);
        sessionStorage.setItem("access_token", data.access_token);
        setSuccess("Google sign-in successful! Redirecting...");
        setTimeout(() => router.push("/dashboard"), 10);
      }
    } catch (err) {
      setError("Google login failed: network error");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleButtonClick = () => {
    if (!window.google) {
      setError("Google Sign-In is not loaded yet. Please try again.");
      return;
    }

    setGoogleLoading(true);
    setError("");
    setSuccess("");

    try {
      // Create a temporary hidden div for the Google button
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.top = '-1000px';
      tempDiv.id = 'temp-google-btn';
      document.body.appendChild(tempDiv);

      // Render the Google button and trigger click
      window.google.accounts.id.renderButton(tempDiv, {
        theme: 'outline',
        size: 'large',
        type: 'standard',
        text: 'signin_with',
        width: 200
      });

      // Auto-click the button
      setTimeout(() => {
        const googleBtn = tempDiv.querySelector('div[role="button"]');
        if (googleBtn) {
          (googleBtn as HTMLElement).click();
        } else {
          // Fallback: use prompt
          window.google.accounts.id.prompt();
        }
        
        // Clean up
        setTimeout(() => {
          if (document.body.contains(tempDiv)) {
            document.body.removeChild(tempDiv);
          }
        }, 100);
      }, 100);

    } catch (err) {
      setError("Failed to initialize Google Sign-In");
      setGoogleLoading(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.detail || "Login failed");
        setLoading(false);
        return;
      }
      if (rememberMe) {
        localStorage.setItem("access_token", data.access_token);
        sessionStorage.setItem("access_token", data.access_token);
      } else {
        localStorage.setItem("access_token", data.access_token);
        sessionStorage.setItem("access_token", data.access_token);
      }
      router.push("/dashboard");
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 z-0"></div>
      </div>

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
              {["Features", "Pricing", "Register"].map((item) => (
                <a
                  key={item}
                  href={item === "Register" ? "/register" : `/#${item.toLowerCase()}`}
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
                {["Features", "Pricing", "Register"].map((item) => (
                  <a
                    key={item}
                    href={item === "Register" ? "/register" : `/#${item.toLowerCase()}`}
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

      {/* Login Form */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-md animate-fade-in-up">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-purple-500/10 p-8 border border-gray-200/50 dark:border-gray-700/50">
            <div className="space-y-2 text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl animate-bounce-slow">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Login
              </h1>
              <p className="text-gray-600 dark:text-gray-400">Access your LinkedBoost account</p>
            </div>

            {/* Google Sign-In Section */}
            <div className="mb-6">
              {/* Custom Google Sign-In Button */}
              <button
                onClick={handleGoogleButtonClick}
                disabled={googleLoading}
                className="w-full relative bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-3 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3 group"
              >
                {googleLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
                    <span>Signing in with Google...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
                      Continue with Google
                    </span>
                  </>
                )}
              </button>
              
              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/80 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400 backdrop-blur-sm">
                    or continue with email
                  </span>
                </div>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </Label>
                <div className={`relative transform transition-all duration-300 ${focusedField === 'email' ? 'scale-105' : ''}`}>
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                    required
                  />
                  {email && email.includes('@') && (
                    <CheckCircle className="absolute right-3 top-3 w-5 h-5 text-green-500 animate-fade-in" />
                  )}
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </Label>
                <div className={`relative transform transition-all duration-300 ${focusedField === 'password' ? 'scale-105' : ''}`}>
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
                    className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                  />
                  <Label htmlFor="remember">Remember me</Label>
                </div>
                <Link href="/forgot-password" className="text-purple-600 hover:underline">Forgot password?</Link>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>

              {/* Error/Success Messages */}
              {error && (
                <div className="text-red-500 text-center text-sm flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              {success && (
                <div className="text-green-600 text-center text-sm flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  {success}
                </div>
              )}
            </form>

            <div className="text-center text-sm mt-6">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-purple-600 hover:underline">Register</Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}