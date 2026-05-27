import { Link } from "react-router-dom";

function Sidebar() {

    return (

        <div style={{
            width: "220px",
            backgroundColor: "#1976d2",
            minHeight: "100vh",
            color: "white",
            padding: "20px"
        }}>

            <h2>Hospital HMS</h2>

            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                marginTop: "30px"
            }}>

                <Link to="/">Dashboard</Link>
                <Link to="/add-patient">Add Patient</Link>
                <Link to="/patients">Patients</Link>
                <Link to="/appointments">Appointments</Link>

            </div>

        </div>
    );
}

export default Sidebar;