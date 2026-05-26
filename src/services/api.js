import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const getPatients = async () => {

    return await axios.get(`${BASE_URL}/patients`);
};

export const addPatient = async (patientData) => {

    return await axios.post(
        `${BASE_URL}/patients`,
        patientData
    );
};

export const updatePatient = async (id, patientData) => {

    return await axios.put(
        `${BASE_URL}/patients/${id}`,
        patientData
    );
};

export const deletePatient = async (id) => {

    return await axios.delete(
        `${BASE_URL}/patients/${id}`
    );
};

export const getDoctors = async () => {

    return await axios.get(`${BASE_URL}/doctors`);
};