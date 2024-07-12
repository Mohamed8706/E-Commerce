import { Outlet } from "react-router-dom";
import SideBar from "../../Components/Dashboard/sidebar";
import TopBar from "../../Components/Dashboard/topbar";
import { useContext } from "react";
import { WindowSize } from "../../context/windowresize";
import { Menu } from "../../context/menucontext";

export default function Dashboard() {
    const resizeWidth = useContext(WindowSize);
    const menuOpen = useContext(Menu);
    const isOpen = menuOpen.isOpen;
    return (
        <div className="position-relative dashboard">
            <TopBar />
            <div className="content-container" style={{justifyContent: isOpen ? "inherit" : "center"}}>
                <SideBar />
                <div
                    className="content"
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
