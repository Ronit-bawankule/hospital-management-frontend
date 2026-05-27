import axios from "axios";

const BASE_URL =
"https://hospital-management-backend-u64d.onrender.com";

export const loginUser = async (
    email,
    password
) => {

    return await axios.post(
        `${BASE_URL}/auth/login`,
        {
            email,
            password
        }
    );
};

export const registerUser = async (
    userData
) => {

    return await axios.post(
        `${BASE_URL}/auth/register`,
        userData
    );
};

export const forgotPassword = async (
    email
) => {

    return await axios.post(
        `${BASE_URL}/auth/forgot-password`,
        { email }
    );
};

export const resetPassword = async (
    token,
    newPassword
) => {

    return await axios.post(
        `${BASE_URL}/auth/reset-password`,
        {
            token,
            newPassword
        }
    );
};

export const getPatients = async () => {

    return await axios.get(
        `${BASE_URL}/patients`
    );
};

export const addPatient = async (
    patientData
) => {

    return await axios.post(
        `${BASE_URL}/patients`,
        patientData
    );
};

export const updatePatient = async (
    id,
    patientData
) => {

    return await axios.put(
        `${BASE_URL}/patients/${id}`,
        patientData
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