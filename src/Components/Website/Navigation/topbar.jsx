
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo , useState } from "react";
import axios from "axios";
import { baseUrl, CAT } from "../../../Api/Api";
import { Container, DropdownButton, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faCartShopping, faSearch } from "@fortawesome/free-solid-svg-icons";
import useSWR from "swr";
import LoadingSubmit from '../../Loading/loading';
import Cart from "../Utils/Cart";
import { UserIcon } from './UserIcon';


export default function TopBar() {
    // States
    const [loading, setLoading] = useState(false);
    const [cat, setCat] = useState([]);
    const [show, setShow] = useState(false);




    // Fetch and render Categories
    const fetchCategories = async (url) => {
        setLoading(true)
        const { data } = await axios.get(url);
        setCat(data)
        setLoading(false)
        return data;
    };

    
    const { mutate } = useSWR(
        `${baseUrl}/${CAT}`,
        fetchCategories,
        {
            revalidateOnFocus: false,
        }
    );


// const MemoizedUserIcon = memo(UserIcon);
console.log("topbar")

    return (
        <>
        {loading && <LoadingSubmit />}
        <nav className="py-2 px-3 top-0 right-0 w-full  bg-white">
            <Container style={{marginTop: "0px"}}>
            <div className="flex flex-wrap items-center gap-md-0 gap-4 justify-between">
                <Link to="/" className="col-3 hover:!bg-transparent">
                    <img
                        className="w-[200px]"
                        src={require("../../../Assets/Elegant_Online_Shopping_Logo_Template-removebg-preview.png")}
                        alt="logo"
                    />
                </Link>
            {/* Search Field */}
            <div className="col-12 col-md-6 order-md-2 order-3 relative">
                <FormControl 
                style={{borderRadius: "100px"}}
                type="search"
                placeholder="Search Product"
                className="shadow-none cat-search form-control py-3"
                >
                </FormControl>
                {/* Search Button */}
                <div className="absolute flex items-center top-50 translate-y-[-50%] right-1 px-6 
                bg-primary  h-[90%] rounded-full cursor-pointer transition hover:scale-95">
                <FontAwesomeIcon  fontSize={23} color="white" icon={faSearch} />
                </div>
                {/* Categories */}
                <div className="flex categories absolute top-50 left-1 translate-y-[-50%]
                flex-row items-center gap-5 justify-center flex-wrap h-[90%] rounded-full bg-gray-100">
                    <DropdownButton id="dropdown-basic-button" title="All" 
                    className="font-bold text-lg text-[#333333]">
                        {cat.map((cat, ind) => 
                        <div key={ind}>
                        <Link to="/dashboard" className="">
                        {cat.title.split(" ")[0]}
                        </Link></div>)}
                    </DropdownButton>
                </div>
        
            </div>

            <div className="nav-top order-md-3 gap-4 order-1 col-3 flex justify-end items-center">
                
                

 
                <Cart />
                
            
                <UserIcon />
                </div>
            </div>

            </Container>
        </nav>
        </>
    );
    
}
