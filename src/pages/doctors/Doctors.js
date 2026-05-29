import React, {
    useEffect,
    useState
} from "react";

import Layout
    from "../../components/layout/Layout";

import api
    from "../../services/api";

import "../../styles/tables.css";

const Doctors = () => {

    const emptyForm = {
        firstName: "",
        lastName: "",
        specialization: "",
        experience: "",
        phone: "",
        email: "",
        availability: ""
    };

    const [doctors, setDoctors] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [editingId, setEditingId] =
        useState(null);

    const [formData, setFormData] =
        useState(emptyForm);

    const fetchDoctors = async () => {

        try {

            const response =
                await api.get("/api/doctors");

            setDoctors(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    useEffect(() => {

        fetchDoctors();

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
                    `/api/doctors/${editingId}`,
                    formData
                );

            } else {

                await api.post(
                    "/api/doctors",
                    formData
                );
            }

            setFormData(emptyForm);

            setEditingId(null);

            fetchDoctors();

        } catch (error) {

            console.error(error);
        }
    };

    const handleEdit = (doctor) => {

        setEditingId(doctor.id);

        setFormData(doctor);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Delete this doctor?"
            );

        if (!confirmDelete) return;

        try {

            await api.delete(
                `/api/doctors/${id}`
            );

            fetchDoctors();

        } catch (error) {

            console.error(error);
        }
    };

    const filteredDoctors =
        doctors.filter((doctor) => {

            const fullName =
                `${doctor.firstName} ${doctor.lastName}`
                    .toLowerCase();

            return fullName.includes(
                search.toLowerCase()
            );
        });

    return (

        <Layout>

            <div className="page-header">

                <h1>
                    Doctor Management
                </h1>

            </div>

            <div className="form-card">

                <h2>

                    {
                        editingId
                            ? "Edit Doctor"
                            : "Add Doctor"
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
                        type="text"
                        name="specialization"
                        placeholder="Specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="experience"
                        placeholder="Experience (Years)"
                        value={formData.experience}
                        onChange={handleChange}
                        required
                    />

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
                        name="availability"
                        placeholder="Availability"
                        value={formData.availability}
                        onChange={handleChange}
                    />

                    <button type="submit">

                        {
                            editingId
                                ? "Update Doctor"
                                : "Add Doctor"
                        }

                    </button>

                </form>

            </div>

            <div className="table-card">

                <div className="table-header">

                    <h2>
                        Doctors List
                    </h2>

                    <input
                        type="text"
                        placeholder="Search doctor..."
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
                        <th>Specialization</th>
                        <th>Experience</th>
                        <th>Phone</th>
                        <th>Availability</th>
                        <th>Actions</th>

                    </tr>

                    </thead>

                    <tbody>

                    {
                        filteredDoctors.map(
                            (doctor) => (

                            <tr key={doctor.id}>

                                <td>
                                    {doctor.id}
                                </td>

                                <td>
                                    Dr.
                                    {" "}
                                    {doctor.firstName}
                                    {" "}
                                    {doctor.lastName}
                                </td>

                                <td>
                                    {doctor.specialization}
                                </td>

                                <td>
                                    {doctor.experience}
                                    {" "}
                                    yrs
                                </td>

                                <td>
                                    {doctor.phone}
                                </td>

                                <td>
                                    {doctor.availability}
                                </td>

                                <td>

                                    <div className="action-buttons">

                                        <button
                                            className="edit-btn"
                                            onClick={() =>
                                                handleEdit(doctor)
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                handleDelete(doctor.id)
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

export default Doctors;