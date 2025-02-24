import {  Outlet } from "react-router-dom";
import { SideBar } from "../../Components/Dashboard/sidebar";
import { useContext } from "react";
import { WindowSize } from "../../context/windowresize";
import { Menu } from "../../context/menucontext";
import NavigationBar from "../../Components/Dashboard/NavBar";


export default function Dashboard() {
    const resizeWidth = useContext(WindowSize);
    const menuOpen = useContext(Menu);
    const isOpen = menuOpen.isOpen;

    return (
        <>
    
                <SideBar />
            <div className="content-container dashboard h-screen overflow-auto bg-gray-100" >
                    <div style={{width: !isOpen ? resizeWidth.windowResizeWidth > "768" ? "5%" : "0%" : "16.6%"}}  className="w-1/6"></div>
                <div
                style={{width: !isOpen ? resizeWidth.windowResizeWidth > "768" ? "95%" : "100%" : "83.3%"}}
                    className="p-3 "
                >
                    <NavigationBar />
                    <Outlet /> 
                </div>
            </div>
        </>
    );
}
