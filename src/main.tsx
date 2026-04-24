import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "leaflet/dist/leaflet.css"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { LocationProvider } from "@/context/location/provider.tsx"
import { BrowserRouter } from "react-router-dom"
import { TooltipProvider } from "@/components/ui/tooltip"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <TooltipProvider>
        <ThemeProvider>
          <LocationProvider>
            <App />
          </LocationProvider>
        </ThemeProvider>
      </TooltipProvider>
    </BrowserRouter>
  </StrictMode>
)
