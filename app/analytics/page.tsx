"use client";
import { useState } from "react";
import Sidebar from "@/components/sidebar";
import DashboardHeader from "@/components/DashboardHeader";

export default function AnalyticsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex min-h-screen">
        <Sidebar onCollapsedChange={setSidebarCollapsed} />

        <main className="flex-1 p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
          <div className="max-w-4xl mx-auto space-y-8">
            <header className="border-b pb-4">
              <h1 className="text-2xl font-bold">Analytics</h1>
              <p className="text-muted-foreground text-sm">
                Track campaign performance and insights
              </p>
            </header>
            {/* Analytics placeholder */}
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              Graphs and data visualization coming soon.
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}