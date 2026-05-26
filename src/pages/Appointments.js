import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import axios from "axios";

function Appointments() {

    const [patients, setPatients] = useState([]);

    const [doctors, setDoctors] = useState([]);

    const [appointments, setAppointments] = useState([]);

    const [patientId, setPatientId] = useState("");

    const [doctorId, setDoctorId] = useState("");

    const [appointmentDate, setAppointmentDate] = useState("");

    const [appointmentTime, setAppointmentTime] = useState("");

    useEffect(() => {

        fetchPatients();

        fetchDoctors();

        fetchAppointments();

    }, []);

    const fetchPatients = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/patients"
            );

            setPatients(response.data);

        }

        catch(error) {

            console.log(error);
        }
    };

    const fetchDoctors = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/doctors"
            );

            setDoctors(response.data);

        }

        catch(error) {

            console.log(error);
        }
    };

    const fetchAppointments = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/appointments"
            );

            setAppointments(response.data);

        }

        catch(error) {

            console.log(error);
        }
    };

    const bookAppointment = async () => {

        const appointmentData = {

            appointmentDate,
            appointmentTime,

            status: "Pending",

            patient: {
                id: patientId
            },

            doctor: {
                id: doctorId
            }
        };

        try {

            await axios.post(
                "http://localhost:8080/appointments",
                appointmentData
            );

            alert("Appointment Booked Successfully");

            setPatientId("");
            setDoctorId("");
            setAppointmentDate("");
            setAppointmentTime("");

            fetchAppointments();

        }

        catch(error) {

            console.log(error);

            alert("Error Booking Appointment");
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

                <h1 style={{ marginBottom: "30px" }}>
                    Appointment Management
                </h1>

                <div
                    style={{
                        backgroundColor: "white",
                        padding: "20px",
                        borderRadius: "10px",
                        width: "500px",
                        marginBottom: "30px"
                    }}
                >

                    <h2>Book Appointment</h2>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "15px",
                            marginTop: "20px"
                        }}
                    >

                        <select
                            value={patientId}
                            onChange={(e) =>
                                setPatientId(e.target.value)
                            }
                            style={{
                                padding: "12px"
                            }}
                        >

                            <option value="">
                                Select Patient
                            </option>

                            {patients.map((patient) => (

                                <option
                                    key={patient.id}
                                    value={patient.id}
                                >

                                    {patient.name}

                                </option>

                            ))}

                        </select>

                        <select
                            value={doctorId}
                            onChange={(e) =>
                                setDoctorId(e.target.value)
                            }
                            style={{
                                padding: "12px"
                            }}
                        >

                            <option value="">
                                Select Doctor
                            </option>

                            {doctors.map((doctor) => (

                                <option
                                    key={doctor.id}
                                    value={doctor.id}
                                >

                                    {doctor.name}
                                    {" - "}
                                    {doctor.specialization}

                                </option>

                            ))}

                        </select>

                        <input
                            type="date"
                            value={appointmentDate}
                            onChange={(e) =>
                                setAppointmentDate(e.target.value)
                            }
                            style={{
                                padding: "12px"
                            }}
                        />

                        <input
                            type="time"
                            value={appointmentTime}
                            onChange={(e) =>
                                setAppointmentTime(e.target.value)
                            }
                            style={{
                                padding: "12px"
                            }}
                        />

                        <button
                            onClick={bookAppointment}
                            style={{
                                padding: "12px",
                                backgroundColor: "#1976d2",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}
                        >

                            Book Appointment

                        </button>

                    </div>

                </div>

                <table
                    border="1"
                    cellPadding="10"
                    style={{
                        width: "100%",
                        backgroundColor: "white",
                        borderCollapse: "collapse"
                    }}
                >

                    <thead
                        style={{
                            backgroundColor: "#1976d2",
                            color: "white"
                        }}
                    >

                        <tr>

                            <th>ID</th>

                            <th>Patient</th>

                            <th>Doctor</th>

                            <th>Date</th>

                            <th>Time</th>

                            <th>Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {appointments.map((appointment) => (

                            <tr key={appointment.id}>

                                <td>{appointment.id}</td>

                                <td>
                                    {appointment.patient?.name}
                                </td>

                                <td>
                                    {appointment.doctor?.name}
                                </td>

                                <td>
                                    {appointment.appointmentDate}
                                </td>

                                <td>
                                    {appointment.appointmentTime}
                                </td>

                                <td>
                                    {appointment.status}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default Appointments;