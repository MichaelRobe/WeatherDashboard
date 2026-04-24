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
import { DASHBOARD_VIEWS } from "@/config/dashboard-views"
import { NavLink, useLocation } from "react-router-dom"

export function AppSidebar() {
  const { pathname } = useLocation()

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
            {DASHBOARD_VIEWS.map((view) => {
              const Icon = view.icon
              const isActive = pathname === view.path

              return (
                <SidebarMenuItem key={view.id}>
                  <SidebarMenuButton asChild isActive={isActive} tooltip={view.label}>
                    <NavLink to={view.path}>
                      <Icon />
                      {view.label}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
  )
}