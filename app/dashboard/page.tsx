"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, MessageSquare, Settings, UserPlus, Users, Menu, X } from "lucide-react"
import Sidebar from "@/components/sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import CredentialModal from "@/components/CredentialModal";

export default function DashboardPage() {
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  

  return (
    <div className="flex min-h-screen flex-col dark:bg-gray-900">
      <DashboardHeader />
       <CredentialModal />

      <div className="flex flex-1 ">
          <Sidebar onCollapsedChange={setSidebarCollapsed} />

        
           <main className={`flex-1 p-4 transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "ml-20" : "ml-64"
        }`}>

           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4  ">
            <Card className="dark:bg-gray-900">
              <CardHeader className="flex flex-row items-center justify-between pb-2 ">
                <CardTitle className="text-sm font-medium">Total Connections</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,248</div>
                <p className="text-xs text-muted-foreground">+24% from last month</p>
              </CardContent>
            </Card>
            <Card className="dark:bg-gray-900">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">+12 new today</p>
              </CardContent>
            </Card>
            <Card className="dark:bg-gray-900">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">867</div>
                <p className="text-xs text-muted-foreground">+18% response rate</p>
              </CardContent>
            </Card>
            <Card className="dark:bg-gray-900">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Campaigns Active</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">2 completing this week</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="mt-6 ">
            <TabsList >
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4 ">
              <Card className="dark:bg-gray-900">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your LinkedIn automation activity from the past 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="rounded-full bg-purple-100 p-2">
                        <UserPlus className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">Connection request sent to John Smith</p>
                        <p className="text-sm text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="rounded-full bg-green-100 p-2">
                        <Users className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Jane Doe accepted your connection request</p>
                        <p className="text-sm text-muted-foreground">5 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="rounded-full bg-pink-100 p-2">
                        <MessageSquare className="h-4 w-4 text-pink-600" />
                      </div>
                      <div>
                        <p className="font-medium">Follow-up message sent to 12 connections</p>
                        <p className="text-sm text-muted-foreground">Yesterday</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <Card className="dark:bg-gray-900">
                <CardHeader>
                  <CardTitle>Connection Analytics</CardTitle>
                  <CardDescription>Your connection growth over time</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex h-full items-center justify-center">
                    <p className="text-muted-foreground">Analytics chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="campaigns" className="space-y-4">
              <Card className="dark:bg-gray-900">
                <CardHeader>
                  <CardTitle>Active Campaigns</CardTitle>
                  <CardDescription>Your currently running automation campaigns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Sales Outreach</h3>
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-600">
                          Active
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Targeting sales professionals in the SaaS industry
                      </p>
                      <div className="mt-4 flex items-center justify-between text-sm">
                        <span>Progress: 68%</span>
                        <span>42/100 connections</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-muted">
                        <div className="h-2 w-[68%] rounded-full bg-purple-600"></div>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Recruitment Campaign</h3>
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-600">
                          Active
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">Finding developers with React experience</p>
                      <div className="mt-4 flex items-center justify-between text-sm">
                        <span>Progress: 35%</span>
                        <span>21/60 connections</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-muted">
                        <div className="h-2 w-[35%] rounded-full bg-pink-600"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
