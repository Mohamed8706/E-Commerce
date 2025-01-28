import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import axios from "axios";
import useSWR from "swr";
import { baseUrl } from "../../../Api/Api";
import ProductSkeleton from "./ProductSkeleton";


export default function ProductSection(props) {
  const {title, data} = props;
  const [swiperInstance, setSwiperInstance] = useState({
    beginning: true,
    end: false
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  

  // Fetching data
  const fetchProducts = async (url) => {
      setLoading(true)
      const {data} = await axios.get((url))
      setProducts(data);
      setLoading(false)
      return data;
  }

  const { mutate } = useSWR(`${baseUrl}/${data}`, fetchProducts, 
    {
      revalidateOnFocus: false, 
    })
  




  return (
    <div className="h-full mx-auto px-6 py-20">
      {/* Header and slide buttons */}
      <div className="flex justify-between">
        <h2 className="text-2xl f-cairo font-bold mb-4 ">
          {title}
        </h2>
        <div className="flex gap-2 mb-4">
          <button  style={{color: swiperInstance.beginning ? "#ccc" : "#222222", 
          backgroundColor: swiperInstance.beginning ? "#eaeaea" : "#F1F1F1"}}
            className={`prev flex justify-center items-center transition-all duration-300 
                  w-[38px] h-[38px] rounded-[10px] hover:!bg-${!swiperInstance.beginning && '[#06c44fcc]'} `}
          >
            <ChevronLeft />
          </button>
          <button   style={{color: swiperInstance.end ? "#ccc" : "#222222", 
          backgroundColor: swiperInstance.end ? "#eaeaea" : "#F1F1F1"}}
            className={`next flex justify-center items-center  transition-all duration-300 
          w-[38px] h-[38px] rounded-[10px] hover:!bg-${!swiperInstance.end && '[#06c44fcc]'}`}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Swiper with data */}
      <Swiper
        spaceBetween={20}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          700: {
            slidesPerView: 2,
          },
          930: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          }

        }}
        navigation={{ prevEl: ".prev", nextEl: ".next" }}
        modules={[Navigation]}
        className="product-swipe p-3"
        onSlideChange={(swiper) => setSwiperInstance({beginning : swiper.isBeginning, end: swiper.isEnd})}
        
      >
        {loading ? [1,2,3,4,5,6].map((product, ind) => (
          <SwiperSlide key={ind}>
            <ProductSkeleton  />
          </SwiperSlide>
        )) :
        products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard data={product} />
          </SwiperSlide>
        ))}
        
      </Swiper>
    </div>
  );
}
