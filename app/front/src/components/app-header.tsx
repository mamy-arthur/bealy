import { LogOut, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";
import useAuth from "@/hooks/useAuth";
import { logoutApi } from "@/services/userService";

export function AppHeader() {
    const { open } = useSidebar();
    const { logout} = useAuth();
    const handleLogout = async () => {
        await logoutApi();
        logout();
    };
    return (
        <header className="bg-sidebar p-4 flex justify-between items-center fixed w-full top-0 shadow-md z-10" style={{paddingLeft: open ? '16rem': '0rem', transition: '0.3s'}}>
            <SidebarTrigger />
            <Button variant="ghost" className="bg-gray-700 text-white hover:bg-gray-600" onClick={() => handleLogout()}>
                <LogOut className="w-6 h-6" />
            </Button>
        </header>
    );
}