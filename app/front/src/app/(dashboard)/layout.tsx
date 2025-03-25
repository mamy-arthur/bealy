"use client";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { logoutApi } from "@/services/userService";
import { AppHeader } from "@/components/app-header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <AppHeader />
      <main className="w-full mt-20">
        {children}
      </main>
    </SidebarProvider>
  )
}
