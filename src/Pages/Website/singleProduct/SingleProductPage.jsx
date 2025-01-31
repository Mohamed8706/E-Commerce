import { useParams } from "react-router-dom"
import ReactImageGallery from "react-image-gallery";
import axios from "axios";
import { useState } from "react";
import useSWR from "swr";
import { baseUrl, Product, Products } from "../../../Api/Api";
import Cookie from 'cookie-universal';
import { Button, FormControl } from "react-bootstrap";
import { LucideStar, LucideStarHalf, Minus, Plus, Star, StarHalf, StarHalfIcon, StarOff } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faStarHalf, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

export default function SingleProduct() {
    // States
    const [product, setProduct] = useState([]);
    const [img, setImg] = useState([]);
    const [qty, setQty] = useState(1);


    // ID
    const { id } = useParams()

    // Cookies
    const cookie = Cookie();
    const token = cookie.get("e-commerce")
    // Handle Quantity change
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

    // Fetch the Product
    const fetchProduct = async (url) => {
        const {data} = await axios.get(url, {
            headers: {
                Authorization: "Bearer " + token,
            }
        });
        setProduct(data[0]);
        setImg(data[0].images)
    }
    const { mutate } = useSWR(`${baseUrl}/${Product}/${id}`, fetchProduct, {
        revalidateOnFocus: false })
    // Gallery Images
    const images = img.map((img)=> {
            return {
                original: img.image,
                thumbnail: img.image
            }
        })
    // Rating Stars
    const oddRating = Math.floor(Math.min(product.rating , 5))
    const emptyStars = Array.from({length: 5 - oddRating}).map((empty)=> {
        return <Star  stroke="#ffc43f" className="w-6 h-6" />
    })
    const fullStars = Array.from({length: oddRating}).map((star, ind) => {
            return <Star key={ind} fill="#ffc43f" stroke="#ffc43f" className="w-6 h-6" />
    })
    const halfStars = Array.from({length: Math.ceil(product.rating % 2)}).map((halfStar) => {
        return product.rating % 2 > 0.6 ? <FontAwesomeIcon icon={faStarHalfStroke} /> : 
        <Star  stroke="#ffc43f" className="w-6 h-6" />
    })
    const RatingStars = product.rating % 2 == 0 ?  fullStars.concat(emptyStars) : fullStars.concat(halfStars);
    console.log(emptyStars, fullStars, halfStars, oddRating)
    return (
        <div className="m-10">
            <div className="w-full h-full flex gap-y-10 flex-wrap">
                <div className="w-full md:w-2/5  h-full rounded-lg overflow-hidden">
                <ReactImageGallery lazyLoad={true} showFullscreenButton={false} 
                items={images} showBullets={true} showThumbnails={false} showPlayButton={false}/>
                </div>
                <div className="w-full md:w-3/5">
                {/* Card Content */}
                    <div className="flex flex-col md:ms-10 px-10 truncate f-cairo w-full h-full gap-2">
                        <h4 className="text-[#333333] text-trnucate h-10 ">
                            {product.title}
                        </h4>
                        <div className="flex justify-start items-center gap-2 font-bold">
                            {RatingStars}
                            
                        </div>
                        {/* Price And Quantity */}
                        <div className="flex w-full flex-wrap gap-3 mt-1  justify-between">
                            <div className="flex gap-1 flex-col">
                            <h6 className="text-gray-500">Price</h6>
                            <div className="flex gap-3">
                            <h4 className="text-gray-800 font-bold">${product.price}</h4>
                            <p className="text-gray-400 text-lg line-through">
                                ${+product.price + +(product.discount * product.price / 100)}</p>
                            </div>
                            </div>                           
                            <div className="gap-1 flex flex-col">
                            <h6 className="text-gray-500">Quantity</h6>
                            <div className="flex flex-row gap-1 product-qty">
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
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between flex-wrap">

                            <button>
                                <faCartPlus />
                            <FontAwesomeIcon icon={faCartPlus} className="mr-3 hover:text-[#36ce70]  
                            transition-all duration-300" fontSize={27}/>
                            
                            </button>
                        </div>
                    </div>
                
                </div>
            </div>
        </div>
    )
}