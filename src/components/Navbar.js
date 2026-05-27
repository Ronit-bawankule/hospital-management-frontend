function Navbar() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const handleLogout = () => {

        localStorage.removeItem("user");

        window.location.href = "/login";
    };

    return (

        <div style={{
            height: "70px",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0px 30px",
            borderRadius: "10px"
        }}>

            <h2>Hospital Management System</h2>

            <div>

                <span>
                    {user?.username}
                </span>

                <button onClick={handleLogout}>
                    Logout
                </button>

            </div>

        </div>
    );
}

export default Navbar;