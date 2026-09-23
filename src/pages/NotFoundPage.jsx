import { Link } from 'react-router-dom'
import { BsAirplaneFill } from 'react-icons/bs'
import { ROUTES } from '../constants/routes'

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-navy/5 flex items-center justify-center">
          <BsAirplaneFill className="text-navy -rotate-45" size={40} />
        </div>
        <p className="text-7xl font-bold text-navy">404</p>
        <h1 className="text-2xl font-semibold text-navy mt-3">This flight has left the runway</h1>
        <p className="text-gray-500 mt-2">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Link
          to={ROUTES.home}
          className="inline-block mt-8 bg-navy hover:bg-navy-dark text-white px-7 py-3 rounded-2xl font-medium transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
