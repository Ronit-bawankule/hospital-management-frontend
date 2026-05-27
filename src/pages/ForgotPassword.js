import { useState } from "react";
import { forgotPassword } from "../services/api";
import { Link } from "react-router-dom";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        try {
            const response = await forgotPassword(email);
            setMessage(response.data.message || "Reset token sent");
        } catch (error) {
            console.log(error);
            setMessage(error?.response?.data?.message || "Failed");
        }
    };

    return (
        <div style={pageStyle}>
            <div style={cardStyle}>
                <h1 style={{ marginTop: 0 }}>Forgot Password</h1>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                />
                <button onClick={handleSubmit} style={buttonStyle}>
                    Send Reset Link
                </button>
                {message && <p>{message}</p>}
                <Link to="/login">Back to Login</Link>
            </div>
        </div>
    );
}

const pageStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "16px",
    backgroundColor: "#f8fafc"
};

const cardStyle = {
    width: "100%",
    maxWidth: "420px",
    backgroundColor: "#fff",
    padding: "28px",
    borderRadius: "18px",
    boxShadow: "0 20px 40px rgba(15, 23, 42, 0.12)"
};

const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    marginBottom: "16px"
};

const buttonStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "white",
    fontWeight: 600,
    cursor: "pointer",
    marginBottom: "16px"
};

export default ForgotPassword;