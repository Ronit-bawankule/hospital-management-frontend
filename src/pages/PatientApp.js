import { useEffect, useState } from "react";

import Sidebar from "../components/layout/Sidebar";

import Navbar from "../components/layout/Navbar";

import {
    getPatients,
    deletePatient,
    updatePatient,
    getDoctors
} from "../services/api";

import {
    Box,
    Button,
    TextField,
    Typography,
    MenuItem,
    Paper
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

function PatientApp() {

    const [patients, setPatients] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");

    const [editingPatient, setEditingPatient] = useState(null);

    const [doctors, setDoctors] = useState([]);

    useEffect(() => {

        fetchPatients();

        fetchDoctors();

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

    const fetchDoctors = async () => {

        try {

            const response = await getDoctors();

            setDoctors(response.data);

        }

        catch(error) {

            console.log(error);
        }
    };

    const handleDelete = async (id) => {

        try {

            await deletePatient(id);

            fetchPatients();

        }

        catch(error) {

            console.log(error);
        }
    };

    const handleUpdate = async () => {

        try {

            await updatePatient(
                editingPatient.id,
                editingPatient
            );

            alert("Patient Updated");

            setEditingPatient(null);

            fetchPatients();

        }

        catch(error) {

            console.log(error);
        }
    };

    const filteredPatients = patients.filter((patient) =>

        patient.name.toLowerCase().includes(
            searchTerm.toLowerCase()
        )

        ||

        patient.disease.toLowerCase().includes(
            searchTerm.toLowerCase()
        )
    );

    const rows = filteredPatients.map((patient) => ({

        id: patient.id,

        name: patient.name,

        age: patient.age,

        disease: patient.disease,

        doctor: patient.doctor
            ? patient.doctor.name
            : "No Doctor"
    }));

    const columns = [

        {
            field: "id",
            headerName: "ID",
            width: 90
        },

        {
            field: "name",
            headerName: "Patient Name",
            width: 200
        },

        {
            field: "age",
            headerName: "Age",
            width: 120
        },

        {
            field: "disease",
            headerName: "Disease",
            width: 200
        },

        {
            field: "doctor",
            headerName: "Doctor",
            width: 220
        },

        {
            field: "actions",

            headerName: "Actions",

            width: 250,

            renderCell: (params) => (

                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        mt: 1
                    }}
                >

                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => {

                            const patient = patients.find(
                                (p) =>
                                    p.id === params.row.id
                            );

                            setEditingPatient(patient);
                        }}
                    >

                        Edit

                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() =>
                            handleDelete(params.row.id)
                        }
                    >

                        Delete

                    </Button>

                </Box>
            )
        }
    ];

    return (

        <Box sx={{ display: "flex" }}>

            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    backgroundColor: "#f5f5f5",
                    minHeight: "100vh"
                }}
            >

                <Navbar />

                <Typography
                    variant="h4"
                    sx={{
                        mb: 3,
                        fontWeight: "bold"
                    }}
                >

                    Patient Records

                </Typography>

                <TextField
                    label="Search Patient"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 3 }}
                    value={searchTerm}
                    onChange={(e) =>
                        setSearchTerm(e.target.value)
                    }
                />

                <Paper
                    sx={{
                        height: 500,
                        width: "100%"
                    }}
                >

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={7}
                        rowsPerPageOptions={[7]}
                    />

                </Paper>

                {editingPatient && (

                    <Paper
                        sx={{
                            p: 3,
                            mt: 4,
                            width: 450
                        }}
                    >

                        <Typography
                            variant="h5"
                            sx={{ mb: 3 }}
                        >

                            Edit Patient

                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2
                            }}
                        >

                            <TextField
                                label="Patient Name"
                                value={editingPatient.name}
                                onChange={(e) =>
                                    setEditingPatient({
                                        ...editingPatient,
                                        name: e.target.value
                                    })
                                }
                            />

                            <TextField
                                label="Age"
                                type="number"
                                value={editingPatient.age}
                                onChange={(e) =>
                                    setEditingPatient({
                                        ...editingPatient,
                                        age: e.target.value
                                    })
                                }
                            />

                            <TextField
                                label="Disease"
                                value={editingPatient.disease}
                                onChange={(e) =>
                                    setEditingPatient({
                                        ...editingPatient,
                                        disease: e.target.value
                                    })
                                }
                            />

                            <TextField
                                select
                                label="Doctor"
                                value={
                                    editingPatient.doctor
                                        ? editingPatient.doctor.id
                                        : ""
                                }
                                onChange={(e) =>
                                    setEditingPatient({
                                        ...editingPatient,
                                        doctor: {
                                            id: e.target.value
                                        }
                                    })
                                }
                            >

                                {doctors.map((doctor) => (

                                    <MenuItem
                                        key={doctor.id}
                                        value={doctor.id}
                                    >

                                        {doctor.name}
                                        {" - "}
                                        {doctor.specialization}

                                    </MenuItem>

                                ))}

                            </TextField>

                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleUpdate}
                            >

                                Update Patient

                            </Button>

                        </Box>

                    </Paper>

                )}

            </Box>

        </Box>
    );
}

export default PatientApp;