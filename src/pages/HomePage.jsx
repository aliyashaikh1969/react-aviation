import { Hero } from '../components/home/Hero'
import { FeatureHighlights } from '../components/common/FeatureHighlights'
import { PopularRoutes } from '../components/home/PopularRoutes'
import { OfferBanner } from '../components/home/OfferBanner'
import { WhyChooseUs } from '../components/common/WhyChooseUs'
import { Newsletter } from '../components/home/Newsletter'
import { useScrollToTop } from '../hooks/useScrollToTop'

export const HomePage = () => {
    // every other top-level page does this -- without it, arriving here after scrolling
    // down elsewhere (or navigating back to "/") can leave the visitor stranded mid-page
    // instead of at the hero/search box.
    useScrollToTop();

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
