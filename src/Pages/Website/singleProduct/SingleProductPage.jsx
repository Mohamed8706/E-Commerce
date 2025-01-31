import { useParams } from "react-router-dom"

import ReactImageGallery from "react-image-gallery";
import axios from "axios";
import { useState } from "react";
import useSWR from "swr";
import { baseUrl, Product, Products } from "../../../Api/Api";
import Cookie from 'cookie-universal';

export default function SingleProduct() {
    // States
    const [product, setProduct] = useState([]);
    const [img, setImg] = useState([]);
 
    // ID
    const { id } = useParams()

    // Cookies
    const cookie = Cookie();
    const token = cookie.get("e-commerce")
    
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
        const images = img.map((img)=> {
            return {
                original: img.image,
                thumbnail: img.image
            }
        })
    return (
        <div className="m-10">
            <div>
                <div className="col-lg-3 col-md-6 col-12 rounded-lg overflow-hidden">
                <ReactImageGallery lazyLoad={true}  items={images} showBullets={true} 
                    showPlayButton={false}/>
                </div>
            </div>
        </div>
    )
}