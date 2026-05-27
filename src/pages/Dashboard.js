function Dashboard() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    return (

        <div
            style={{
                padding: "40px",
                fontSize: "30px"
            }}
        >

            Dashboard Working ✅

            <br /><br />

            Username: {user?.username}

            <br />

            Role: {user?.role}

        </div>
    );
}

export default Dashboard;