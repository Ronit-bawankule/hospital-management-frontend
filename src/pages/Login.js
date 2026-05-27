import { useState } from "react";
import { loginUser } from "../services/api";
import { Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await loginUser(email, password);

            if (response.data) {
                localStorage.setItem("user", JSON.stringify(response.data));
                window.location.replace("/");
            } else {
                alert("Invalid Credentials");
            }
        } catch (error) {
            console.log(error);
            alert(error?.response?.data?.message || "Login Failed");
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(135deg, #eef2ff, #f8fafc)",
            padding: "16px"
        }}>
            <div style={{
                width: "100%",
                maxWidth: "420px",
                backgroundColor: "#fff",
                borderRadius: "18px",
                boxShadow: "0 20px 40px rgba(15, 23, 42, 0.12)",
                padding: "32px"
            }}>
                <h1 style={{
                    margin: 0,
                    marginBottom: "8px",
                    fontSize: "32px",
                    color: "#0f172a"
                }}>
                    Hospital HMS
                </h1>

                <p style={{
                    marginTop: 0,
                    marginBottom: "24px",
                    color: "#64748b"
                }}>
                    Sign in to continue
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={inputStyle}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                    />

                    <button onClick={handleLogin} style={buttonStyle}>
                        Login
                    </button>

                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "14px"
                    }}>
                        <Link to="/forgot-password">Forgot password?</Link>
                    </div>

                    <div style={{
                        fontSize: "13px",
                        color: "#64748b",
                        backgroundColor: "#f8fafc",
                        padding: "12px",
                        borderRadius: "12px"
                    }}>
                        Demo users: admin@hospital.com / admin123, doctor@hospital.com / doctor123, reception@hospital.com / reception123
                    </div>
                </div>
            </div>
        </div>
    );
}

const inputStyle = {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    outline: "none",
    fontSize: "15px"
};

const buttonStyle = {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "white",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer"
};

export default Login;