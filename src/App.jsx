
import './App.css'
import { Features } from './components/Features/Features'
import { Footer } from './components/Footer/Footer'
import { Home } from './components/Home/Home'
import { Navbar } from './components/Navbar/Navbar'
import { NewsLetter } from './components/NewsLetter/NewsLetter'
import { Popular } from './components/popular/Popular'
import { WhyChooseUs } from './components/WhyChoose/WhyChooseUs'
import { OfferBanner } from './components/Offer-Banner/OfferBanner'
import { Results } from './Pages/Fligths/Results'
import { Route, Routes } from 'react-router-dom'
import { FlightsDetails } from './Pages/Fligths/FlightsDetails'
import { Summary } from './Pages/Fligths/Summary'
import { Seats } from './Pages/Fligths/Seats'
import { Payment } from './Pages/Fligths/Payment'
import { NotFound } from './Pages/NotFound'
import { MainPage } from './MainPage'
import { Contact } from './Pages/Contact/Contact'
import { Deals } from './Pages/Deals/Deals'
import { MyTrips } from './Pages/MyTrips/MyTrips'
import Layout from './components/Layout'
import { BookingFlow } from './Pages/BookingFlow'



function App() {
	
	return (
		< div className=''>
			<Routes>
				{/* <Route path='/' element={<MainPage/>}/> */}

				<Route path="/" element={<Layout />}>
					<Route index element={<MainPage />} />

					{/* <Route path="results" element={<Results />} /> */}
					<Route path="flight/:id" element={<FlightsDetails />} />
					
					<Route path='/booking' element={<BookingFlow/>}/>
					<Route path="myTrips" element={<MyTrips />} />
					<Route path="deals" element={<Deals />} />
					<Route path="contact" element={<Contact />} />
				</Route>
				<Route path='*' element={<NotFound />} />

			</Routes>


		</ div>
	)
}

export default App
