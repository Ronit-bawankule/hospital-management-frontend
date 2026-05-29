import React from "react";

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login
    from "./pages/auth/Login";

import ForgotPassword
    from "./pages/auth/ForgotPassword";

import ResetPassword
    from "./pages/auth/ResetPassword";

import Dashboard
    from "./pages/dashboard/Dashboard";

import Patients
    from "./pages/patients/Patients";

import Doctors
    from "./pages/doctors/Doctors";

import Appointments
    from "./pages/appointments/Appointments";

import ProtectedRoute
    from "./components/auth/ProtectedRoute";

import RoleProtectedRoute
    from "./components/auth/RoleProtectedRoute";

import Billing
    from "./pages/billing/Billing";

import Inventory
    from "./pages/inventory/Inventory";

import Rooms
    from "./pages/rooms/Rooms";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />

                <Route
                    path="/reset-password/:token"
                    element={<ResetPassword />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/patients"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={[
                                "ADMIN",
                                "RECEPTIONIST"
                            ]}
                        >
                            <Patients />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/doctors"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={[
                                "ADMIN"
                            ]}
                        >
                            <Doctors />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/appointments"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={[
                                "ADMIN",
                                "DOCTOR",
                                "RECEPTIONIST"
                            ]}
                        >
                            <Appointments />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/billing"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={[
                                "ADMIN",
                                "RECEPTIONIST"
                            ]}
                        >
                            <Billing />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/inventory"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={[
                                "ADMIN",
                                "RECEPTIONIST"
                            ]}
                        >
                            <Inventory />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/rooms"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={[
                                "ADMIN"
                            ]}
                        >
                            <Rooms />
                        </RoleProtectedRoute>
                    }
                />
                <Route
                    path="*"
                    element={
                        <Navigate to="/login" />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;