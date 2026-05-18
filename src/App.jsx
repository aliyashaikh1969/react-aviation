
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
import AuthPage from './Pages/AuthPage'
import { useEffect } from 'react'
import axios from "axios";
import { Protected } from './context/Protected'


function App() {

	// useEffect(() => {

	// 	const fetchData = async () => {
	// 		try {
	//             // debugger
	// 			const response = await axios.post(
	// 				"https://ignav.com/api/playground/fares/one-way",
	// 				{
	// 					origin: "DEL",
	// 					destination: "BOM",
	// 					departure_date: "2026-05-20",
	// 				},
	// 				{
	// 					headers: {
	// 						"Content-Type": "application/json",
	// 						"X-Api-Key": "pg_VFAc44c58xnRaSMubDk_0_M2WyrLz9nG",
	// 						"X-Playground-Token": "pg_VFAc44c58xnRaSMubDk_0_M2WyrLz9nG",
	// 					},
	// 				}
	// 			);
	// 				debugger
	// 			console.log("response", response);

	// 			console.log("result", response.data);

	// 		} catch (error) {

	// 			console.log("error", error);

	// 			// Full axios error response
	// 			if (error.response) {
	// 				console.log("Error Data:", error.response.data);
	// 				console.log("Error Status:", error.response.status);
	// 			}
	// 		}
	// 	};

	// 	fetchData();

	// }, []);

	return (
		< div className=''>
			<Routes>
				{/* <Route path='/' element={<MainPage/>}/> */}

				<Route path="/" element={<Layout />}>
					<Route index element={<MainPage />} />

					{/* <Route path="results" element={<Results />} /> */}
					{/* <Route path="flight/:id" element={<FlightsDetails />} /> */}

					<Route path="/booking" element={
						// <Protected>
							<BookingFlow />
						// </Protected>
					}
					/>
					<Route path="/myTrips" element={
						<Protected>
							<MyTrips />
						</Protected>
					} />
					<Route path="deals" element={<Deals />} />
					<Route path="contact" element={<Contact />} />
					<Route path="AuthPage" element={<AuthPage />} />

				</Route>
				<Route path='*' element={<NotFound />} />

			</Routes>


		</ div>
	)
}

export default App
