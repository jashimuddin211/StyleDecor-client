import TopDecorators from "../decorators/TopDecorators";
import Coverage from "./Coverage";
import Hero from "./Hero";
import HomeServices from "./HomeServices";


const Home = () => {
    return (
        <div>
            <Hero></Hero>
<TopDecorators></TopDecorators>

            <HomeServices></HomeServices>

            <Coverage></Coverage>
            
            
        </div>
    );
};

export default Home;