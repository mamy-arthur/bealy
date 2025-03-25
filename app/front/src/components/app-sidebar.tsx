import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { data } from "@/lib/sidebarData"
import Link from "next/link"

export function AppSidebar() {
    return (
        <Sidebar className="z-20">
            <SidebarHeader />
            <SidebarContent>
            {data.navMain.map((item) => (
                <SidebarGroup key={item.title}>
                    <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                    <SidebarGroupContent>
                    <SidebarMenu>
                        {item.items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <Link href={item.url}>
                                    <item.icon/>
                                    {item.title}
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            ))}
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
