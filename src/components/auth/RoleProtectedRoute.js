import React from "react";
import { Navigate } from "react-router-dom";

const RoleProtectedRoute = ({
    children,
    allowedRoles
}) => {

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    const token =
        localStorage.getItem("token");

    if (!token) {

        return (
            <Navigate to="/login" />
        );
    }

    if (
        !allowedRoles.includes(user?.role)
    ) {

        return (
            <Navigate to="/dashboard" />
        );
    }

    return children;
};

export default RoleProtectedRoute;