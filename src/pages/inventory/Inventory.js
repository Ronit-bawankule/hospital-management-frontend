import React, {
    useEffect,
    useState
} from "react";

import Layout
    from "../../components/layout/Layout";

import api
    from "../../services/api";

import "../../styles/tables.css";

const Inventory = () => {

    const [medicines, setMedicines] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [formData, setFormData] =
        useState({
            medicineName: "",
            quantity: "",
            price: "",
            expiryDate: ""
        });

    const fetchMedicines = async () => {

        try {

            const response =
                await api.get("/api/inventory");

            setMedicines(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    useEffect(() => {

        fetchMedicines();

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

            await api.post(
                "/api/inventory",
                formData
            );

            setFormData({
                medicineName: "",
                quantity: "",
                price: "",
                expiryDate: ""
            });

            fetchMedicines();

        } catch (error) {

            console.error(error);
        }
    };

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Delete medicine?"
            );

        if (!confirmDelete) return;

        try {

            await api.delete(
                `/api/inventory/${id}`
            );

            fetchMedicines();

        } catch (error) {

            console.error(error);
        }
    };

    const filteredMedicines =
        medicines.filter((medicine) =>
            medicine.medicineName
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    return (

        <Layout>

            <div className="page-header">

                <h1>
                    Inventory Management
                </h1>

            </div>

            <div className="form-card">

                <h2>
                    Add Medicine
                </h2>

                <form
                    className="patient-form"
                    onSubmit={handleSubmit}
                >

                    <input
                        type="text"
                        name="medicineName"
                        placeholder="Medicine Name"
                        value={formData.medicineName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="date"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        Add Medicine
                    </button>

                </form>

            </div>

            <div className="table-card">

                <div className="table-header">

                    <h2>
                        Medicines
                    </h2>

                    <input
                        type="text"
                        placeholder="Search medicine..."
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
                        <th>Medicine</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Expiry</th>
                        <th>Actions</th>

                    </tr>

                    </thead>

                    <tbody>

                    {
                        filteredMedicines.map(
                            (medicine) => (

                            <tr key={medicine.id}>

                                <td>
                                    {medicine.id}
                                </td>

                                <td>
                                    {
                                        medicine
                                            .medicineName
                                    }
                                </td>

                                <td>
                                    {
                                        medicine.quantity
                                    }
                                </td>

                                <td>
                                    ₹{medicine.price}
                                </td>

                                <td>
                                    {
                                        medicine.expiryDate
                                    }
                                </td>

                                <td>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            handleDelete(
                                                medicine.id
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

export default Inventory;