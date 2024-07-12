import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "../../context/menucontext";
import { useContext } from "react";



export default function TopBar() {
    const menuOpen = useContext(Menu);
    return (
        <div className="top-bar d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-5"> 
            <h5>E-Commerce</h5>
            <FontAwesomeIcon onClick={() => menuOpen.setIsOpen(prev => !prev)} icon={faBars} style={{transform:"translateY(-20%)", fontSize:"1.1rem", cursor:"pointer"}}/>
            </div>
        </div>
    )
}