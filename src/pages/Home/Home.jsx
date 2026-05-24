import TopDecorators from "../decorators/TopDecorators";
import Hero from "./Hero";
import HomeServices from "./HomeServices";


const Home = () => {
    return (
        <div>
            <Hero></Hero>
<TopDecorators></TopDecorators>

            <HomeServices></HomeServices>
            
            
        </div>
    );
};

export default Home;