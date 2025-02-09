"use client"

import { Calendar, Home, Inbox, Search, Settings, LayoutDashboard, MessageCircle, ChartBar } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Separator } from "./ui/separator"
import { usePathname } from 'next/navigation'
import { useAuth } from "@/context/AuthContext"

export function AppSidebar() {
  const pathname = usePathname()
  const {user} = useAuth()
  console.log(pathname)
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={"/dashboard"}>
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={"/chat"}>
                    <MessageCircle />
                    <span>AI Chat</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={"/analysis"}>
                    <ChartBar />
                    <span>Analysis</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator />
        <SidebarGroup>
          {/* {pathname === "/chat" && (

          )}  */}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
