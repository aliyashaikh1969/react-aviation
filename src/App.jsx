
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { FlightsDetails } from './Pages/Flights/FlightsDetails'
import { NotFound } from './Pages/NotFound'
import { MainPage } from './MainPage'
import { Contact } from './Pages/Contact/Contact'
import { Deals } from './Pages/Deals/Deals'
import { MyTrips } from './Pages/MyTrips/MyTrips'
import Layout from './components/Layout'
import { BookingFlow } from './Pages/BookingFlow'
import AuthPage from './Pages/AuthPage'
import { useEffect } from 'react'
import { Protected } from './context/Protected'


function App() {

	// VITE_API_KEY = pg_VFAc44c58xnRaSMubDk_0_M2WyrLz9nG

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
	// 	// 					headers: {
	//   "X-Api-Key": import.meta.env.VITE_API_KEY,
	//   "X-Playground-Token": import.meta.env.VITE_API_KEY,
// }
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

			<Route path="/" element={<Layout />}>
				<Route index element={<MainPage />} />

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
