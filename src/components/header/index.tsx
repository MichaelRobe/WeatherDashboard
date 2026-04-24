import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { DASHBOARD_VIEWS } from "@/config/dashboard-views"
import { useLocation } from "react-router-dom"

export function Header() {
  const { pathname } = useLocation()

  const activeView = DASHBOARD_VIEWS.find((view) => pathname === view.path)

  return (
    <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2">
      <div className="flex flex-1 items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator orientation="vertical" />
        <Breadcrumb className="p-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              Home
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1">{activeView?.label}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}

export default Header