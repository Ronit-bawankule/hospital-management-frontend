import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import HospitalForm from "./pages/HospitalForm";
import PatientApp from "./pages/PatientApp";
import Appointments from "./pages/Appointments";

function App() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

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
                        user
                        ? <Dashboard />
                        : <Navigate to="/login" />
                    }
                />

                <Route
                    path="/add-patient"
                    element={<HospitalForm />}
                />

                <Route
                    path="/patients"
                    element={<PatientApp />}
                />

                <Route
                    path="/appointments"
                    element={<Appointments />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;