import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";

import HospitalForm from "./pages/HospitalForm";

import PatientApp from "./pages/PatientApp";

import Appointments from "./pages/Appointments";

import Login from "./pages/Login";


import RoleProtectedRoute from "./components/RoleProtectedRoute";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/"
                    element={

                        <RoleProtectedRoute
                            allowedRoles={["ADMIN"]}
                        >

                            <Dashboard />

                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/add-patient"
                    element={

                        <RoleProtectedRoute
                            allowedRoles={[
                                "ADMIN",
                                "DOCTOR",
                                "RECEPTIONIST"
                            ]}
                        >

                            <HospitalForm />

                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/patients"
                    element={

                        <RoleProtectedRoute
                            allowedRoles={[
                                "ADMIN",
                                "DOCTOR"
                            ]}
                        >

                            <PatientApp />

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

            </Routes>

        </BrowserRouter>
    );
}

export default App;