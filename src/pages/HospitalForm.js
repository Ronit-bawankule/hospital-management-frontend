import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import { addPatient, getDoctors } from "../services/api";

function HospitalForm() {

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [disease, setDisease] = useState("");

    const [specialization, setSpecialization] = useState("");

    const [doctorId, setDoctorId] = useState("");

    const [doctors, setDoctors] = useState([]);

    const [filteredDoctors, setFilteredDoctors] = useState([]);

    useEffect(() => {

        fetchDoctors();

    }, []);

    const fetchDoctors = async () => {

        try {

            const response = await getDoctors();

            setDoctors(response.data);

        }

        catch(error) {

            console.log(error);

        }
    };

    useEffect(() => {

        const filtered = doctors.filter((doctor) =>
            doctor.specialization === specialization
        );

        setFilteredDoctors(filtered);

    }, [specialization, doctors]);

    const savePatient = async () => {

    const patientData = {

        name: name,
        age: age,
        disease: disease
    };

    try {

        await addPatient(patientData);

        alert("Patient Added Successfully");

        setName("");
        setAge("");
        setDisease("");
        setDoctorId("");
        setSpecialization("");

        window.location.reload();
    }

    catch(error) {

        console.log(error);

        alert("Error Saving Patient");
    }
};

    return (

    <div
        style={{
            display: "flex",
            minHeight: "100vh",
            backgroundColor: "#f5f5f5"
        }}
    >

        <Sidebar />

        <div
            style={{
                flex: 1,
                padding: "20px",
                width: "100%",
                marginLeft: window.innerWidth > 768 ? "240px" : "0"
            }}
        >

            <Navbar />

            <div
                style={{
                    backgroundColor: "white",
                    padding: "30px",
                    borderRadius: "10px",
                    width: "100%",
                    maxWidth: "500px",
                    margin: "20px auto",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)"
                }}
            >

                <h1
                    style={{
                        textAlign: "center",
                        marginBottom: "20px"
                    }}
                >

                    Add Patient

                </h1>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px"
                    }}
                >

                    <input
                        type="text"
                        placeholder="Enter Patient Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                            padding: "12px",
                            fontSize: "16px",
                            width: "100%",
                            boxSizing: "border-box"
                        }}
                    />

                    <input
                        type="number"
                        placeholder="Enter Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        style={{
                            padding: "12px",
                            fontSize: "16px",
                            width: "100%",
                            boxSizing: "border-box"
                        }}
                    />

                    <input
                        type="text"
                        placeholder="Enter Disease"
                        value={disease}
                        onChange={(e) => setDisease(e.target.value)}
                        style={{
                            padding: "12px",
                            fontSize: "16px",
                            width: "100%",
                            boxSizing: "border-box"
                        }}
                    />

                    <button
                        onClick={savePatient}
                        style={{
                            padding: "14px",
                            backgroundColor: "#1976d2",
                            color: "white",
                            border: "none",
                            fontSize: "16px",
                            cursor: "pointer",
                            borderRadius: "5px",
                            width: "100%"
                        }}
                    >

                        Save Patient

                    </button>

                </div>

            </div>

        </div>

    </div>
);
}

export default HospitalForm;