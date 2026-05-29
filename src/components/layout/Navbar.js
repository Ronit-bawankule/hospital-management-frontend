import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {

    const navigate = useNavigate();

    const user =
        JSON.parse(localStorage.getItem("user"));

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (

        <div className="navbar">

            <button
                className="menu-toggle"
                onClick={() =>
                    setSidebarOpen(!sidebarOpen)
                }
            >
                ☰
            </button>

            <div className="navbar-right">

                <div className="user-info">
                    <span>{user?.name}</span>
                    <small>{user?.role}</small>
                </div>

                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </div>
    );
};

export default Navbar;