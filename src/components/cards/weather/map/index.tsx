import { useEffect } from "react"
import { MapContainer, Marker, Popup, TileLayer, useMap, LayersControl } from "react-leaflet"
import { divIcon, type LatLngTuple } from "leaflet"

import { BaseCard } from "@/components/cards/base"
import type { DashboardCardSize } from "@/components/cards/base/config"
import { useLocationContext } from "@/hooks/use-location"


type WeatherMapCardProps = {
  size?: DashboardCardSize
  layer?: "clouds_new" | "precipitation_new" | "pressure_new" | "wind_new" | "temp_new"
}

function SyncMapView({ position }: { position: LatLngTuple }) {
  const map = useMap()

  useEffect(() => {
    map.setView(position, map.getZoom(), { animate: false })
  }, [map, position])

  return null
}

const customIcon = divIcon({
  html: `<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>`,
  className: "",
  iconSize: [12, 12],
  iconAnchor: [6, 6],
})

export function WeatherMapCard({ size = "lg" }: WeatherMapCardProps) {
  const { location } = useLocationContext()
  const position: LatLngTuple = location
    ? [location.latitude, location.longitude]
    : [51.505, -0.09]

  return (
    <BaseCard size={size} empty={!location} className="p-0">
      <MapContainer
        className="h-full w-full"
        center={position}
        zoom={5}
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        touchZoom={false}
        boxZoom={false}
        keyboard={false}
        zoomControl={false}
      >
        <SyncMapView position={position} />
        <TileLayer
          detectRetina={false}
          updateWhenIdle
          keepBuffer={1}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Temperature">
            <TileLayer
              attribution='&copy; <a href="https://openweathermap.org">OpenWeather</a>'
              url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY}`}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Precipitation">
            <TileLayer
              attribution='&copy; <a href="https://openweathermap.org">OpenWeather</a>'
              url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY}`}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Clouds">
            <TileLayer
              attribution='&copy; <a href="https://openweathermap.org">OpenWeather</a>'
              url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY}`}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Wind">
            <TileLayer
              attribution='&copy; <a href="https://openweathermap.org">OpenWeather</a>'
              url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY}`}
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        <Marker position={position} icon={customIcon}>
          <Popup>
            {location ? `${location.name}, ${location.country}` : "Default location"}
          </Popup>
        </Marker>

      </MapContainer>
    </BaseCard>
  )
}

export default WeatherMapCard