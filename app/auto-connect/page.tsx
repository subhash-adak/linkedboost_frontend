"use client";
import { useState } from "react";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";

export default function AutoConnectPage() {
   const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  return (
    <div className="flex min-h-screen flex-col">

      <DashboardHeader />
    <div className="flex min-h-screen">
        <Sidebar onCollapsedChange={setSidebarCollapsed} />

      <main className="flex-1 p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <div className="max-w-4xl mx-auto space-y-8">
          <header className="flex items-center justify-between border-b pb-4">
            <div>
              <h1 className="text-2xl font-bold">Auto Connect</h1>
              <p className="text-muted-foreground text-sm">
                Set up and manage your LinkedIn auto-connect campaigns
              </p>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <UserPlus className="h-4 w-4 mr-2" /> New Campaign
            </Button>
          </header>

          {/* Placeholder for campaign cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-lg border p-4 hover:shadow-xl transition-all">
              <h3 className="font-semibold text-lg">Sales Campaign</h3>
              <p className="text-sm text-muted-foreground">
                Targeting tech founders in North America
              </p>
              <div className="mt-4 text-sm text-purple-600 font-medium">42/100 connected</div>
              <div className="mt-2 h-2 bg-muted rounded-full">
                <div className="h-2 w-[42%] rounded-full bg-purple-600"></div>
              </div>
            </div>

            <div className="rounded-lg border p-4 hover:shadow-xl transition-all">
              <h3 className="font-semibold text-lg">Recruitment</h3>
              <p className="text-sm text-muted-foreground">
                Reaching out to frontend developers in India
              </p>
              <div className="mt-4 text-sm text-pink-600 font-medium">21/60 connected</div>
              <div className="mt-2 h-2 bg-muted rounded-full">
                <div className="h-2 w-[35%] rounded-full bg-pink-600"></div>
              </div>
            </div>

            <div className="rounded-lg border p-4 hover:shadow-xl transition-all">
              <h3 className="font-semibold text-lg">Investor Outreach</h3>
              <p className="text-sm text-muted-foreground">
                Connecting with early-stage VCs
              </p>
              <div className="mt-4 text-sm text-green-600 font-medium">18/50 connected</div>
              <div className="mt-2 h-2 bg-muted rounded-full">
                <div className="h-2 w-[36%] rounded-full bg-green-600"></div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
      </div>
  );
}
