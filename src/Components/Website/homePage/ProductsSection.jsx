import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { ArrowBigLeft, ArrowBigRight, ArrowLeft, ArrowLeftCircle, ArrowLeftIcon, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "react-bootstrap";
import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    image: "../../../Assets/grocery.jpg",
    title: "Sunstar Fresh Melon Juice",
    discount: "15%",
    price: 18.0,
    rating: 4.5,
  },
  {
    id: 2,
    image: "../../../Assets/grocery.jpg",
    title: "Heinz Tomato Ketchup",
    discount: "15%",
    price: 18.0,
    rating: 4.5,
  },
  {
    id: 3,
    image: "../../../Assets/grocery.jpg",
    title: "Fresh Bananas",
    discount: "15%",
    price: 18.0,
    rating: 4.5,
  },
  {
    id: 4,
    image: "../../../Assets/grocery.jpg",
    title: "Fresh Bananas",
    discount: "15%",
    price: 18.0,
    rating: 4.5,
  },
    {
    id: 5,
    image: "../../../Assets/grocery.jpg",
    title: "Fresh Bananas",
    discount: "15%",
    price: 18.0,
    rating: 4.5,
  },
];

export default function ProductCarousel() {
  return (
    <div className="h-full mx-auto px-6 py-20">
    <div className="flex justify-between">
    <h2 className="text-2xl f-cairo font-bold mb-4">Best selling products</h2>
    <div className="flex gap-2 mb-4">    
        <button className="prev flex justify-center items-center hover:bg-[#FFC43F]
        hover:text-white bg-[#F1F1F1] w-[38px] h-[38px] rounded-[10px]"><ChevronLeft /></button>
        <button className="next flex justify-center items-center hover:bg-[#FFC43F] 
         hover:text-white bg-[#F1F1F1] w-[38px] h-[38px] rounded-[10px]"><ChevronRight /></button>
    </div>
    </div>
      <Swiper
        spaceBetween={15}
        slidesPerView={4}
        navigation={{ prevEl: ".prev", nextEl: ".next" }}
        modules={[Navigation]}
        className="product-swipe p-2"
        
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard data={product}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
