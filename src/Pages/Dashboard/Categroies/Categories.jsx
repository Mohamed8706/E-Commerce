import { useContext } from "react"
import { useState } from "react";
import {baseUrl, Cat, CAT } from "../../../Api/Api";
import { Menu } from "../../../context/menucontext";
import { WindowSize } from "../../../context/windowresize";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookie  from 'cookie-universal';
import TableShow from "../../../Components/Dashboard/Table";
import useSWR from "swr";

export default function Categories() {
    // States 
    const [cat, setCat] = useState([]);
    const menuOpen = useContext(Menu);
    const isOpen = menuOpen.isOpen;
    const resizeWidth = useContext(WindowSize);
    const [deleteCat, setDeleteCat] = useState(false);

    // Cookies
    const cookie = Cookie();
    const token = cookie.get("e-commerce")


    // Get All Categories
    const getCategories = (Categories) => {
            axios.get(`${baseUrl}/${Categories}`, {
            headers: {
                Authorization: "Bearer " + token,
            }
        }).then(data => setCat(data.data))
        .catch(err => console.log(err))
    }

    const { mutate } = useSWR(`${CAT}`, getCategories)    

   // Passing Headers 
    const header = [{
        value:'title',
        name: 'Title'
    },
    {
        value: 'image',
        name: 'Image'
    },
]

    return (
    <div className="flex justify-center w-full">
    <div className="bg-white rounded p-3 shadow w-[100%]">
    <div className="d-flex align-items-center justify-content-between">
        <h1>Categories Page</h1>
        <Link className="btn btn-primary" to="/dashboard/category/add" style={{color:"black"}}>Add Category</Link>
        
    </div>
    <TableShow header={header} mutate={mutate} data={cat} delete={Cat} deleteIcon={true} currentUser=""/>
    </div>
    </div>
    )
}