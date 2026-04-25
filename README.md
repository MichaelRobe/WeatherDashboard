# Weather Dashboard

A modern weather application built with React, TypeScript, and Vite. The dashboard provides current conditions, forecast views, interactive weather maps, and chart-based weather insights for selected locations.

## Demo

Live demo: https://weather-dashboard-green-mu.vercel.app/

## Overview

Weather Dashboard is a route-based single-page app with a collapsible sidebar and two core views:

- Dashboard view for current weather, weather map layers, and weather trend charts
- Forecast view for daily and hourly forecast cards

Location search and selection drives all weather data rendering in the app.

## Built With

- React
- TypeScript
- Vite
- Tailwind
- shadcn/ui
- SWR
- Recharts
- React Leaflet
- Vitest
- Playwright

## Features

- Search and set location from the sidebar
- Current weather summary card
- Interactive weather map with multiple OpenWeather tile layers
- Metric charts for temperature, apparent temperature, rain, and wind speed
- Forecast page with:
	- 7-day forecast card
	- 14-day forecast card
	- 24-hour forecast card
- Responsive layout with sidebar-based navigation

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_OPEN_WEATHER_MAP_API_KEY=your_api_key_here
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Type-check and build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint
- `npm run format` - Run Prettier on TypeScript files
- `npm run typecheck` - Run TypeScript checks without emitting
- `npm run test:unit` - Run unit tests (Vitest)
- `npm run test:e2e` - Run end-to-end tests (Playwright)

## Testing

### Unit Tests

```bash
npm run test:unit
```

### End-to-End Tests

```bash
npx playwright install
npm run test:e2e
```

## Project Structure

```text
src/
	api/            # API hooks and request builders
	components/     # UI components and dashboard cards
	config/         # Static app configuration
	context/        # React context providers
	hooks/          # Custom hooks
	lib/            # Utility modules and shared types
	views/          # Route-level views
tests/
	unit/           # Vitest unit tests
	e2e/            # Playwright end-to-end tests
```

## TODO List

- [ ] Extend available dashboard metrics
- [ ] Implement browser Geolocation API as the default location source
- [ ] Extend test coverage
- [ ] Add Dockerfile

## License

Distributed under the MIT License.
