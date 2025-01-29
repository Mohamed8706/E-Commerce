import "./home.css";
import LandingSection from './../../../Components/Website/Landing/LandingSection';
import ProductSection from "../../../Components/Website/Products/ProductsSection";
import { LatestProducts, LatestSale, TopProducts } from "../../../Api/Api";
import OurFeatures from "../../../Components/Website/Dividers/OurFeatures";



export default function HomePage() {

    return (
        <>
            <LandingSection />
            <ProductSection title="Deals Of The Day" data={LatestSale} />
            <OurFeatures />
            <ProductSection title="Latest Products" data={LatestProducts}  />
            <ProductSection title="Top Rated Products" data={TopProducts} />
        </>
    );
}
