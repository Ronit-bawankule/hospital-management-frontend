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
                    element={<Dashboard />}
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