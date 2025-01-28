import { Heart, Minus, Plus, Star } from "lucide-react";
import "../../../Assets/grocery.jpg";
import { Button, ButtonGroup, FormControl } from "react-bootstrap";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
export default function ProductCard({ data }) {
    const [qty, setQty] = useState(1);
    console.log(data)
    const handleDecrease = () => {
        if (qty > 1) {
            setQty((prev) => prev - 1)
        }
    }

    const handleIncrease = () => {
        setQty((prev) => prev + 1)
    }

    const handleInputChange = (e) => {
        setQty(+e.target.value)
    }
    return (
        <div className="rounded-2xl p-3 h-[515px] bg-white hover:shadow-xl shadow-custom border border-[#fbfbfb]">
            {/* Image */}
            <div className="relative w-full h-64 rounded-lg overflow-hidden cursor-pointer">
                <img
                    src={require("../../../Assets/grocery.jpg")}
                    alt={data.title}
                    className="w-full h-full"
                />
                <span
                    className="absolute bg-gray-50 rounded-full hover:bg-[#f03838]
                hover:text-white transition duration-300  top-1 right-1 w-12 h-12 
                flex justify-center cursor-pointer items-center"
                >
                    <Heart />
                </span>
                <span className="absolute top-1 left-1 m-3 w-14  flex justify-center items-center
                rounded-lg bg-[#a3be4c] text-white font-bold">
                    -{data.discount}%</span>
            </div>
            {/* Card Content */}
            <div className="flex flex-col mt-4 w-full h-full gap-2">
                <h4 className="text-[#333333] h-14 font-semibold f-cairo">{data.title.substr(0, 30)}</h4>
                <div className="flex justify-start items-center gap-2 font-bold">
                    <Star fill="#ffc43f" stroke="#ffc43f"  className="w-6 h-6" />
                    <span>{data.rating}</span>
                </div>
                <h4 className="text-gray-800 font-bold w-full">${data.price}</h4>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="product-qty w-1/2 gap-1 flex flex-row">
                    <span>
                        <Button onClick={handleDecrease}><Minus /></Button>
                    </span>
                        <FormControl type="number" inputMode="numeric" min="1" 
                        className="!w-12" value={qty} onChange={handleInputChange}>
                            
                        </FormControl>
                    <span>
                        <Button onClick={handleIncrease}><Plus /></Button>
                    </span>
                    </div>
                    <Link className="text-[#747474] text-lg font-normal">Add To Cart</Link>
                </div>
            </div>
        </div>
    );
}
