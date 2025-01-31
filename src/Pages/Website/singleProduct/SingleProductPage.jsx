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
import RatingStars from "../../../helpers/RatingStars";

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
    const images = Array.from({length: 2}).map((img)=> {
            return {
                original: img.image,
                thumbnail: img.image
            }
        })
    // Rating Stars
    const ratingStars = RatingStars(product.rating)
    const totalPrice = qty * product.price;
    return (
        <div className="pb-16 px-3">
            <div className="w-full flex gap-10 lg:gap-32 flex-wrap">
                <div className="w-full md:w-2/5 rounded-lg overflow-hidden">
                <ReactImageGallery lazyLoad={true} showFullscreenButton={false} 
                items={images} showBullets={true} showThumbnails={false} showPlayButton={false}
                renderItem={(item) => (
                    <div className="h-[400px] w-full overflow-hidden">
                      <img
                        src={item.original}
                        alt=""
                        className="h-full w-full object-contain"
                      />
                    </div>
                  )}
                />
                </div>
                <div className="w-full md:w-2/5">
                {/* Card Content */}
                    <div className="flex flex-col flex-wrap f-cairo w-full h-full gap-4">
                        <h1 className="text-[#333333] text-wrap">
                            {product.title}
                        </h1>
                        <div className="flex justify-start items-center gap-2 font-bold">
                            {ratingStars}
                        </div>
                        {/* Price And Quantity */}
                        <div className="flex w-full flex-wrap gap-3 mt-1  justify-between">
                            <div className="flex gap-1 flex-col">
                            <h6 className="text-gray-500">Price</h6>
                            <div className="flex gap-3">
                            <h2 className="text-gray-800 font-bold">${product.price}</h2>
                            <p className="text-gray-400 text-3xl line-through">
                                ${+product.price + +(product.discount * product.price / 100)}</p>
                            </div>
                            </div>                           
                            <div className="gap-1 flex flex-col">
                            <h6 className="text-gray-500">Quantity</h6>
                            <div className="flex flex-row gap-1 product-qty lg:pr-5">
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
                        {/* Description */}
                        <div className="flex flex-col">
                        <div className="flex flex-col items-start">
                        <h1 className="text-center text-3xl text-gray-500">Description</h1>
                        <span className="w-60 bg-[#eceaea] h-[3px] rounded-3xl"></span>
                        </div>
                        <div className="w-full">
                            <p className="text-wrap text-2xl">{product.description}</p>
                        </div>
                        </div>
                        {/* Total Price And add to cart*/}
                        <div className="flex items-center justify-between flex-wrap">
                            <div className="flex flex-col">
                                <p className="text-gray-400 text-xl">Total Price</p>
                                <p className="text-gray-500 text-3xl">${totalPrice}</p>
                            </div>
                            <button className="btn-second rounded-full w-1/3">
                                Add To Cart
                            </button>
                        </div>
                    </div>
                
                </div>
            </div>
        </div>
    )
}