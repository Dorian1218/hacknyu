"use client"

import { LayoutDashboard, MessageCircle, ChartBar } from "lucide-react"
import Profile from "../public/default.svg"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Separator } from "./ui/separator"
import { usePathname } from 'next/navigation'
import { useAuth } from "@/context/AuthContext"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import axios from "axios"
import { useEffect } from "react"

export function AppSidebar() {
  const pathname = usePathname()
  const { user } = useAuth()
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex justify-start gap-1 items-center w-full">
          <Avatar>
            <AvatarImage src={user?.photoURL ? user.photoURL : "/default.svg"} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p>Test User</p>
            <p className="text-sm">{user?.email}</p>
          </div>
        </div>
      </SidebarHeader>
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
