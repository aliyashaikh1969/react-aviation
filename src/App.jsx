import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTES } from './constants/routes'
import Layout from './components/layout/Layout'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { PageLoader } from './components/ui/PageLoader'
import { HomePage } from './pages/HomePage'

// Home loads right away, the rest is loaded on demand (code splitting)
const BookingPage = lazy(() => import('./pages/booking/BookingPage').then(m => ({ default: m.BookingPage })))
const FlightDetailsPage = lazy(() => import('./pages/FlightDetailsPage').then(m => ({ default: m.FlightDetailsPage })))
const MyTripsPage = lazy(() => import('./pages/MyTripsPage').then(m => ({ default: m.MyTripsPage })))
const DealsPage = lazy(() => import('./pages/DealsPage').then(m => ({ default: m.DealsPage })))
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })))
const AuthPage = lazy(() => import('./pages/AuthPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })))

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path={ROUTES.home} element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path={ROUTES.booking} element={<BookingPage />} />
          <Route path={ROUTES.flightDetails} element={<FlightDetailsPage />} />
          <Route
            path={ROUTES.myTrips}
            element={
              <ProtectedRoute>
                <MyTripsPage />
              </ProtectedRoute>
            }
          />
          <Route path={ROUTES.deals} element={<DealsPage />} />
          <Route path={ROUTES.contact} element={<ContactPage />} />
          <Route path={ROUTES.login} element={<AuthPage />} />

          {/* Old paths, kept working for anyone with a bookmark or an old link from before the
              /myTrips -> /my-trips and /AuthPage -> /login rename. */}
          <Route path="/myTrips" element={<Navigate to={ROUTES.myTrips} replace />} />
          <Route path="/AuthPage" element={<Navigate to={ROUTES.login} replace />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}

export default App

