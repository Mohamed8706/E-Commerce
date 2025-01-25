import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "../../context/menucontext";
import { useContext, useEffect, useState } from "react";
import Cookie from "cookie-universal";
import axios from "axios";
import { baseUrl, LOGOUT, USER, CAT } from "../../Api/Api";
import { Container, DropdownButton, FormControl } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping, faSearch } from "@fortawesome/free-solid-svg-icons";
import useSWR from "swr";





export default function TopBar() {
    // States
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState("");
    const [cat, setCat] = useState([]);


    // Navigation
    const nav = useNavigate();

    // Cookies and token
    const cookie = Cookie();
    const token = cookie.get("e-commerce");

    // Context
    const menuOpen = useContext(Menu);

    // Get User Details
    useEffect(() => {
        axios
            .get(`${baseUrl}/${USER}`, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
            .then((data) => [setName(data.data.name), setRole(data.data.role)])
            .catch((err) => console.log(err));
    }, []);

    // Function to handle logout
    async function handleLogOut() {
        setLoading(true);
        try {
            const res = await axios.get(
                `${baseUrl}/${LOGOUT}`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                },
                []
            );
            nav("/", { replace: true });
            cookie.remove("e-commerce");
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }
    // Fetch and render Categories
    const fetchCategories = async (url) => {
        const { data } = await axios.get(url);
        setCat(data.slice(-5));
        return data;
    };

    
    const { mutate } = useSWR(
        `${baseUrl}/${CAT}`,
        fetchCategories,
        {
            revalidateOnFocus: false,
        }
    );

    const categoriesShow = cat.map((cat) => <p className="font-medium">{cat.title.substr(0, 12)}...</p>)

    return (
        <nav className="py-3 h-[20%] ">
            <Container style={{marginTop: "0px"}}>
            <div className="flex flex-wrap items-center gap-md-0 gap-4 justify-between">
                <Link to="/" className="col-3 hover:bg-transparent">
                    <img
                        className="w-[200px]"
                        src={require("../../Assets/Elegant_Online_Shopping_Logo_Template-removebg-preview.png")}
                        alt="logo"
                    />
                </Link>
                
            <div className="col-12 col-md-6 order-md-2 order-3 relative">
                <FormControl 
                style={{borderRadius: "100px"}}
                type="search"
                placeholder="Search Product"
                className="shadow-none form-control py-3"
                >
                </FormControl>
                <div className="absolute flex items-center top-50 translate-y-[-50%] right-1 px-6 
                bg-primary  h-[90%] rounded-full cursor-pointer transition hover:scale-95">
                <FontAwesomeIcon  fontSize={23} color="white" icon={faSearch} />
                </div>
            </div>

            <div className="order-md-3 gap-4 order-1 col-3 flex justify-end items-center">
                    {/* {token ? (
                        <DropdownButton id="dropdown-basic-button" title={name}>
                            <NavLink to="/" className={"d-flex align-items-center gap-2 m-2"}>
                                Home
                            </NavLink>

                            {["1999", "1995", "1996"].includes(role) && (
                                <NavLink
                                    to="/dashboard"
                                    className={"d-flex align-items-center gap-2 m-2"}
                                >
                                    Dashboard
                                </NavLink>
                            )}

                            <div onClick={handleLogOut} className="logout m-2">
                                Logout
                            </div>
                        </DropdownButton>
                    ) : (
                        <div className="d-flex align-items-center justfiy-content-around gap-2 p-2">
                            <NavLink to="/login" className={"btn btn-primary bg-transparent"}>
                                Log in
                            </NavLink>
                            <NavLink to="/register" className={"btn btn-primary "}>
                                Get Started
                            </NavLink>
                        </div>
                    )} */}
                    <Link to={"/"} className="hover:bg-transparent">
                    <FontAwesomeIcon  
                    icon={faCartShopping} color="primary" fontSize={25}/>
                    </Link>
                    <Link to={"/"} className="hover:bg-transparent">
                    <FontAwesomeIcon className="bg-primary p-2  rounded-full" 
                    icon={faUserCircle} color="white" fontSize={27}/>
                    </Link>
                </div>
            </div>
            <div className="mt-3">
                <div className="flex flex-row items-center justify-between gap-3 flex-wrap">
                    {categoriesShow}
                </div>
            </div>
            </Container>
        </nav>
    );
}
