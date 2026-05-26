import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";

import Navbar from "../components/Navbar";

import { getPatients } from "../services/api";

import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Paper
} from "@mui/material";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

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

    const patientCount = patients.length;

    const appointmentData = [

        {
            day: "Mon",
            appointments: 4
        },

        {
            day: "Tue",
            appointments: 7
        },

        {
            day: "Wed",
            appointments: 5
        },

        {
            day: "Thu",
            appointments: 8
        },

        {
            day: "Fri",
            appointments: 6
        },

        {
            day: "Sat",
            appointments: 9
        }
    ];

    return (

        <Box sx={{ display: "flex" }}>

            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 4,
                    backgroundColor: "#f5f5f5",
                    minHeight: "100vh"
                }}
            >

                <Navbar />

                <Typography
                    variant="h4"
                    sx={{
                        mb: 4,
                        fontWeight: "bold"
                    }}
                >

                    Dashboard Overview

                </Typography>

                <Grid container spacing={3}>

                    <Grid item xs={12} md={4}>

                        <Card
                            sx={{
                                backgroundColor: "#1976d2",
                                color: "white",
                                borderRadius: 4
                            }}
                        >

                            <CardContent>

                                <Typography variant="h6">

                                    Total Patients

                                </Typography>

                                <Typography
                                    variant="h3"
                                    sx={{ mt: 2 }}
                                >

                                    {patientCount}

                                </Typography>

                            </CardContent>

                        </Card>

                    </Grid>

                    <Grid item xs={12} md={4}>

                        <Card
                            sx={{
                                backgroundColor: "#2e7d32",
                                color: "white",
                                borderRadius: 4
                            }}
                        >

                            <CardContent>

                                <Typography variant="h6">

                                    Total Doctors

                                </Typography>

                                <Typography
                                    variant="h3"
                                    sx={{ mt: 2 }}
                                >

                                    4

                                </Typography>

                            </CardContent>

                        </Card>

                    </Grid>

                    <Grid item xs={12} md={4}>

                        <Card
                            sx={{
                                backgroundColor: "#ed6c02",
                                color: "white",
                                borderRadius: 4
                            }}
                        >

                            <CardContent>

                                <Typography variant="h6">

                                    Total Appointments

                                </Typography>

                                <Typography
                                    variant="h3"
                                    sx={{ mt: 2 }}
                                >

                                    12

                                </Typography>

                            </CardContent>

                        </Card>

                    </Grid>

                </Grid>

                <Paper
                    elevation={3}
                    sx={{
                        mt: 5,
                        p: 4,
                        borderRadius: 4,
                        width: "100%",
                        height: 500
                    }}
                >

                    <Typography
                        variant="h5"
                        sx={{
                            mb: 4,
                            fontWeight: "bold"
                        }}
                    >

                        Weekly Appointments Analytics

                    </Typography>

                    <ResponsiveContainer
                        width="100%"
                        height="85%"
                    >

                        <BarChart
                            data={appointmentData}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 10
                            }}
                        >

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="day" />

                            <YAxis />

                            <Tooltip />

                            <Bar
                                dataKey="appointments"
                                fill="#1976d2"
                                radius={[10, 10, 0, 0]}
                                barSize={60}
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </Paper>

            </Box>

        </Box>
    );
}

export default Dashboard;