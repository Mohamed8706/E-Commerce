import { Outlet } from "react-router-dom";
import SideBar from "../../Components/Dashboard/sidebar";
import TopBar from "../../Components/Dashboard/topbar";
import { useContext, useEffect, useState } from "react";
import { WindowSize } from "../../context/windowresize";
import { Menu } from "../../context/menucontext";
import axios from "axios";
import { baseUrl, USER, USERS } from "../../Api/Api";
import Cookie  from 'cookie-universal';
import Err403 from "../Auth/Errors/403";

export default function Dashboard() {
    const resizeWidth = useContext(WindowSize);
    const menuOpen = useContext(Menu);
    const isOpen = menuOpen.isOpen;
    const [users, setUsers] = useState([]);
    const [err, setErr] = useState("");

    // Cookies
    const cookie = Cookie();
    const token = cookie.get("e-commerce")


        // Get All Users
    useEffect(() => {
        axios.get(`${baseUrl}/${USERS}`, {
            headers: {
                Authorization: "Bearer " + token,
            }
        }).then(data => setUsers(data))
        .catch(err => setErr(err.response.status))
    }, []);


    return (
        <div className="position-relative dashboard">
            <TopBar bar={true}/>
            <div className="content-container" style={{justifyContent: isOpen ? "inherit" : "center"}}>
                <SideBar />
                <div
                    className="content p-3 bg-gray-100"
                    style={{
                        width:
                            resizeWidth.windowResizeWidth < "768"
                                ? isOpen
                                    ? "96%"
                                    : "100%"
                                : "96%", 
                                marginLeft: isOpen ? (resizeWidth.windowResizeWidth < "768" ? "8%" : "190px") :
                                (resizeWidth.windowResizeWidth > "768" ? "58px" : "0"),
                    }}
                >
                    <Outlet /> 
                </div>
            </div>
        </div>
    );
}
