import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { DASHBOARD_VIEWS } from "@/config/dashboard-views"
import { getSystemTheme, useTheme } from "@/components/theme-provider"
import { IconMoonStars, IconSun } from "@tabler/icons-react"
import { useLocation } from "react-router-dom"

export function Header() {
  const { pathname } = useLocation()
  const { theme, setTheme } = useTheme()

  const activeView = DASHBOARD_VIEWS.find((view) => pathname === view.path)
  const isDarkTheme =
    theme === "dark" ||
    (theme === "system" && getSystemTheme() === "dark")

  const handleThemeToggle = () => {
    setTheme(isDarkTheme ? "light" : "dark")
  }

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
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="ml-auto"
          onClick={handleThemeToggle}
        >
          {isDarkTheme ? <IconSun /> : <IconMoonStars />}
        </Button>
      </div>
    </header>
  )
}

export default Header