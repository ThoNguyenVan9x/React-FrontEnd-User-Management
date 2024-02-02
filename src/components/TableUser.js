import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";

const TableUser = (props) => {
    const [listUser, setListUser] = useState([]);
    const [totalUser, setTotalUser] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        // call api
        getUsers(1);
    }, []);

    const getUsers = async (pageIndex) => {
        let res = await fetchAllUser(pageIndex);

        if (res && res.data) {
            console.log(res);
            setTotalUser(res.total);
            setListUser(res.data);
            setTotalPage(res.total_pages);
        }
    };

    const handlePageClick = (event) => {
        getUsers(+event.selected + 1);
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser &&
                        listUser.length > 0 &&
                        listUser.map((item, index) => {
                            return (
                                <tr key={`user-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>{item.email}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPage}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
        </>
    );
};

export default TableUser;
