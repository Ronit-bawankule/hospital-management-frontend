import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../../styles/layout.css";

const Layout = ({ children }) => {

    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="layout">

            <Sidebar
                sidebarOpen={sidebarOpen}
            />

            <div className="main-content">

                <Navbar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                <div className="page-content">
                    {children}
                </div>

            </div>

        </div>
    );
};

export default Layout;