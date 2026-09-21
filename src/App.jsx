import { Route, Routes } from 'react-router-dom'
import { ROUTES } from './constants/routes'
import Layout from './components/layout/Layout'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { HomePage } from './pages/HomePage'
import { BookingPage } from './pages/booking/BookingPage'
import { FlightDetailsPage } from './pages/FlightDetailsPage'
import { MyTripsPage } from './pages/MyTripsPage'
import { DealsPage } from './pages/DealsPage'
import { ContactPage } from './pages/ContactPage'
import AuthPage from './pages/AuthPage'
import { NotFoundPage } from './pages/NotFoundPage'

function App() {
  return (
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
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
