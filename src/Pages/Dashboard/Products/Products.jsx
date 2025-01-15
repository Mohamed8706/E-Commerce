import { useContext } from "react";
import { useState } from "react";
import { baseUrl, Product, Products } from "../../../Api/Api";
import { Menu } from "../../../context/menucontext";
import { WindowSize } from "../../../context/windowresize";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookie from "cookie-universal";
import TableShow from "../../../Components/Dashboard/Table";
import useSWR from "swr";


export default function ProductsPage() {
  // States
  const [products, setProducts] = useState([]);

  const [noproducts, setNoProducts] = useState(false);
  const menuOpen = useContext(Menu);
  const isOpen = menuOpen.isOpen;
  const resizeWidth = useContext(WindowSize);
  // Cookies
  const cookie = Cookie();
  const token = cookie.get("e-commerce");

  // Get All Categories
  const getProducts = (Products) => {
    axios
      .get(`${baseUrl}/${Products}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => setProducts(data.data))
      .then(() => setNoProducts(true))
      .catch((err) => console.log(err));
  };

  const { mutate } = useSWR(`${Products}`, getProducts);

  // Passing Headers
  const header = [
    {
      value: "title",
      name: "Title",
    },
    {
      value: "description",
      name: "Description",
    },
    {
      value: "price",
      name: "Price",
    },
    {
      value: "images",
      name: "Images",
    },
  ];

  return (
    <div
      className="bg-white p-2"
      style={{
        overflowX: "auto",
        width:
          resizeWidth.windowResizeWidth < "768"
            ? isOpen
              ? "80%"
              : "100%"
            : "100%",
        marginLeft:
          resizeWidth.windowResizeWidth < "768" ? (isOpen ? "10%" : "0") : "",
      }}
    >
      <div className="d-flex align-items-center justify-content-between">
        <h1>Products Page</h1>
        <Link
          className="btn btn-primary"
          to="/dashboard/product/add"
          style={{ color: "black" }}
        >
          Add Product
        </Link>
      </div>
      <TableShow
        header={header}
        mutate={mutate}
        data={products}
        delete={Product}
        deleteIcon={true}
        currentUser=""
    
      />
    </div>
  );
}
