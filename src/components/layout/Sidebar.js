import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ sidebarOpen }) => {

    const location = useLocation();

    const user =
        JSON.parse(localStorage.getItem("user"));

    const role = user?.role;

    const menuItems = [

        {
            title: "Dashboard",
            path: "/dashboard",
            roles: ["ADMIN", "DOCTOR", "RECEPTIONIST"]
        },

        {
            title: "Patients",
            path: "/patients",
            roles: ["ADMIN", "RECEPTIONIST"]
        },

        {
            title: "Doctors",
            path: "/doctors",
            roles: ["ADMIN"]
        },

        {
            title: "Appointments",
            path: "/appointments",
            roles: ["ADMIN", "DOCTOR", "RECEPTIONIST"]
        },

        {
            title: "Rooms",
            path: "/rooms",
            roles: ["ADMIN"]
        },

        {
            title: "Inventory",
            path: "/inventory",
            roles: ["ADMIN"]
        },

        {
            title: "Billing",
            path: "/billing",
            roles: ["ADMIN", "RECEPTIONIST"]
        }
    ];

    return (

        <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>

            <div className="sidebar-header">
                🏥 HMS
            </div>

            <div className="sidebar-menu">

                {
                    menuItems
                        .filter(item =>
                            item.roles.includes(role)
                        )
                        .map((item, index) => (

                            <Link
                                key={index}
                                to={item.path}
                                className={
                                    location.pathname === item.path
                                        ? "menu-item active"
                                        : "menu-item"
                                }
                            >
                                {item.title}
                            </Link>
                        ))
                }

            </div>

        </div>
    );
};

export default Sidebar;