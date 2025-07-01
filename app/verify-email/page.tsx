// // "use client";
// // import { useEffect, useState } from "react";
// // import { useSearchParams, useRouter } from "next/navigation";
// // import Link from "next/link";

// // export default function VerifyEmailPage() {
// //   const searchParams = useSearchParams();
// //   const router = useRouter();
// //   const token = searchParams.get("token");
// //   const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
// //   const [message, setMessage] = useState("");

// //   useEffect(() => {
// //     if (!token) {
// //       setStatus("error");
// //       setMessage("Invalid or missing token.");
// //       return;
// //     }
// //     const verify = async () => {
// //       try {
// //         const res = await fetch(`http://localhost:8000/verify-email?token=${encodeURIComponent(token)}`);
// //         const data = await res.json();
// //         if (!res.ok) {
// //           setStatus("error");
// //           setMessage(data.detail || "Verification failed.");
// //         } else {
// //           setStatus("success");
// //           setMessage("Email verified successfully! Redirecting to dashboard...");
// //           setTimeout(() => {
// //             router.push("/dashboard");
// //           }, 1500);
// //         }
// //       } catch {
// //         setStatus("error");
// //         setMessage("Network error. Please try again later.");
// //       }
// //     };
// //     verify();
// //   }, [token, router]);

// //   return (
// //     <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
// //       <div className="w-full max-w-md space-y-6 text-center">
// //         <h1 className="text-3xl font-bold">Email Verification</h1>
// //         {status === "loading" && <p className="text-muted-foreground">Verifying your email...</p>}
// //         {status === "success" && (
// //           <>
// //             <p className="text-green-600">{message}</p>
// //           </>
// //         )}
// //         {status === "error" && (
// //           <>
// //             <p className="text-red-500">{message}</p>
// //             <Link href="/" className="text-purple-600 hover:underline">Go to Home</Link>
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }


// "use client";
// import { useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";

// export default function VerifyEmailPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const token = searchParams.get("token");
//   const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
//   const [message, setMessage] = useState("");
//   const [ackReceived, setAckReceived] = useState(false);

//   useEffect(() => {
//     if (!token) {
//       setStatus("error");
//       setMessage("Invalid or missing token.");
//       return;
//     }

//     const channel = new BroadcastChannel("email-verification");

//     channel.onmessage = (event) => {
//       if (event.data.status === "acknowledged") {
//         setAckReceived(true);
//         setTimeout(() => {
//           window.close(); // ✅ Auto-close if another tab acknowledged
//         }, 2000);
//       }
//     };

//     const verify = async () => {
//       try {
//         const res = await fetch(`http://localhost:8000/verify-email?token=${encodeURIComponent(token)}`);
//         const data = await res.json();

//         if (!res.ok) {
//           setStatus("error");
//           setMessage(data.detail || "Verification failed.");
//         } else {
//           setStatus("success");
//           setMessage("Email verified! Completing the process...");

//           // ✅ Broadcast to other tabs
//           channel.postMessage({ status: "verified", email: data.email });

//           // Wait up to 5s for another tab to acknowledge
//           setTimeout(() => {
//             if (!ackReceived) {
//               setMessage("Email verified. Redirecting to login...");
//               setTimeout(() => {
//                 router.push("/login");
//               }, 2000);
//             }
//           }, 5000);
//         }
//       } catch {
//         setStatus("error");
//         setMessage("Network error. Please try again later.");
//       }
//     };

//     verify();

//     return () => channel.close();
//   }, [token, router]);

//   return (
//     <div className="flex min-h-screen items-center justify-center px-4 py-12 text-center">
//       <div className="space-y-4 max-w-md">
//         <h1 className="text-2xl font-bold">Email Verification</h1>
//         {status === "loading" && <p className="text-gray-500">Verifying...</p>}
//         {status === "success" && <p className="text-green-600">{message}</p>}
//         {status === "error" && <p className="text-red-500">{message}</p>}
//       </div>
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const [ackReceived, setAckReceived] = useState(false);

  const API=process.env.BACKEND_URL;

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid or missing token.");
      return;
    }

    const channel = new BroadcastChannel("email-verification");

    channel.onmessage = (event) => {
      if (event.data.status === "acknowledged") {
        setAckReceived(true);
        setTimeout(() => {
          window.close();
        }, 2000);
      }
    };


  const verify = async () => {
    try {
      const res = await fetch(`http://localhost:8000/verify-email?token=${encodeURIComponent(token)}`);
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        // Handle error message properly
        setMessage(typeof data.detail === 'string' 
          ? data.detail 
          : Array.isArray(data.detail)
          ? data.detail.map((err: any) => err.msg).join(", ")
          : "Verification failed.");
      } else {
        setStatus("success");
        localStorage.setItem("access_token", data.access_token);
        sessionStorage.setItem("access_token", data.access_token);
        setMessage("Email verified! Completing the process...");

        channel.postMessage({ status: "verified", email: data.email });

        setTimeout(() => {
          if (!ackReceived) {
            setMessage("Email verified. Redirecting to login...");
            setTimeout(() => {
              router.push("/login");
            }, 2000);
          }
        }, 5000);
      }
    } catch (error) {
      setStatus("error");
      setMessage("Network error. Please try again later.");
    }
  };


    verify();

    return () => channel.close();
  }, [token, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900 px-4 py-12">
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-xl animate-fade-in-up">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center animate-bounce-slow">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v9a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Email Verification</h1>

          {status === "loading" && (
            <p className="text-sm text-gray-500 animate-pulse">Verifying your email...</p>
          )}
          {status === "success" && (
            <p className="text-sm text-green-600">{message}</p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-500">{message}</p>
          )}
        </div>
      </div>

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

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
      `}</style>
    </div>
  );
}

import { Suspense } from "react";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}