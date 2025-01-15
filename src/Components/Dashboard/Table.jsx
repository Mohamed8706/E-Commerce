import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { baseUrl } from "../../Api/Api";
import Cookie from "cookie-universal";
import TableLoading from "./../Loading/tableLoading";
import PaginatedItems from "./Pagination/Pagination";

export default function TableShow(props) {
    const currentUser = props.currentUser || {
        name: "",
    };

    const { data, header, limit, page, setLimit, setPage, mutate, loading } =
        props;

    // Cookies
    const cookie = Cookie();
    const token = cookie.get("e-commerce");

    // Handle Delete Button
    async function handleDelete(id) {
        try {
        axios
            .delete(`${baseUrl}/${props.delete}/${id}`, {
            headers: {
                Authorization: "Bearer " + token,
            },
            })
            .then(() => mutate());
        } catch (err) {
        console.log(err);
        }
    }

    const headerShow = header.map((item, key) => <th key={key}>{item.name}</th>);

    const dataShow = data?.data?.map((item) => (
        <tr key={item.id}>
        <td>
            <div className="flex flex-row w-full h-full items-center justify-center">
            {item.id}
            </div>
        </td>
        {header.map((item2) => (
            <td key={item2.value}>
            <div className="flex flex-row h-full gap-2 items-center justify-center flex-wrap text-xl">
                {item[item2.value] === "1995" ? (
                "Admin"
                ) : item[item2.value] === "2001" ? (
                "User"
                ) : item[item2.value] === "1996" ? (
                "Writer"
                ) : item[item2.value] === "1999" ? (
                "Product Manager"
                ) : item2.value === "image" ? (
                <img
                    className="object-contain w-12"
                    src={item[item2.value]}
                    alt="image"
                />
                ) : item2.value === "images" ? (
                item[item2.value].map((i, idx) => (
                    <img key={idx} src={i.image} alt="in" className="w-12" />
                ))
                ) : (
                <>
                    {item[item2.value]}{" "}
                    {currentUser &&
                    item[item2.value] === props.currentUser.name &&
                    " (You)"}
                </>
                )}
            </div>
            </td>
        ))}
        <td key={`action-${item.id}`} style={{ textAlign: "center" }}>
            <div className="flex flex-row w-full h-full items-center justify-center">
            {item.name !== currentUser.name && (
                <FontAwesomeIcon
                icon={faTrash}
                style={{
                    marginRight: "8px",
                    color: "orangered",
                    cursor: "pointer",
                    width: "30px",
                    height: "30px",
                }}
                onClick={() => handleDelete(item.id)}
                />
            )}
            <Link to={`${item.id}`}>
                <FontAwesomeIcon
                icon={faEdit}
                style={{ cursor: "pointer", width: "30px", height: "30px" }}
                />
            </Link>
            </div>
        </td>
        </tr>
    ));

    return (
        <div className="rounded-[12px] overflow-x-auto ">
        <Table striped hover>
            <thead>
            <tr>
                <th>ID</th>
                {headerShow}
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {loading ? (
                <tr>
                <TableLoading />
                <TableLoading />
                {header.map((item, key) => (
                    <TableLoading key={key} />
                ))}
                </tr>
            ) : (
                dataShow
            )}
            </tbody>
        </Table>
        <div className="flex w-full justify-end gap-3 flex-wrap items-center ">
            <select
            id="number-select"
            value={limit}
            onChange={(e) => setLimit(+e.target.value)}
            className="border w- text-center py-2 rounded-lg"
            >
            <option value="" disabled>
                --Choose a number
            </option>
            <option value={1}>1</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            </select>
            <PaginatedItems data={data} setPage={setPage} />
        </div>
        </div>
    );
    }
