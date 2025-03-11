"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
//import AppMenubar from "@/components/app-menubar"
import useAuth from "@/hooks/useAuth"
//import { getServerSideProps } from "@/services/userService";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const {user, logout} = useAuth();
  if (!user) {
    return <>Chargement...</>
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
