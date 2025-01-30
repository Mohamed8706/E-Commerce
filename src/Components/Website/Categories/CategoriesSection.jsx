import React, { useId, useState } from "react";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import ProductSkeleton from "../../Loading/ProductSkeleton";
import MainSwiper from "../../../helpers/MainSwiper";
import ProductCard from "../Products/ProductCard";
import axios from "axios";
import useSWR from "swr";
import { baseUrl } from "../../../Api/Api";



export default function Categoriesection(props) {
  const {title, endPoint} = props;
  const [fetchedData, setFetchedData] = useState([]);
    const [loading, setLoading] = useState(false);
  // Fetching data
    const fetchData = async (url) => {
        setLoading(true)
        const {data} = await axios.get((url));
        setFetchedData(data);
        setLoading(false)

    }

    const { mutate } = useSWR(`${baseUrl}/${endPoint}`, fetchData, 
        {
        revalidateOnFocus: false, 
        })
  console.log(fetchedData)

    const slides = 
    Array.from({length: 6}).map((item) => <ProductSkeleton />) 
    //  fetchedData.map((item) => <ProductCard data={item}/>)

  return (
    <div className="h-full">
    <MainSwiper title={title} slides={slides} />
    </div>

  );
}
