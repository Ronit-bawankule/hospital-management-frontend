import React, {
    useEffect,
    useState
} from "react";

import Layout
    from "../../components/layout/Layout";

import api
    from "../../services/api";

import "../../styles/tables.css";

const Patients = () => {

    const emptyForm = {
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
        bloodGroup: ""
    };

    const [patients, setPatients] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [editingId, setEditingId] =
        useState(null);

    const [formData, setFormData] =
        useState(emptyForm);

    const fetchPatients = async () => {

        try {

            const response =
                await api.get("/api/patients");

            setPatients(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    useEffect(() => {

        fetchPatients();

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

            if (editingId) {

                await api.put(
                    `/api/patients/${editingId}`,
                    formData
                );

            } else {

                await api.post(
                    "/api/patients",
                    formData
                );
            }

            setFormData(emptyForm);

            setEditingId(null);

            fetchPatients();

        } catch (error) {

            console.error(error);
        }
    };

    const handleEdit = (patient) => {

        setEditingId(patient.id);

        setFormData(patient);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Delete this patient?"
            );

        if (!confirmDelete) return;

        try {

            await api.delete(
                `/api/patients/${id}`
            );

            fetchPatients();

        } catch (error) {

            console.error(error);
        }
    };

    const filteredPatients =
        patients.filter((patient) => {

            const fullName =
                `${patient.firstName} ${patient.lastName}`
                    .toLowerCase();

            return fullName.includes(
                search.toLowerCase()
            );
        });

    return (

        <Layout>

            <div className="page-header">

                <h1>
                    Patient Management
                </h1>

            </div>

            <div className="form-card">

                <h2>

                    {
                        editingId
                            ? "Edit Patient"
                            : "Add Patient"
                    }

                </h2>

                <form
                    className="patient-form"
                    onSubmit={handleSubmit}
                >

                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select Gender
                        </option>

                        <option value="Male">
                            Male
                        </option>

                        <option value="Female">
                            Female
                        </option>

                    </select>

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="bloodGroup"
                        placeholder="Blood Group"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                    />

                    <button type="submit">

                        {
                            editingId
                                ? "Update Patient"
                                : "Add Patient"
                        }

                    </button>

                </form>

            </div>

            <div className="table-card">

                <div className="table-header">

                    <h2>
                        Patients List
                    </h2>

                    <input
                        type="text"
                        placeholder="Search patient..."
                        className="search-input"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

                <table className="custom-table">

                    <thead>

                    <tr>

                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Phone</th>
                        <th>Blood Group</th>
                        <th>Actions</th>

                    </tr>

                    </thead>

                    <tbody>

                    {
                        filteredPatients.map(
                            (patient) => (

                            <tr key={patient.id}>

                                <td>
                                    {patient.id}
                                </td>

                                <td>
                                    {patient.firstName}
                                    {" "}
                                    {patient.lastName}
                                </td>

                                <td>
                                    {patient.age}
                                </td>

                                <td>
                                    {patient.gender}
                                </td>

                                <td>
                                    {patient.phone}
                                </td>

                                <td>
                                    {patient.bloodGroup}
                                </td>

                                <td>

                                    <div className="action-buttons">

                                        <button
                                            className="edit-btn"
                                            onClick={() =>
                                                handleEdit(patient)
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                handleDelete(patient.id)
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

export default Patients;