import "./home.css";
import LandingSection from './../../../Components/Website/Landing/LandingSection';
import ProductSection from "../../../Components/Website/Products/ProductsSection";
import { LatestSale } from "../../../Api/Api";



export default function HomePage() {

    return (
        <>
            <LandingSection />
            <ProductSection title="Deal Of The Day" data={LatestSale}/>
        </>
    );
}
