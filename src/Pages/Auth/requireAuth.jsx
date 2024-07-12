import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie  from 'cookie-universal';
import { useEffect, useState } from "react";
import { baseUrl, USER } from './../../Api/Api';
import LoadingSubmit from './../../Components/Loading/loading';
import { AXIOS } from "../../Api/axios";
import axios from "axios";


export default function RequireAuth() {
    // User
    const [user, setUser] = useState("");
    const nav = useNavigate(); 
    const cookie = Cookie();
    const token = cookie.get("e-commerce");
    
    useEffect(() => {
        axios.get(`${baseUrl}/${USER}`, {
            headers: {
                Authorization: "Bearer " + token,
            }
        })
        .then(data => setUser(data.data))        
        .catch(() => nav("/login", {replace : true}))

    }, [])



    return token ? (user === "" ? (<LoadingSubmit />) : (<Outlet />) ) : (<Navigate to={"/login"}  replace={true}/>);
}