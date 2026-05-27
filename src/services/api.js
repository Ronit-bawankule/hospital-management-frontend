import axios from "axios";

const BASE_URL =
"https://hospital-management-backend-u64d.onrender.com";

export const getPatients = async () => {

    return await axios.get(
        `${BASE_URL}/patients`
    );
};

export const addPatient = async (
    patient
) => {

    return await axios.post(
        `${BASE_URL}/patients`,
        patient
    );
};

export const updatePatient = async (
    id,
    patient
) => {

    return await axios.put(
        `${BASE_URL}/patients/${id}`,
        patient
    );
};

export const deletePatient = async (
    id
) => {

    return await axios.delete(
        `${BASE_URL}/patients/${id}`
    );
};

export const getDoctors = async () => {

    return await axios.get(
        `${BASE_URL}/doctors`
    );
};
