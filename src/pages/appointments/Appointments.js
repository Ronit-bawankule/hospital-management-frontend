import React, {
    useEffect,
    useState
} from "react";

import Layout
    from "../../components/layout/Layout";

import api
    from "../../services/api";

import "../../styles/tables.css";

const Appointments = () => {

    const [appointments, setAppointments] =
        useState([]);

    const [patients, setPatients] =
        useState([]);

    const [doctors, setDoctors] =
        useState([]);

    const [formData, setFormData] =
        useState({
            patient: "",
            doctor: "",
            appointmentDate: "",
            appointmentTime: "",
            status: "Scheduled"
        });

    const fetchData = async () => {

        try {

            const appointmentResponse =
                await api.get("/api/appointments");

            const patientResponse =
                await api.get("/api/patients");

            const doctorResponse =
                await api.get("/api/doctors");

            setAppointments(
                appointmentResponse.data
            );

            setPatients(
                patientResponse.data
            );

            setDoctors(
                doctorResponse.data
            );

        } catch (error) {

            console.error(error);
        }
    };

    useEffect(() => {

        fetchData();

    }, []);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const payload = {

                patient: {
                    id: formData.patient
                },

                doctor: {
                    id: formData.doctor
                },

                appointmentDate:
                    formData.appointmentDate,

                appointmentTime:
                    formData.appointmentTime,

                status:
                    formData.status
            };

            await api.post(
                "/api/appointments",
                payload
            );

            setFormData({
                patient: "",
                doctor: "",
                appointmentDate: "",
                appointmentTime: "",
                status: "Scheduled"
            });

            fetchData();

        } catch (error) {

            console.error(error);
        }
    };

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Delete appointment?"
            );

        if (!confirmDelete) return;

        try {

            await api.delete(
                `/api/appointments/${id}`
            );

            fetchData();

        } catch (error) {

            console.error(error);
        }
    };

    return (

        <Layout>

            <div className="page-header">

                <h1>
                    Appointment Management
                </h1>

            </div>

            <div className="form-card">

                <h2>
                    Book Appointment
                </h2>

                <form
                    className="patient-form"
                    onSubmit={handleSubmit}
                >

                    <select
                        name="patient"
                        value={formData.patient}
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select Patient
                        </option>

                        {
                            patients.map((patient) => (

                                <option
                                    key={patient.id}
                                    value={patient.id}
                                >

                                    {patient.firstName}
                                    {" "}
                                    {patient.lastName}

                                </option>
                            ))
                        }

                    </select>

                    <select
                        name="doctor"
                        value={formData.doctor}
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select Doctor
                        </option>

                        {
                            doctors.map((doctor) => (

                                <option
                                    key={doctor.id}
                                    value={doctor.id}
                                >

                                    Dr.
                                    {" "}
                                    {doctor.firstName}
                                    {" "}
                                    {doctor.lastName}

                                </option>
                            ))
                        }

                    </select>

                    <input
                        type="date"
                        name="appointmentDate"
                        value={formData.appointmentDate}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="time"
                        name="appointmentTime"
                        value={formData.appointmentTime}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >

                        <option value="Scheduled">
                            Scheduled
                        </option>

                        <option value="Completed">
                            Completed
                        </option>

                        <option value="Cancelled">
                            Cancelled
                        </option>

                    </select>

                    <button type="submit">
                        Book Appointment
                    </button>

                </form>

            </div>

            <div className="table-card">

                <h2>
                    Appointments List
                </h2>

                <table className="custom-table">

                    <thead>

                    <tr>

                        <th>ID</th>
                        <th>Patient</th>
                        <th>Doctor</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Actions</th>

                    </tr>

                    </thead>

                    <tbody>

                    {
                        appointments.map(
                            (appointment) => (

                            <tr key={appointment.id}>

                                <td>
                                    {appointment.id}
                                </td>

                                <td>

                                    {
                                        appointment.patient
                                            ?.firstName
                                    }

                                    {" "}

                                    {
                                        appointment.patient
                                            ?.lastName
                                    }

                                </td>

                                <td>

                                    Dr.
                                    {" "}

                                    {
                                        appointment.doctor
                                            ?.firstName
                                    }

                                    {" "}

                                    {
                                        appointment.doctor
                                            ?.lastName
                                    }

                                </td>

                                <td>
                                    {
                                        appointment
                                            .appointmentDate
                                    }
                                </td>

                                <td>
                                    {
                                        appointment
                                            .appointmentTime
                                    }
                                </td>

                                <td>
                                    {
                                        appointment.status
                                    }
                                </td>

                                <td>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            handleDelete(
                                                appointment.id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>
                        ))
                    }

                    </tbody>

                </table>

            </div>

        </Layout>
    );
};

export default Appointments;