import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login";

function Dashboard() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    return (

        <div
            style={{
                padding: "50px",
                fontSize: "30px"
            }}
        >

            Dashboard Working ✅

            <br /><br />

            Username: {user?.username}

            <br />

            Role: {user?.role}

        </div>
    );
}

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

            </Routes>

        </BrowserRouter>
    );
}

export default App;