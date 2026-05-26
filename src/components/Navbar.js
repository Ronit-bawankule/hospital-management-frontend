function Navbar() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const handleLogout = () => {

        localStorage.removeItem("user");

        window.location.href = "/login";
    };

    return (

        <div
            style={{
                height: "70px",
                backgroundColor: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0px 30px",
                borderRadius: "10px",
                boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
                marginBottom: "30px"
            }}
        >

            <h2>
                Hospital Management System
            </h2>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px"
                }}
            >

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end"
                    }}
                >

                    <span
                        style={{
                            fontWeight: "bold"
                        }}
                    >

                        {user?.username}

                    </span>

                    <span
                        style={{
                            fontSize: "14px",
                            color: "gray"
                        }}
                    >

                        {user?.role}

                    </span>

                </div>

                <button
                    onClick={handleLogout}
                    style={{
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        padding: "10px 15px",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                >

                    Logout

                </button>

            </div>

        </div>
    );
}

export default Navbar;