import React, {
    useEffect,
    useState
} from "react";

import Layout
    from "../../components/layout/Layout";

import api
    from "../../services/api";

import "../../styles/tables.css";

const Rooms = () => {

    const [rooms, setRooms] =
        useState([]);

    const [patients, setPatients] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [formData, setFormData] =
        useState({
            roomNumber: "",
            roomType: "General",
            status: "Vacant",
            patient: ""
        });

    const fetchData = async () => {

        try {

            const roomResponse =
                await api.get("/api/rooms");

            const patientResponse =
                await api.get("/api/patients");

            setRooms(roomResponse.data);

            setPatients(patientResponse.data);

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

                roomNumber:
                    formData.roomNumber,

                roomType:
                    formData.roomType,

                status:
                    formData.status,

                patient:
                    formData.patient
                        ? {
                            id: formData.patient
                        }
                        : null
            };

            await api.post(
                "/api/rooms",
                payload
            );

            setFormData({
                roomNumber: "",
                roomType: "General",
                status: "Vacant",
                patient: ""
            });

            fetchData();

        } catch (error) {

            console.error(error);
        }
    };

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Delete room?"
            );

        if (!confirmDelete) return;

        try {

            await api.delete(
                `/api/rooms/${id}`
            );

            fetchData();

        } catch (error) {

            console.error(error);
        }
    };

    const filteredRooms =
        rooms.filter((room) =>
            room.roomNumber
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    return (

        <Layout>

            <div className="page-header">

                <h1>
                    Room Management
                </h1>

            </div>

            <div className="form-card">

                <h2>
                    Add Room
                </h2>

                <form
                    className="patient-form"
                    onSubmit={handleSubmit}
                >

                    <input
                        type="text"
                        name="roomNumber"
                        placeholder="Room Number"
                        value={formData.roomNumber}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="roomType"
                        value={formData.roomType}
                        onChange={handleChange}
                    >

                        <option value="General">
                            General
                        </option>

                        <option value="ICU">
                            ICU
                        </option>

                        <option value="Private">
                            Private
                        </option>

                    </select>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >

                        <option value="Vacant">
                            Vacant
                        </option>

                        <option value="Occupied">
                            Occupied
                        </option>

                    </select>

                    <select
                        name="patient"
                        value={formData.patient}
                        onChange={handleChange}
                    >

                        <option value="">
                            Assign Patient
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

                    <button type="submit">
                        Add Room
                    </button>

                </form>

            </div>

            <div className="table-card">

                <div className="table-header">

                    <h2>
                        Rooms
                    </h2>

                    <input
                        type="text"
                        placeholder="Search room..."
                        className="search-input"
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />

                </div>

                <table className="custom-table">

                    <thead>

                    <tr>

                        <th>ID</th>
                        <th>Room No</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Patient</th>
                        <th>Actions</th>

                    </tr>

                    </thead>

                    <tbody>

                    {
                        filteredRooms.map((room) => (

                            <tr key={room.id}>

                                <td>
                                    {room.id}
                                </td>

                                <td>
                                    {room.roomNumber}
                                </td>

                                <td>
                                    {room.roomType}
                                </td>

                                <td>
                                    {room.status}
                                </td>

                                <td>

                                    {
                                        room.patient
                                            ? `${room.patient.firstName} ${room.patient.lastName}`
                                            : "—"
                                    }

                                </td>

                                <td>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            handleDelete(room.id)
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

export default Rooms;