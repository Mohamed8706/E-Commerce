import { Medal, ShipWheelIcon, Truck } from "lucide-react";
import { Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const features = [
    {
        icon: <Truck className="w-14 h-14"/>,
        title: "Fast Delivery",
        description: "variations of passages of Lorem Ipsum available"
    },
    {
        icon: <ShipWheelIcon className="w-14 h-14"/>,
        title: "Free Shipping",
        description: "variations of passages of Lorem Ipsum available"
    },
    {
        icon: <Medal className="w-14 h-14"/>,
        title: "Best Quality",
        description: "variations of passages of Lorem Ipsum available"
    }
]

export default function OurFeatures() {
    return (
            <section className="my-14 flex justify-between items-center flex-wrap">
                <Container className="flex flex-col gap-12 h-full justify-center">
                    <div className="flex flex-col items-center">
                        <h1 className="font-bold text-center text-6xl">Why Shop With us</h1>
                        <span className="w-20 bg-red-500 h-1"></span>
                    </div>
                    <div className="flex flex-row flex-wrap cursor-pointer w-full gap-9 justify-center ">
                        {features.map((item, ind) => 
                        
                        <div key={ind} className="flex flex-col h-72 text-center rounded-2xl w-full 
                        md:w-[calc(50%-36px)] lg:w-[calc(33.3%-36px)] p-4
                         bg-[#36ce70] items-center justify-center text-white gap-2">
                            {item.icon}
                            <h4>{item.title}</h4>
                            <h5>{item.description}</h5>
                        </div>
                        
                            )}
                    </div>
                    
                </Container>
            </section>
    )
}