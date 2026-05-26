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
            disease: disease,

            doctor: {
                id: doctorId
            }
        };

        try {

            await addPatient(patientData);

            alert("Patient Added Successfully");

            setName("");
            setAge("");
            setDisease("");
            setDoctorId("");
            setSpecialization("");

        }

        catch(error) {

            console.log(error);

            alert("Error Saving Patient");
        }
    };

    return (

        <div style={{ display: "flex" }}>

            <Sidebar />

            <div
                style={{
                    marginLeft: "240px",
                    padding: "20px",
                    width: "100%",
                    backgroundColor: "#f5f5f5",
                    minHeight: "100vh"
                }}
            >

                <Navbar />

                <div
                    style={{
                        backgroundColor: "white",
                        padding: "30px",
                        borderRadius: "10px",
                        width: "500px",
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)"
                    }}
                >

                    <h1>Add Patient</h1>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                            marginTop: "20px"
                        }}
                    >

                        <input
                            type="text"
                            placeholder="Enter Patient Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{
                                padding: "12px",
                                fontSize: "16px"
                            }}
                        />

                        <input
                            type="number"
                            placeholder="Enter Age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            style={{
                                padding: "12px",
                                fontSize: "16px"
                            }}
                        />

                        <input
                            type="text"
                            placeholder="Enter Disease"
                            value={disease}
                            onChange={(e) => setDisease(e.target.value)}
                            style={{
                                padding: "12px",
                                fontSize: "16px"
                            }}
                        />

                        <select
                            value={specialization}
                            onChange={(e) => setSpecialization(e.target.value)}
                            style={{
                                padding: "12px",
                                fontSize: "16px"
                            }}
                        >

                            <option value="">
                                Select Specialization
                            </option>

                            <option value="Cardiology">
                                Cardiology
                            </option>

                            <option value="Neurology">
                                Neurology
                            </option>

                            <option value="Orthopedic">
                                Orthopedic
                            </option>

                            <option value="Dermatology">
                                Dermatology
                            </option>

                        </select>

                        <select
                            value={doctorId}
                            onChange={(e) => setDoctorId(e.target.value)}
                            style={{
                                padding: "12px",
                                fontSize: "16px"
                            }}
                        >

                            <option value="">
                                Select Doctor
                            </option>

                            {filteredDoctors.map((doctor) => (

                                <option
                                    key={doctor.id}
                                    value={doctor.id}
                                >

                                    {doctor.name}

                                </option>

                            ))}

                        </select>

                        <button
                            onClick={savePatient}
                            style={{
                                padding: "12px",
                                backgroundColor: "#1976d2",
                                color: "white",
                                border: "none",
                                fontSize: "16px",
                                cursor: "pointer",
                                borderRadius: "5px"
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