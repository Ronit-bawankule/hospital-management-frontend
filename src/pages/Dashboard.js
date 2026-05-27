import { useEffect, useState } from "react";
import { getPatients } from "../services/api";

function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await getPatients();
            setPatients(response.data || []);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.replace("/login");
    };

    return (
        <div style={pageStyle}>
            <div style={topBarStyle}>
                <div>
                    <h1 style={{ margin: 0, fontSize: "28px" }}>Hospital Dashboard</h1>
                    <p style={{ margin: 0, color: "#64748b" }}>
                        Welcome {user?.fullName || user?.email}
                    </p>
                </div>
                <button onClick={handleLogout} style={logoutBtn}>
                    Logout
                </button>
            </div>

            <div style={gridStyle}>
                <div style={cardStyle}>
                    <h3>Total Patients</h3>
                    <h1>{patients.length}</h1>
                </div>

                <div style={cardStyle}>
                    <h3>Your Role</h3>
                    <h1>{user?.role}</h1>
                </div>

                <div style={cardStyle}>
                    <h3>System Status</h3>
                    <h1>Live</h1>
                </div>
            </div>
        </div>
    );
}

const pageStyle = {
    minHeight: "100vh",
    padding: "20px",
    backgroundColor: "#f8fafc"
};

const topBarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
    marginBottom: "24px"
};

const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px"
};

const cardStyle = {
    backgroundColor: "#fff",
    padding: "22px",
    borderRadius: "18px",
    boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)"
};

const logoutBtn = {
    padding: "12px 18px",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#ef4444",
    color: "white",
    fontWeight: 600,
    cursor: "pointer"
};

export default Dashboard;