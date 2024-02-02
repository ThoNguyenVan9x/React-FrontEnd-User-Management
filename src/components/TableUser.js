import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import ModalDelete from "./ModalDelete";
import _ from "lodash";

const TableUser = (props) => {
    const [listUser, setListUser] = useState([]);
    const [totalUser, setTotalUser] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

    const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});

    const [isShowModalDeleteUser, setIsShowModalDeleteUser] = useState(false);
    const [dataUserDelete, setDataUserDelete] = useState({});

    const handleEditUser = (user) => {
        setDataUserEdit(user);
        setIsShowModalEditUser(true);
    };

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEditUser(false);
        setIsShowModalDeleteUser(false);
    };

    const handleUpdateTable = (user) => {
        setListUser([user, ...listUser]);
    };

    const handleEditUserFromModal = (user) => {
        let cloneListUser = _.cloneDeep(listUser);
        let index = listUser.findIndex((item) => item.id === user.id);
        cloneListUser[index].first_name = user.first_name;
        setListUser(cloneListUser);
    };

    const handleDeleteUser = (user) => {
        setIsShowModalDeleteUser(true);
        setDataUserDelete(user);
    };

    const handleDeleteUserFromModal = (user) => {
        let cloneListUser = _.cloneDeep(listUser);

        cloneListUser = cloneListUser.filter((item) => item.id !== user.id);
        setListUser(cloneListUser);
    };

    useEffect(() => {
        // call api
        getUsers(1);
    }, []);

    const getUsers = async (pageIndex) => {
        let res = await fetchAllUser(pageIndex);

        if (res && res.data) {
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
            <div className="my-3 add-new-user">
                <b>List User:</b>
                <button
                    className="btn btn-primary"
                    onClick={() => setIsShowModalAddNew(true)}
                >
                    Add new User
                </button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>
                            ID <i className="fa-solid fa-sort"></i>
                        </th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Action</th>
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
                                    <td>
                                        <button
                                            className="btn btn-primary mx-3"
                                            onClick={() => handleEditUser(item)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-warning"
                                            onClick={() =>
                                                handleDeleteUser(item)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
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
            <ModalAddNew
                handleShow={isShowModalAddNew}
                handleClose={handleClose}
                handleUpdateTable={handleUpdateTable}
            />
            <ModalEditUser
                handleShow={isShowModalEditUser}
                dataUserEdit={dataUserEdit}
                handleClose={handleClose}
                handleEditUserFromModal={handleEditUserFromModal}
            />
            <ModalDelete
                handleShow={isShowModalDeleteUser}
                handleClose={handleClose}
                dataUserDelete={dataUserDelete}
                handleDeleteUserFromModal={handleDeleteUserFromModal}
            />
        </>
    );
};

export default TableUser;
