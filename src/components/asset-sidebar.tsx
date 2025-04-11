"use client"

import { BarChart3, MapPin, Building2, Database, Library, Factory, Settings, Users2, Container } from "lucide-react"
import { UserButton, useClerk } from "@clerk/nextjs"

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
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

import { usePathname } from 'next/navigation'
import Link from 'next/link'



const navItems = [
  {
    title: "Asset Management",
    items: [
      {
        title: "Dashboard",
        icon: BarChart3,
        url: "/app",
        isActive: true,
      },
      {
        title: "Assets",
        icon: Database,
        url: "/app/assets",
      },
      {
        title: "Models",
        icon: Container,
        url: "#",
      },
      {
        title: "Manufacturers",
        icon: Factory,
        url: "#",
      },
      {
        title: "Locations",
        icon: MapPin,
        url: "#",
      },
      {
        title: "Bulk Assets",
        icon: Library,
        url: "#",
      },
    ]
  },
  {
    title: "Management",
    items: [
      {
        title: "Team",
        icon: Users2,
        url: "#",
      },
      {
        title: "Companies",
        icon: Building2,
        url: "#",
      },
      {
        title: "Settings",
        icon: Settings,
        url: "#",
      },
    ]
  }
]

export function AssetSidebar() {
  const clerkData = useClerk()
  const userData = clerkData.user;
  const currentPathname = usePathname()


  return (
    <Sidebar>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <div className="flex items-center gap-2 my-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Database className="h-4 w-4" />
          </div>
          <div className="font-semibold">Two Toned RMS</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {navItems.map((item) => (
          <div key={item.title}>
          <SidebarGroup>
          <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {item.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.url == currentPathname}>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        </div>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <Separator className="mb-2" />
        <UserButton showName={true} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
