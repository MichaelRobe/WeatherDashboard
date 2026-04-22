import { BaseCard } from "@/components/cards/base"
import { useLocationContext } from "@/hooks/use-location"
import type { DashboardCardSize } from "@/components/cards/base/config"

type LocationCardProps = {
  size?: DashboardCardSize
}

export function LocationCard({ size = "sm" }: LocationCardProps) {
  const { location } = useLocationContext()

  return (
    <BaseCard
      title="Selected Location"
      description="Geocoding result from your latest search"
      size={size}
      empty={!location}
    >
      {location ? (
          <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-sm">
            <dt className="text-muted-foreground">Name</dt>
            <dd>{location.name}</dd>

            <dt className="text-muted-foreground">State</dt>
            <dd>{location.state ?? "-"}</dd>

            <dt className="text-muted-foreground">Country</dt>
            <dd>
              {location.country} ({location.countryCode})
            </dd>

            <dt className="text-muted-foreground">Latitude</dt>
            <dd>{location.latitude.toFixed(4)}</dd>

            <dt className="text-muted-foreground">Longitude</dt>
            <dd>{location.longitude.toFixed(4)}</dd>

            <dt className="text-muted-foreground">Timezone</dt>
            <dd>{location.timezone}</dd>
          </dl>
      ) : null}
    </BaseCard>
  )
}

export default LocationCard
