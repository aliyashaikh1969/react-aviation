import React from 'react'
import { Navbar } from './components/Navbar/Navbar'
import { Home } from './components/Home/Home'
import { Features } from './components/Features/Features'
import { Popular } from './components/popular/Popular'
import { OfferBanner } from './components/Offer-Banner/OfferBanner'
import { WhyChooseUs } from './components/WhyChoose/WhyChooseUs'
import { NewsLetter } from './components/NewsLetter/NewsLetter'
import { Footer } from './components/Footer/Footer'

export const MainPage = () => {
    return (
        <div>
            <Home/>
            <Features />
            <Popular />
            <OfferBanner />
            <WhyChooseUs />
            <NewsLetter /> 
        </div>
    )
}
