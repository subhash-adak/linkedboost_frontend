// // // filepath: c:\Users\soura\Desktop\linkedin\linkdinProject\frontend\my-app\components\theme-toggle.tsx
// // "use client"

// // import { Moon, Sun } from "lucide-react"
// // import { useTheme } from "next-themes"

// // export function ThemeToggle() {
// //   const { theme, setTheme } = useTheme()

// //   return (
// //     <button
// //       onClick={() => setTheme(theme === "light" ? "dark" : "light")}
// //       className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
// //       aria-label="Toggle theme"
// //     >
// //       <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
// //       <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
// //     </button>
// //   )
// // }"use client"
// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "next-themes";

// export function ThemeToggle() {
//   const { theme, setTheme } = useTheme();

//   return (
//     <button
//       onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//       className="rounded-lg p-2.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
//     >
//       <div className="flex flex-row items-center gap-1">
//         <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//         <Moon className="h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//       </div>
//       <span className="sr-only">Toggle theme</span>
//     </button>
//   );
// }
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-9 h-9 rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
    >
      <div className="relative w-full h-full">
        <Sun
          className={`absolute inset-0 h-6 w-6 transition-opacity ${
            theme === "dark" ? "opacity-0" : "opacity-100"
          }`}
        />
        <Moon
          className={`absolute inset-0 h-6 w-6 transition-opacity ${
            theme === "dark" ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
