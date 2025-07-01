
// "use client";
// import { useState, useEffect } from "react";
// import { Menu, X, Eye, EyeOff, User, Mail, Lock, CheckCircle, AlertCircle } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { ThemeToggle } from "@/components/theme-toggle";
// export default function RegisterPage() {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [agree, setAgree] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [focusedField, setFocusedField] = useState("");
//   // Add this with other state declarations
// const [lastResendTime, setLastResendTime] = useState<number>(0);
//   const [countdown, setCountdown] = useState<number>(0);
// const [isCountingDown, setIsCountingDown] = useState(false);


// useEffect(() => {
//   if (!isCountingDown) return;

//   const interval = setInterval(() => {
//     const remainingTime = Math.ceil((1 * 60 * 1000 - (Date.now() - lastResendTime)) / 1000);
    
//     if (remainingTime <= 0) {
//       setIsCountingDown(false);
//       setCountdown(0);
//       clearInterval(interval);
//     } else {
//       setCountdown(remainingTime);
//     }
//   }, 1000);

//   return () => clearInterval(interval);
// }, [isCountingDown, lastResendTime]);


//   const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setError("");
//   setSuccess("");

//   // ✅ Basic field validation
//   if (!firstName || !lastName || !email || !password || !confirmPassword) {
//     setError("All fields are required.");
//     return;
//   }

//   if (!agree) {
//     setError("You must agree to the Terms of Service and Privacy Policy.");
//     return;
//   }

//   if (password !== confirmPassword) {
//     setError("Passwords do not match.");
//     return;
//   }

//   setLoading(true);

//  try {
//   const res = await fetch("https://linkedboost-backend.onrender.com/register", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       name: `${firstName} ${lastName}`,
//       email,
//       password,
//     }),
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     // Convert error object to string if needed
//     setError(typeof data.detail === 'object' ? data.detail.msg : data.detail || "Registration failed");
//   } else {
//     setSuccess("Verification email sent. Please check your inbox.");
//       // Add this line to set the initial timestamp
//     setLastResendTime(Date.now());
//     setIsCountingDown(true); // Start countdown
//   }
// } catch (err) {
//   setError("Network error");
// } finally {
//   setLoading(false);
// }
// };


// // Add this function inside your component
// const handleResendVerification = async () => {
//   const now = Date.now();
//   const fiveMinutes = 1 * 60 * 1000; // 5 minutes in milliseconds
  
//   if (now - lastResendTime < fiveMinutes) {
//     // const remainingTime = Math.ceil((fiveMinutes - (now - lastResendTime)) / 1000);
//     setError(`Please wait ${countdown} seconds before requesting another email`);
//     return;
//   }

//   try {
//   setLoading(true);
//   const res = await fetch("https://linkedboost-backend.onrender.com/resend-verification", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email }),
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     // Convert error object to string if needed
//     setError(typeof data.detail === 'object' ? data.detail.msg : data.detail || "Failed to resend verification email");
//   } else {
//     setSuccess("Verification email has been resent!");
//     setLastResendTime(now);
//     setIsCountingDown(true); // Start countdown
//   }
// } catch (err) {
//   setError("Network error");
// } finally {
//   setLoading(false);
// }
// };


// const router = useRouter();

// useEffect(() => {
//   const channel = new BroadcastChannel("email-verification");

//   channel.onmessage = (event) => {
//     if (event.data.status === "verified") {
//       setSuccess("Email verified! Redirecting to dashboard...");
//       setError("");

//       // ✅ Acknowledge the verification broadcast so verify tab can auto-close
//     channel.postMessage({ status: "acknowledged" });


//       // ⏳ Wait 2 seconds and redirect
//       setTimeout(() => {
//         router.push("/dashboard");
//       }, 1000);
//     }
//   };

//   return () => channel.close();
// }, []);

//   const getPasswordStrength = (pwd: string | any[]) => {
//     let strength = 0;
//     const pwdStr = String(pwd);
//     if (pwdStr.length >= 8) strength++;
//     if (/[A-Z]/.test(pwdStr)) strength++;
//     if (/[0-9]/.test(pwdStr)) strength++;
//     if (/[^A-Za-z0-9]/.test(pwdStr)) strength++;
//     return strength;
//   };

//   const passwordStrength = getPasswordStrength(password);
//   const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"];
//   const strengthLabels = ["Weak", "Fair", "Good", "Strong"];

//   return (
//     <div className="flex min-h-screen flex-col bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
//       {/* Animated Background */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
//         <div className="absolute top-40 left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
//       </div>

//       {/* Header */}
//       <header className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 z-50 transition-all duration-300">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16 lg:h-20">
//             {/* Logo */}
//             <div className="flex items-center space-x-4">
//             <a href="/" className="flex items-center space-x-2 flex-shrink-0 group">
//               <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
//                 <span className="text-white font-bold text-sm">L</span>
//               </div>
//               <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                 LinkedBoost
//               </span>
//             </a>
//            <ThemeToggle />
// </div>
//             {/* Desktop Navigation */}
//             <nav className="hidden md:flex items-center space-x-6">
//               {["Features", "Pricing", "Login"].map((item) => {
//   const href =
//     item === "Login" ? "/login" : `/${`#${item.toLowerCase()}`}`; // always root + anchor
//   return (
//     <a
//       key={item}
//       href={href}
//       className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 relative group"
//     >
//       {item}
//       <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
//     </a>
//   );
// })}

//               {/* <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300">
//                 Get Started
//               </button> */}
//             </nav>
           
//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
//             >
//               {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
         
//           {/* Mobile Menu */}
//           <div className={`md:hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
//             <div className="pb-4 border-t border-gray-200 dark:border-gray-700 mt-4">
//               <div className="flex flex-row justify-between items-center gap-2 pt-4 px-2">
//                 {["Features", "Pricing", "Login"].map((item) => {
//   const href = item === "Login" ? "/login" : `/#${item.toLowerCase()}`;
//   return (
//     <a
//       key={item}
//       href={href}
//       className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 relative group"
//     >
//       {item}
//       <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
//     </a>
//   );
// })}

//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 relative z-10">
//         <div className="w-full max-w-md">
//           {/* Animated Card */}
//           <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-2xl shadow-purple-500/10 border border-gray-200/50 dark:border-gray-700/50 p-8 transform animate-fade-in-up">
            
//             {/* Header */}
//             <div className="space-y-2 text-center mb-8">
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mb-4 transform animate-bounce-slow">
//                 <User className="w-8 h-8 text-white" />
//               </div>
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                 Create Account
//               </h1>
//               <p className="text-gray-600 dark:text-gray-400">Join thousands of professionals boosting their LinkedIn presence</p>
//             </div>

//             {/* Form */}
//             <div className="space-y-6">
//               {/* Name Fields */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label htmlFor="first-name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                     First name
//                   </label>
//                   <div className={`relative transform transition-all duration-300 ${focusedField === 'firstname' ? 'scale-105' : ''}`}>
//                     <input
//                       id="first-name"
//                       type="text"
//                       placeholder="John"
//                       value={firstName}
//                       onChange={(e) => setFirstName(e.target.value)}
//                       onFocus={() => setFocusedField('firstname')}
//                       onBlur={() => setFocusedField('')}
//                       className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
//                       required
//                     />
//                     {firstName && (
//                       <CheckCircle className="absolute right-3 top-3 w-5 h-5 text-green-500 animate-fade-in" />
//                     )}
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <label htmlFor="last-name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                     Last name
//                   </label>
//                   <div className={`relative transform transition-all duration-300 ${focusedField === 'lastname' ? 'scale-105' : ''}`}>
//                     <input
//                       id="last-name"
//                       type="text"
//                       placeholder="Doe"
//                       value={lastName}
//                       onChange={(e) => setLastName(e.target.value)}
//                       onFocus={() => setFocusedField('lastname')}
//                       onBlur={() => setFocusedField('')}
//                       className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
//                       required
//                     />
//                     {lastName && (
//                       <CheckCircle className="absolute right-3 top-3 w-5 h-5 text-green-500 animate-fade-in" />
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Email Field */}
//               <div className="space-y-2">
//                 <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                   Email
//                 </label>
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
//                 <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                   Password
//                 </label>
//                 <div className={`relative transform transition-all duration-300 ${focusedField === 'password' ? 'scale-105' : ''}`}>
//                   <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//                   <input
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     onFocus={() => setFocusedField('password')}
//                     onBlur={() => setFocusedField('')}
//                     className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
//                     placeholder="Create a strong password"
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
                
//                 {/* Password Strength Indicator */}
//                 {password && (
//                   <div className="space-y-2 animate-fade-in">
//                     <div className="flex space-x-1">
//                       {[0, 1, 2, 3].map((i) => (
//                         <div
//                           key={i}
//                           className={`h-1 flex-1 rounded-full transition-all duration-300 ${
//                             i < passwordStrength ? strengthColors[passwordStrength - 1] : 'bg-gray-200'
//                           }`}
//                         />
//                       ))}
//                     </div>
//                     {passwordStrength > 0 && (
//                       <p className={`text-xs ${passwordStrength >= 3 ? 'text-green-600' : passwordStrength >= 2 ? 'text-yellow-600' : 'text-red-600'}`}>
//                         Password strength: {strengthLabels[passwordStrength - 1]}
//                       </p>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Confirm Password Field */}
//               <div className="space-y-2">
//                 <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                   Confirm Password
//                 </label>
//                 <div className={`relative transform transition-all duration-300 ${focusedField === 'confirmpassword' ? 'scale-105' : ''}`}>
//                   <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//                   <input
//                     id="confirm-password"
//                     type={showConfirmPassword ? "text" : "password"}
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     onFocus={() => setFocusedField('confirmpassword')}
//                     onBlur={() => setFocusedField('')}
//                     className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
//                     placeholder="Confirm your password"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                   >
//                     {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                   {confirmPassword && (
//                     <div className="absolute right-12 top-3">
//                       {password === confirmPassword ? (
//                         <CheckCircle className="w-5 h-5 text-green-500 animate-fade-in" />
//                       ) : (
//                         <AlertCircle className="w-5 h-5 text-red-500 animate-fade-in" />
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Terms Checkbox */}
//               <div className="flex items-start space-x-3">
//                 <div className="flex items-center h-5">
//                   <input
//                     id="terms"
//                     type="checkbox"
//                     checked={agree}
//                     onChange={(e) => setAgree(e.target.checked)}
//                     className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2 transition-all duration-200"
//                   />
//                 </div>
//                 <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
//                   I agree to the{" "}
//                   <a href="/terms" className="text-purple-600 hover:text-purple-800 underline transition-colors duration-200">
//                     Terms of Service
//                   </a>{" "}
//                   and{" "}
//                   <a href="/privacy" className="text-purple-600 hover:text-purple-800 underline transition-colors duration-200">
//                     Privacy Policy
//                   </a>
//                 </label>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 onClick={handleSubmit}
//                 className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
//               >
//                 {loading && (
//                   <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse"></div>
//                 )}
//                 <span className="relative flex items-center justify-center">
//                   {loading ? (
//                     <>
//                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                       Creating Account...
//                     </>
//                   ) : (
//                     "Create Account"
//                   )}
//                 </span>
//               </button>

//               {/* Error/Success Messages */}
//               {error && (
//                 <div className="flex items-center space-x-2 text-red-600 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg animate-fade-in">
//                   <AlertCircle className="w-4 h-4" />
//                   <span>{error}</span>
//                 </div>
//               )}
             
// {success && (
//   <div className="space-y-4">
//     <div className="flex items-center space-x-2 text-green-600 text-sm bg-green-50 dark:bg-green-900/20 p-3 rounded-lg animate-fade-in">
//       <CheckCircle className="w-4 h-4" />
//       <span>{success}</span>
//     </div>
    
//     <div className="flex flex-col space-y-3">
//       {/* Gmail Button */}
//       <button
//         onClick={() => {
//           const gmailUrl = `https://mail.google.com/mail/u/${email}/#search/subject:(Verify your email)`;
//           window.open(gmailUrl, '_blank');
//         }}
//         className="w-full flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-2 px-4 rounded-lg transition-all duration-200 group"
//       >
//         <img src="https://www.google.com/gmail/about/static/images/logo-gmail.png" 
//              alt="Gmail" 
//              className="w-5 h-5" />
//         <span className="group-hover:text-red-500 transition-colors duration-200">
//           Open Gmail to Verify
//         </span>
//       </button>

//       {/* Resend Verification Button */}
//       <button
//   onClick={handleResendVerification}
//   disabled={loading || isCountingDown}
//   className="w-full flex items-center justify-center space-x-2 bg-purple-50 hover:bg-purple-100 text-purple-600 border border-purple-200 py-2 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
// >
//   <Mail className="w-4 h-4" />
//   <span>
//     {isCountingDown
//       ? `Resend available in ${countdown}s`
//       : "Resend Verification Email"}
//   </span>
// </button>
//     </div>
//   </div>
// )}

//             </div>

//             {/* Login Link */}
//             <div className="text-center text-sm mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
//               <span className="text-gray-600 dark:text-gray-400">Already have an account? </span>
//               <a href="/login" className="text-purple-600 hover:text-purple-800 font-medium underline transition-colors duration-200">
//                 Sign In
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fade-in-up {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         @keyframes fade-in {
//           from { opacity: 0; }
//           to { opacity: 1; }
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
//         .animate-fade-in-up {
//           animation: fade-in-up 0.8s ease-out;
//         }
//         .animate-fade-in {
//           animation: fade-in 0.5s ease-out;
//         }
//         .animate-bounce-slow {
//           animation: bounce-slow 3s ease-in-out infinite;
//         }
//         .animate-blob {
//           animation: blob 7s infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//       `}</style>
//     </div>
//   );
// }


"use client";
import { useState, useEffect } from "react";
import { Menu, X, Eye, EyeOff, User, Mail, Lock, CheckCircle, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

// Extend the Window interface to include google
declare global {
  interface Window {
    google?: any;
  }
}

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [lastResendTime, setLastResendTime] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(0);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const router = useRouter();

  // Countdown timer for resend verification
  useEffect(() => {
    if (!isCountingDown) return;
    const interval = setInterval(() => {
      const remainingTime = Math.ceil((60 * 1000 - (Date.now() - lastResendTime)) / 1000);
      if (remainingTime <= 0) {
        setIsCountingDown(false);
        setCountdown(0);
        clearInterval(interval);
      } else {
        setCountdown(remainingTime);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [isCountingDown, lastResendTime]);

  // Email verification broadcast channel listener
  useEffect(() => {
    const channel = new BroadcastChannel("email-verification");
    channel.onmessage = (event) => {
      if (event.data.status === "verified") {
        setSuccess("Email verified! Redirecting to dashboard...");
        setError("");
        channel.postMessage({ status: "acknowledged" });
        setTimeout(() => {
          router.push("/dashboard");
        }, 10);
      }
    };
    return () => channel.close();
  }, [router]);

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

  // const handleGoogleSignIn = async (response: any) => {
  //   // Don't set loading here as it's already set by the button click
  //   setError("");
  //   setSuccess("");
    
  //   try {
  //     const res = await fetch("https://linkedboost-backend.onrender.com/google-auth", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ id_token: response.credential })
  //     });
      
  //     const data = await res.json();
      
  //     if (!res.ok) {
  //       setError(data.detail || "Google sign-in failed");
  //     } else {
  //       localStorage.setItem("access_token", data.access_token);
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
    // Don't set loading here as it's already set by the button click
    setError("");
    setSuccess("");
    
    try {
      const res = await fetch("https://linkedboost-backend.onrender.com/google-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_token: response.credential })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        // Handle specific error for existing users trying to register
        if (res.status === 409 || data.detail?.includes("already exists")) {
          setError("An account with this Google email already exists. Please use the login page instead.");
        } else {
          setError(data.detail || "Google sign-in failed");
        }
      } else {
        localStorage.setItem("access_token", data.access_token);
        setSuccess("Google registration successful! Redirecting...");
        setTimeout(() => router.push("/dashboard"), 10);
      }
    } catch (err) {
      setError("Google registration failed: network error");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic field validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (!agree) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://linkedboost-backend.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(typeof data.detail === 'object' ? data.detail.msg : data.detail || "Registration failed");
      } else {
        setSuccess("Verification email sent. Please check your inbox.");
        setLastResendTime(Date.now());
        setIsCountingDown(true);
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    const now = Date.now();
    const oneMinute = 1 * 60 * 1000;
    
    if (now - lastResendTime < oneMinute) {
      setError(`Please wait ${countdown} seconds before requesting another email`);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("https://linkedboost-backend.onrender.com/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(typeof data.detail === 'object' ? data.detail.msg : data.detail || "Failed to resend verification email");
      } else {
        setSuccess("Verification email has been resent!");
        setLastResendTime(now);
        setIsCountingDown(true);
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (pwd: string | any[]) => {
    let strength = 0;
    const pwdStr = String(pwd);
    if (pwdStr.length >= 8) strength++;
    if (/[A-Z]/.test(pwdStr)) strength++;
    if (/[0-9]/.test(pwdStr)) strength++;
    if (/[^A-Za-z0-9]/.test(pwdStr)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password);
  const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"];
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-4">
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

      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Animated Card */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-2xl shadow-purple-500/10 border border-gray-200/50 dark:border-gray-700/50 p-8 transform animate-fade-in-up">
            
            {/* Header */}
            <div className="space-y-2 text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mb-4 transform animate-bounce-slow">
                <User className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Create Account
              </h1>
              <p className="text-gray-600 dark:text-gray-400">Join thousands of professionals boosting their LinkedIn presence</p>
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
                  <span className="px-4 bg-white/70 dark:bg-gray-800/70 text-gray-500 dark:text-gray-400 backdrop-blur-sm">
                    or continue with email
                  </span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="first-name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    First name
                  </label>
                  <div className={`relative transform transition-all duration-300 ${focusedField === 'firstname' ? 'scale-105' : ''}`}>
                    <input
                      id="first-name"
                      type="text"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      onFocus={() => setFocusedField('firstname')}
                      onBlur={() => setFocusedField('')}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                      required
                    />
                    {firstName && (
                      <CheckCircle className="absolute right-3 top-3 w-5 h-5 text-green-500 animate-fade-in" />
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="last-name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Last name
                  </label>
                  <div className={`relative transform transition-all duration-300 ${focusedField === 'lastname' ? 'scale-105' : ''}`}>
                    <input
                      id="last-name"
                      type="text"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      onFocus={() => setFocusedField('lastname')}
                      onBlur={() => setFocusedField('')}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                      required
                    />
                    {lastName && (
                      <CheckCircle className="absolute right-3 top-3 w-5 h-5 text-green-500 animate-fade-in" />
                    )}
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
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
                <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className={`relative transform transition-all duration-300 ${focusedField === 'password' ? 'scale-105' : ''}`}>
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
                    className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                    placeholder="Create a strong password"
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
                
                {/* Password Strength Indicator */}
                {password && (
                  <div className="space-y-2 animate-fade-in">
                    <div className="flex space-x-1">
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            i < passwordStrength ? strengthColors[passwordStrength - 1] : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    {passwordStrength > 0 && (
                      <p className={`text-xs ${passwordStrength >= 3 ? 'text-green-600' : passwordStrength >= 2 ? 'text-yellow-600' : 'text-red-600'}`}>
                        Password strength: {strengthLabels[passwordStrength - 1]}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm Password
                </label>
                <div className={`relative transform transition-all duration-300 ${focusedField === 'confirmpassword' ? 'scale-105' : ''}`}>
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => setFocusedField('confirmpassword')}
                    onBlur={() => setFocusedField('')}
                    className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  {confirmPassword && (
                    <div className="absolute right-12 top-3">
                      {password === confirmPassword ? (
                        <CheckCircle className="w-5 h-5 text-green-500 animate-fade-in" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-500 animate-fade-in" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-3">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2 transition-all duration-200"
                  />
                </div>
                <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                  I agree to the{" "}
                  <a href="/terms" className="text-purple-600 hover:text-purple-800 underline transition-colors duration-200">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-purple-600 hover:text-purple-800 underline transition-colors duration-200">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
              >
                {loading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse"></div>
                )}
                <span className="relative flex items-center justify-center">
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </span>
              </button>

              {/* Error/Success Messages */}
              {error && (
                <div className="flex items-center space-x-2 text-red-600 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg animate-fade-in">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}
             
              {success && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-green-600 text-sm bg-green-50 dark:bg-green-900/20 p-3 rounded-lg animate-fade-in">
                    <CheckCircle className="w-4 h-4" />
                    <span>{success}</span>
                  </div>
                  
                  <div className="flex flex-col space-y-3">
                    {/* Gmail Button */}
                    <button
                      onClick={() => {
                        const gmailUrl = `https://mail.google.com/mail/u/${email}/#search/subject:(Verify your email)`;
                        window.open(gmailUrl, '_blank');
                      }}
                      className="w-full flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-2 px-4 rounded-lg transition-all duration-200 group"
                    >
                      <img src="https://www.google.com/gmail/about/static/images/logo-gmail.png" 
                           alt="Gmail" 
                           className="w-5 h-5" />
                      <span className="group-hover:text-red-500 transition-colors duration-200">
                        Open Gmail to Verify
                      </span>
                    </button>

                    {/* Resend Verification Button */}
                    <button
                      onClick={handleResendVerification}
                      disabled={loading || isCountingDown}
                      className="w-full flex items-center justify-center space-x-2 bg-purple-50 hover:bg-purple-100 text-purple-600 border border-purple-200 py-2 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Mail className="w-4 h-4" />
                      <span>
                        {isCountingDown
                          ? `Resend available in ${countdown}s`
                          : "Resend Verification Email"}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Login Link */}
            <div className="text-center text-sm mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Already have an account? </span>
              <a href="/login" className="text-purple-600 hover:text-purple-800 font-medium underline transition-colors duration-200">
                Sign In
              </a>
            </div>
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
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
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
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}