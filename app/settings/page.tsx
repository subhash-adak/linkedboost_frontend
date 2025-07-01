"use client";
import { useState } from "react";
import Sidebar from "@/components/sidebar";
import DashboardHeader from "@/components/DashboardHeader";

export default function SettingsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex min-h-screen">
        <Sidebar onCollapsedChange={setSidebarCollapsed} />

        <main className="flex-1 p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
          <div className="max-w-4xl mx-auto space-y-8">
            <header className="border-b pb-4">
              <h1 className="text-2xl font-bold">Settings</h1>
              <p className="text-muted-foreground text-sm">
                Configure your LinkedBoost preferences
              </p>
            </header>
            {/* Settings placeholder */}
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              Settings options will appear here.
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
