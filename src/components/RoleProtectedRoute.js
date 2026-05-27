import { Navigate } from "react-router-dom";

function RoleProtectedRoute({ children, allowedRoles }) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        return <Navigate to="/login" />;
    }

    const role = (user.role || "").toUpperCase();

    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/" />;
    }

    return children;
}

export default RoleProtectedRoute;