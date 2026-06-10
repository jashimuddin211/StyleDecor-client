import Hero from "./Hero";
import EventCategories from "./EventCategories";
import HowItWorks from "./HowItWorks";
import HomeServices from "./HomeServices";
import TopDecorators from "../decorators/TopDecorators";
import StatsSection from "./StatsSection";
import Testimonials from "./Testimonials";
import FAQSection from "./FAQSection";
import Newsletter from "./Newsletter";
import Coverage from "./Coverage";

const Home = () => {
    return (
        <div>
            <Hero />
            <EventCategories />
            <HowItWorks />
            <HomeServices />
            <TopDecorators />
            <StatsSection />
            <Testimonials />
            <FAQSection />
            <Newsletter />
            <Coverage />
        </div>
    );
};

export default Home;