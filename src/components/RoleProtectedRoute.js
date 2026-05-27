import { Navigate } from "react-router-dom";

function RoleProtectedRoute({

    children,

    allowedRoles

}) {

    const storedUser =
        localStorage.getItem("user");

    if(!storedUser) {

        return <Navigate to="/login" />;
    }

    const user = JSON.parse(storedUser);

    if(
        !user.role ||
        !allowedRoles.includes(
            user.role.toUpperCase()
        )
    ) {

        return <Navigate to="/" />;
    }

    return children;
}

export default RoleProtectedRoute;