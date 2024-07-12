import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "../../context/menucontext";
import { WindowSize } from "../../context/windowresize";

export default function SideBar() {
    const menuOpen = useContext(Menu);
    const isOpen = menuOpen.isOpen;
    const resizeWidth = useContext(WindowSize);

    return (
        <div className="side-bar pt-3" style={{
            left: resizeWidth.windowResizeWidth < "768" ? (isOpen ? 0 : "-100%") : 0,
            width: isOpen ? (resizeWidth.windowResizeWidth < "768" ? "fit-content" : "190px") : "fit-content"
            }}>
                <NavLink to = { "/dashboard/users" } className = { "d-flex align-items-center gap-2" } style = {{ padding: isOpen ? "10px 8px 10px 15px" : "10px 10px" }
        } >
                <FontAwesomeIcon icon={faUsers} />
                <p style={{display: isOpen ? (resizeWidth.windowResizeWidth < "768" ? "none" : "block") : "none"}}>Users</p>
            </ NavLink>

        </div>
    )
}





