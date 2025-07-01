// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { BarChart3, Home, MessageSquare, Settings, UserPlus } from "lucide-react";

// const navItems = [
//   { label: "Dashboard", href: "/dashboard", icon: Home },
//   { label: "Auto Connect", href: "/auto-connect", icon: UserPlus },
//   { label: "Messages", href: "/messages", icon: MessageSquare },
//   { label: "Analytics", href: "/analytics", icon: BarChart3 },
//   { label: "Settings", href: "/settings", icon: Settings },
// ];

// export default function Sidebar() {
//   const pathname = usePathname();
//   const [collapsed, setCollapsed] = useState(true);

//   return (
//     <aside
//       className={` mt-0.5 group/sidebar relative z-40 flex flex-col h-screen bg-muted/40 border-r transition-all duration-300 ease-in-out ${
//         collapsed ? "w-20" : "w-64"
//       }`}
//       onMouseEnter={() => setCollapsed(false)}
//       onMouseLeave={() => setCollapsed(true)}
//     >
//       {/* Sidebar Content */}
//       <div className="flex flex-col h-full">
//         {/* Header */}
        

//         {/* Navigation Items */}
//         <nav className="flex flex-col gap-4 p-2 overflow-y-auto">
//           {navItems.map(({ label, href, icon: Icon }) => (
//             <Link
//               key={label}
//               href={href}
//               className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-blue-200  text-gray-900 text-sm font-medium ${
//                 pathname === href ? "bg-blue-300 text-primary" : "text-muted-foreground"
//               }`}
//             >
//               <Icon className="h-5 w-5" />
//               <span
//                 className={`transition-all duration-200 ${
//                   collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
//                 }`}
//               >
//                 {label}
//               </span>
//             </Link>
//           ))}
//         </nav>
//       </div>
//     </aside>
//   );
// }
"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Home, MessageSquare, Settings, UserPlus } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Auto Connect", href: "/auto-connect", icon: UserPlus },
  { label: "Messages", href: "/messages", icon: MessageSquare },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar({ onCollapsedChange }: { onCollapsedChange?: (collapsed: boolean) => void }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);
  const handleCollapseChange = (isCollapsed: boolean) => {
    setCollapsed(isCollapsed);
    onCollapsedChange?.(isCollapsed);
  };

  return (
    <aside
           className={`fixed left-0 h-[calc(100vh-4rem)] group/sidebar z-40 flex flex-col bg-muted/40 border-r transition-all duration-300 ease-in-out dark:bg-gray-900 ${
        collapsed ? "w-20" : "w-64"
      }`}
      onMouseEnter={() => handleCollapseChange(false)}
      onMouseLeave={() => handleCollapseChange(true)}
    >
      {/* Sidebar Content */}
      <div className="flex flex-col h-full">
        {/* Navigation Items */}
        <nav className="flex flex-col gap-4 p-2">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-blue-200 text-gray-900 text-sm font-medium ${
                pathname === href ? "bg-blue-300 text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span
                className={`transition-all duration-200 ${
                  collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
                }`}
              >
                {label}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}