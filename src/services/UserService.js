import axios from "./customize-axios";

const fetchAllUser = (pageIndex) => {
    return axios.get(`/api/users?page=${pageIndex}`);
};

export { fetchAllUser };
