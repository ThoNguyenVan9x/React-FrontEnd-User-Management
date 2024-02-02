import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";

const TableUser = (props) => {
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        // call api
        getUsers();
    }, []);

    const getUsers = async () => {
        let res = await fetchAllUser();

        if (res && res.data && res.data.data) {
            setListUser(res.data.data);
        }
    };

    return (
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
    );
};

export default TableUser;
