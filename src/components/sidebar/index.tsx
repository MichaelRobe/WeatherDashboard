import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"

import { Location } from "@/components/location"

import { IconLayoutDashboard, IconChartBar} from "@tabler/icons-react"

export function AppSidebar() {

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
            <Location />
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <IconLayoutDashboard />
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <IconChartBar />
                Forecast
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
  )
}