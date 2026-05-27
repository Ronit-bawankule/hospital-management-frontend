import { Navigate } from "react-router-dom";

function RoleProtectedRoute({
    children,
    allowedRoles
}) {

    const userData = localStorage.getItem("user");

    // If no user found
    if (!userData) {

        return <Navigate to="/login" />;
    }

    const user = JSON.parse(userData);

    // If role missing, allow temporarily
    if (!user.role) {

        return children;
    }

    // Role check
    if (!allowedRoles.includes(user.role)) {

        return <Navigate to="/" />;
    }

    return children;
}

export default RoleProtectedRoute;