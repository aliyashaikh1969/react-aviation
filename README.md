# SkyAero

Flight search and booking app built with React, Vite, Tailwind CSS and Firebase.
Search flights, pick seats, pay (simulated), and manage bookings and e-tickets.

## Getting started

```bash
yarn install
cp .env.example .env      # then fill in the values (see below)
yarn dev                  # http://localhost:5173
```

| Command        | What it does                                   |
| -------------- | ---------------------------------------------- |
| `yarn dev`     | Dev server (also serves `/api/flights`)        |
| `yarn build`   | Production build into `dist/`                  |
| `yarn preview` | Serve the production build locally             |
| `yarn lint`    | Run ESLint                                     |

## Environment variables

Copy `.env.example` to `.env`. **`.env` is git-ignored: never commit it.**

| Variable                                   | Where it is used | Secret? |
| ------------------------------------------ | ---------------- | ------- |
| `VITE_FIREBASE_API_KEY` and the other `VITE_FIREBASE_*` values | Browser (Firebase Auth + Firestore) | No: public by design. Protect data with Firestore rules and authorized domains. |
| `SERPAPI_KEY`                              | Server only, `api/flights.js` | **Yes** |

Anything prefixed with `VITE_` is bundled into the public JavaScript, so a secret must never use that prefix.
The browser calls our own `/api/flights` endpoint, which adds `SERPAPI_KEY` on the server.

- **Local:** `yarn dev` serves `/api/flights` using the key from `.env`.
- **Vercel:** add the same variables under Project Settings, Environment Variables. `vercel.json` also rewrites all routes to `index.html` so deep links such as `/my-trips` work on refresh.

## Project structure

```
api/                    Serverless functions (Vercel): flights.js proxies SerpApi
src/
  assets/               Images
  components/
    auth/               ProtectedRoute
    booking/            Stepper, PassengerDetails, PaymentMethod, ETicket, ...
    common/             Blocks shared by several pages (FeatureHighlights, WhyChooseUs)
    contact/            ContactSection
    flights/            FlightCard, FlightFilters, FlightOverview, FlightPath, AirportPoint
    home/               Hero, PopularRoutes, OfferBanner, Newsletter
    layout/             Layout, Navbar, Footer
    search/             SearchFlights, SearchSummary, SearchModify
    trips/              TripCard, TripTicket, TripSkeleton
    ui/                 Generic building blocks: PageHero, EmptyState, Field
  config/               env.js: the only place environment variables are read
  constants/            routes, fare, payment labels, trip status
  context/              Auth/Flight/Passenger context objects and providers
  data/                 Static data (seat layout)
  hooks/                useAuth, useFlight, usePassenger, useFare, ...
  pages/                One file per route; pages/booking holds the booking steps
  services/             firebase, bookingService (Firestore), flightService (/api/flights)
  utils/                format, flight, airports, pdf, booking
```

### Conventions

- Components and pages: `PascalCase.jsx`; hooks: `useThing.js`; utilities, constants and services: `camelCase.js`.
- Folders are lowercase. Components are grouped by feature, not by type.
- Every URL comes from `ROUTES` in `src/constants/routes.js`.
- Money, dates and durations are formatted with `src/utils/format.js`; the fare comes from the `useFare` hook.
- Booking steps are `ResultsStep`, `SeatsStep`, `SummaryStep`, `PaymentStep`, `ConfirmationStep`, wired together by `pages/booking/BookingPage.jsx`.

## Notes

- Payment is a simulation: no money moves and no card data leaves the browser.
- The newsletter, deal-alert and contact forms validate input but do not store it yet.
