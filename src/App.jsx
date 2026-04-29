
import './App.css'
import { Features } from './components/Features/Features'
import { Footer } from './components/Footer/Footer'
import { Home } from './components/Home/Home'
import { Navbar } from './components/Navbar/Navbar'
import { NewsLetter } from './components/NewsLetter/NewsLetter'
import { Popular } from './components/popular/Popular'
import {WhyChooseUs  } from './components/WhyChoose/WhyChooseUs'
import {TopDeals  } from './components/TopDeals/TopDeals'
import { OfferBanner } from './components/Offer-Banner/OfferBanner'


function App() {
	return (
		< div className=''>
			<Navbar />
			<Home />
			<Features />
			<Popular/>
			<OfferBanner/>
			<WhyChooseUs/>
			<NewsLetter/>
			<Footer/>
		</ div>
	)
}

export default App
