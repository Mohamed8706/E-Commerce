import { Outlet } from "react-router-dom";
import NavButton from "../../Components/Website/homePage/NavButton";
import TopBar from "../../Components/Website/topbar";

export default function Website() {
    return (
        <div className="h-screen w-full">
            <TopBar />
            <Outlet />
            <NavButton />
        </div>
    );
}
