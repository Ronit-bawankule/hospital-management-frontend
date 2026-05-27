import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Dashboard() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    return (

        <div style={{
            display: "flex",
            backgroundColor: "#f5f5f5",
            minHeight: "100vh"
        }}>

            <Sidebar />

            <div style={{
                flex: 1,
                padding: "20px"
            }}>

                <Navbar />

                <h1>
                    Dashboard
                </h1>

                <h2>
                    Welcome {user?.username}
                </h2>

            </div>

        </div>
    );
}

export default Dashboard;