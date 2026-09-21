import { Hero } from '../components/home/Hero'
import { FeatureHighlights } from '../components/common/FeatureHighlights'
import { PopularRoutes } from '../components/home/PopularRoutes'
import { OfferBanner } from '../components/home/OfferBanner'
import { WhyChooseUs } from '../components/common/WhyChooseUs'
import { Newsletter } from '../components/home/Newsletter'

export const HomePage = () => {
    return (
        <div>
            <Hero />
            <FeatureHighlights />
            <PopularRoutes />
            <OfferBanner />
            <WhyChooseUs />
            <Newsletter />
        </div>
    )
}
