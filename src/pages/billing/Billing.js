import React, {
    useEffect,
    useState
} from "react";

import Layout
    from "../../components/layout/Layout";

import api
    from "../../services/api";

import "../../styles/tables.css";

const Billing = () => {

    const [bills, setBills] =
        useState([]);

    const [patients, setPatients] =
        useState([]);

    const [appointments, setAppointments] =
        useState([]);

    const [formData, setFormData] =
        useState({
            patient: "",
            appointment: "",
            amount: "",
            paymentMethod: "Cash",
            paymentStatus: "Pending"
        });

    const fetchData = async () => {

        try {

            const billResponse =
                await api.get("/api/billing");

            const patientResponse =
                await api.get("/api/patients");

            const appointmentResponse =
                await api.get("/api/appointments");

            setBills(
                billResponse.data
            );

            setPatients(
                patientResponse.data
            );

            setAppointments(
                appointmentResponse.data
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

                appointment: {
                    id: formData.appointment
                },

                amount: formData.amount,

                paymentMethod:
                    formData.paymentMethod,

                paymentStatus:
                    formData.paymentStatus
            };

            await api.post(
                "/api/billing",
                payload
            );

            setFormData({
                patient: "",
                appointment: "",
                amount: "",
                paymentMethod: "Cash",
                paymentStatus: "Pending"
            });

            fetchData();

        } catch (error) {

            console.error(error);
        }
    };

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Delete bill?"
            );

        if (!confirmDelete) return;

        try {

            await api.delete(
                `/api/billing/${id}`
            );

            fetchData();

        } catch (error) {

            console.error(error);
        }
    };

    const downloadPdf = async (id) => {

        try {

            const response =
                await api.get(
                    `/api/billing/${id}/pdf`,
                    {
                        responseType: "blob"
                    }
                );

            const url =
                window.URL.createObjectURL(
                    new Blob([response.data])
                );

            const link =
                document.createElement("a");

            link.href = url;

            link.setAttribute(
                "download",
                `bill-${id}.pdf`
            );

            document.body.appendChild(link);

            link.click();

        } catch (error) {

            console.error(error);
        }
    };

    return (

        <Layout>

            <div className="page-header">

                <h1>
                    Billing Management
                </h1>

            </div>

            <div className="form-card">

                <h2>
                    Generate Bill
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
                        name="appointment"
                        value={formData.appointment}
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select Appointment
                        </option>

                        {
                            appointments.map(
                                (appointment) => (

                                <option
                                    key={appointment.id}
                                    value={appointment.id}
                                >

                                    Appointment #
                                    {appointment.id}

                                </option>
                            ))
                        }

                    </select>

                    <input
                        type="number"
                        name="amount"
                        placeholder="Amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                    >

                        <option value="Cash">
                            Cash
                        </option>

                        <option value="Card">
                            Card
                        </option>

                        <option value="UPI">
                            UPI
                        </option>

                    </select>

                    <select
                        name="paymentStatus"
                        value={formData.paymentStatus}
                        onChange={handleChange}
                    >

                        <option value="Pending">
                            Pending
                        </option>

                        <option value="Paid">
                            Paid
                        </option>

                    </select>

                    <button type="submit">
                        Generate Bill
                    </button>

                </form>

            </div>

            <div className="table-card">

                <h2>
                    Billing Records
                </h2>

                <table className="custom-table">

                    <thead>

                    <tr>

                        <th>ID</th>
                        <th>Patient</th>
                        <th>Amount</th>
                        <th>Method</th>
                        <th>Status</th>
                        <th>Actions</th>

                    </tr>

                    </thead>

                    <tbody>

                    {
                        bills.map((bill) => (

                            <tr key={bill.id}>

                                <td>
                                    {bill.id}
                                </td>

                                <td>

                                    {
                                        bill.patient
                                            ?.firstName
                                    }

                                    {" "}

                                    {
                                        bill.patient
                                            ?.lastName
                                    }

                                </td>

                                <td>
                                    ₹{bill.amount}
                                </td>

                                <td>
                                    {bill.paymentMethod}
                                </td>

                                <td>
                                    {bill.paymentStatus}
                                </td>

                                <td>

                                    <div className="action-buttons">

                                        <button
                                            className="edit-btn"
                                            onClick={() =>
                                                downloadPdf(
                                                    bill.id
                                                )
                                            }
                                        >
                                            PDF
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                handleDelete(
                                                    bill.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

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

export default Billing;