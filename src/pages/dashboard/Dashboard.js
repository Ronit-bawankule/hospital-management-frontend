import React, {
    useEffect,
    useState
} from "react";

import Layout
    from "../../components/layout/Layout";

import StatCard
    from "../../components/common/StatCard";

import api
    from "../../services/api";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from "recharts";

import "../../styles/dashboard.css";

const Dashboard = () => {

    const [stats, setStats] =
        useState({
            patients: 0,
            doctors: 0,
            appointments: 0,
            revenue: 0,
            rooms: 0,
            inventory: 0
        });

    const user =
        JSON.parse(localStorage.getItem("user"));

    const fetchStats = async () => {

        try {

            const response =
                await api.get(
                    "/api/dashboard/stats"
                );

            setStats(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    useEffect(() => {

        fetchStats();

    }, []);

    const chartData = [

        {
            name: "Patients",
            value: stats.patients
        },

        {
            name: "Doctors",
            value: stats.doctors
        },

        {
            name: "Appointments",
            value: stats.appointments
        },

        {
            name: "Rooms",
            value: stats.rooms
        },

        {
            name: "Inventory",
            value: stats.inventory
        }
    ];

    const pieData = [

        {
            name: "Revenue",
            value: stats.revenue
        },

        {
            name: "Expenses",
            value: stats.revenue * 0.35
        }
    ];

    const COLORS = [
        "#2563eb",
        "#16a34a"
    ];

    return (

        <Layout>

            <div className="dashboard-header">

                <div>

                    <h1>

                        Welcome,
                        {" "}
                        {user?.name}

                    </h1>

                    <p>
                        Hospital Analytics Dashboard
                    </p>

                </div>

            </div>

            <div className="stats-grid">

                <StatCard
                    title="Patients"
                    value={stats.patients}
                    color="#2563eb"
                />

                <StatCard
                    title="Doctors"
                    value={stats.doctors}
                    color="#16a34a"
                />

                <StatCard
                    title="Appointments"
                    value={stats.appointments}
                    color="#ea580c"
                />

                <StatCard
                    title="Revenue"
                    value={`₹${stats.revenue}`}
                    color="#9333ea"
                />

            </div>

            <div className="charts-grid">

                <div className="chart-card">

                    <h2>
                        Hospital Overview
                    </h2>

                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >

                        <BarChart
                            data={chartData}
                        >

                            <XAxis dataKey="name" />

                            <YAxis />

                            <Tooltip />

                            <Bar
                                dataKey="value"
                                fill="#2563eb"
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

                <div className="chart-card">

                    <h2>
                        Revenue Distribution
                    </h2>

                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >

                        <PieChart>

                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                dataKey="value"
                                label
                            >

                                {
                                    pieData.map(
                                        (
                                            entry,
                                            index
                                        ) => (

                                        <Cell
                                            key={index}
                                            fill={
                                                COLORS[index]
                                            }
                                        />
                                    ))
                                }

                            </Pie>

                            <Tooltip />

                        </PieChart>

                    </ResponsiveContainer>

                </div>

            </div>

        </Layout>
    );
};

export default Dashboard;