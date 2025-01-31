import { Heart, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import "../../../Assets/grocery.jpg";
import { Button,  FormControl, NavLink } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function ProductCard({ data }) {
    const [qty, setQty] = useState(1);
    console.log(data.id)
    const handleDecrease = () => {
        if (qty > 1) {
            setQty((prev) => prev - 1);
        }
    };

    const handleIncrease = () => {
        setQty((prev) => prev + 1);
    };

    const handleInputChange = (e) => {
        setQty(+e.target.value);
    };
    return (
        
        <div className="rounded-2xl p-3 h-[500px] bg-white hover:shadow-xl 
        shadow-custom border relative border-[#fbfbfb]">
            {/* Image */}
            <span className="absolute bg-gray-50 rounded-full hover:bg-[#f03838]
            hover:text-white transition duration-300  top-6 right-6 w-12 h-12 
            flex justify-center cursor-pointer items-center z-50">
                <Heart />
            </span>
            <Link to={`/product/${data.id}`} className="text-[#333333] navigation-link">
            <div className="relative w-full h-64 rounded-lg overflow-hidden cursor-pointer">
                <img
                    src={data.images[0].image}
                    alt={data.title}
                    className="w-full h-full object-cover"
                />

                {data.discount > 0 && 
                <span className="absolute top-1 left-1 m-3 w-14  flex justify-center items-center
                rounded-lg bg-[#a3be4c] text-white font-bold"> -{data.discount}% </span>}
            </div>
            </Link>
            {/* Card Content */}
            <div className="flex flex-col mt-4 truncate w-full h-full gap-2">
                <h4 className="text-[#333333] text-trnucate h-10 font-semibold f-cairo">
                    {data.title}
                </h4>
                <div className="flex justify-start items-center gap-2 font-bold">
                    <Star fill="#ffc43f" stroke="#ffc43f" className="w-6 h-6" />
                    <span>{data.rating}</span>
                </div>
                <div className="flex w-full gap-3 mt-1 items-stretch justify-start">
                    <h4 className="text-gray-800 font-bold">${data.price}</h4>
                    <p className="text-gray-400 text-lg line-through">
                        ${+data.price + +(data.discount * data.price / 100)}</p>
                </div>
                
                <div className="flex items-center justify-between flex-wrap">
                    <div className="product-qty w-1/2 gap-1 flex flex-row">
                        <span>
                            <Button onClick={handleDecrease}>
                                <Minus />
                            </Button>
                        </span>
                        <FormControl
                            type="number"
                            inputMode="numeric"
                            min="1"
                            className="!w-12"
                            value={qty}
                            onChange={handleInputChange}
                        ></FormControl>
                        <span>
                            <Button onClick={handleIncrease}>
                                <Plus />
                            </Button>
                        </span>
                    </div>
                    <button>
                    <FontAwesomeIcon icon={faCartPlus} className="mr-3 hover:text-[#36ce70]  
                    transition-all duration-300" fontSize={27}/>
                    
                    </button>
                </div>
            </div>
            
        </div>
        
    );
}
