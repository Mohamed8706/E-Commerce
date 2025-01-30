import React, { useId, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import ProductSkeleton from "../../Loading/ProductSkeleton";
import MainSwiper from "../../../helpers/MainSwiper";
import ProductCard from "../Products/ProductCard";
import axios from "axios";
import useSWR from "swr";
import { baseUrl } from "../../../Api/Api";
import CategoryCard from "./CategoryCard";



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

    const slides = loading ?
    Array.from({length: 6}).map((item) => <ProductSkeleton />) :
      fetchedData.map((item) => <CategoryCard data={item}/>)

  return (
    <div className="h-[500px]">
    <MainSwiper title={title} slides={slides} />
    </div>

  );
}
