import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import { getPatients } from "../services/api";

function Dashboard() {

    const [patients, setPatients] = useState([]);

    useEffect(() => {

        fetchPatients();

    }, []);

    const fetchPatients = async () => {

        try {

            const response = await getPatients();

            setPatients(response.data);

        }

        catch(error) {

            console.log(error);
        }
    };

    return (

        <div
            style={{
                display: "flex",
                backgroundColor: "#f5f5f5",
                minHeight: "100vh"
            }}
        >

            <Sidebar />

            <div
                style={{
                    flex: 1,
                    padding: "20px",
                    marginLeft:
                        window.innerWidth > 768
                        ? "240px"
                        : "0"
                }}
            >

                <Navbar />

                <h1
                    style={{
                        marginBottom: "30px"
                    }}
                >

                    Dashboard Overview

                </h1>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: "20px"
                    }}
                >

                    <div
                        style={{
                            backgroundColor: "#1976d2",
                            color: "white",
                            padding: "30px",
                            borderRadius: "10px"
                        }}
                    >

                        <h2>Total Patients</h2>

                        <h1>{patients.length}</h1>

                    </div>

                    <div
                        style={{
                            backgroundColor: "#2e7d32",
                            color: "white",
                            padding: "30px",
                            borderRadius: "10px"
                        }}
                    >

                        <h2>Total Doctors</h2>

                        <h1>3</h1>

                    </div>

                    <div
                        style={{
                            backgroundColor: "#ed6c02",
                            color: "white",
                            padding: "30px",
                            borderRadius: "10px"
                        }}
                    >

                        <h2>Total Appointments</h2>

                        <h1>12</h1>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;