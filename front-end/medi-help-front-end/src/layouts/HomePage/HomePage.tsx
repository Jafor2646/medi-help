import { Footer } from "../NavbarAndFooter/Footer";
import {HomePageBanner} from "./Banner/HomePageBanner";
import {HomeHero} from "./HomeHero/HomeHero";

export const HomePage = () => {
    return (
        <div>
            <HomePageBanner/>
                        
            <HomeHero/>

            <Footer/>
        </div>
    )}