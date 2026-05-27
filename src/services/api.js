import axios from "axios";

const BASE_URL =
"https://hospital-management-backend-u64d.onrender.com";

export const getDoctors = async () => {

    return await axios.get(
        `${BASE_URL}/doctors`
    );
};import axios from "axios";

const BASE_URL =
"https://hospital-management-backend-u64d.onrender.com";

export const getDoctors = async () => {

    return await axios.get(
        `${BASE_URL}/doctors`
    );
};