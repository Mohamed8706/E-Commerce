import { Link, Outlet, useNavigate } from "react-router-dom";
import SideBar from "../../Components/Dashboard/sidebar";
import { useContext, useEffect, useState } from "react";
import { WindowSize } from "../../context/windowresize";
import { Menu } from "../../context/menucontext";
import axios from "axios";
import { baseUrl, LOGOUT, USER, USERS } from "../../Api/Api";
import Cookie  from 'cookie-universal';
import Err403 from "../Auth/Errors/403";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { DropdownButton, NavLink } from "react-bootstrap";
import loadingSubmit from './../../Components/Loading/loading';
import NavButton from "../../Components/Website/Navigation/NavButton";

export default function Dashboard() {
    const resizeWidth = useContext(WindowSize);
    const menuOpen = useContext(Menu);
    const isOpen = menuOpen.isOpen;
    const [name, setName] = useState("");
    const [err, setErr] = useState([]);
    const [loading, setLoading] = useState(false);


  
    // Cookies
    const cookie = Cookie();
    const token = cookie.get("e-commerce")

    // Navigation
    const nav = useNavigate(); 

    // Get User Details
    useEffect(() => {
        axios.get(`${baseUrl}/${USER}`, {
            headers: {
                Authorization: "Bearer " + token,
            }
        })
        .then(data => setName(data.data.name))        
        .catch(err => console.log(err))

    }, [])

    // Top Navigation Bar 
    const showBar = (  
        <div className="flex justify-center w-full">
    <div className="flex p-2 px-3 mb-4 shadow rounded align-center justify-between gap-5 w-[100%] bg-white"> 
        <FontAwesomeIcon onClick={() => menuOpen.setIsOpen(prev => !prev)} 
            icon={faBars} style={{transform:"translateY(-20%)", fontSize:"1.1rem", cursor:"pointer", color: 'black', alignSelf: 'center'}}/>

            <DropdownButton id="dropdown-basic-button"  title={name} >   
                    
                        <Link  to="/" key={1}  className={"d-flex align-items-center gap-2 m-2"}>
                                Home
                        </Link>
                    
                    
                        <Link to="/dashboard" key={2}  className={"d-flex align-items-center gap-2 m-2"}>
                                    Dashboard  
                        </Link>
                
                    <div onClick={handleLogOut} className="logout m-2">
                        Logout
                    </div>

                </DropdownButton>
                </div>
                </div>
            );
    
                    // Function to handle logout
        async function handleLogOut() {
            setLoading(true)
        try {
            const res = await axios.get(`${baseUrl}/${LOGOUT}`, {
                headers: {
                    Authorization: "Bearer " + token,
                }
            }, [])
            nav("/", {replace : true});
            cookie.remove("e-commerce");
            setLoading(false);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>
        {loading && <loadingSubmit />}
       
                <SideBar />
            
            <div className="content-container dashboard h-screen overflow-auto bg-gray-100" >
                    <div style={{width: !isOpen ? resizeWidth.windowResizeWidth > "768" ? "5%" : "0%" : "16.6%"}}  className="w-1/6"></div>
                <div
                style={{width: !isOpen ? resizeWidth.windowResizeWidth > "768" ? "95%" : "100%" : "83.3%"}}
                    className="p-3 "
                >
                    {showBar}
                    <Outlet /> 
                </div>
            </div>
        </>
    );
}
