import { useState } from "react";
import { resetPassword } from "../services/api";
import { Link } from "react-router-dom";

function ResetPassword() {
    const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        try {
            const response = await resetPassword(token, newPassword);
            setMessage(response.data.message || "Password updated");
        } catch (error) {
            console.log(error);
            setMessage(error?.response?.data?.message || "Failed");
        }
    };

    return (
        <div style={pageStyle}>
            <div style={cardStyle}>
                <h1 style={{ marginTop: 0 }}>Reset Password</h1>
                <input
                    type="text"
                    placeholder="Reset token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    style={inputStyle}
                />
                <input
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={inputStyle}
                />
                <button onClick={handleSubmit} style={buttonStyle}>
                    Reset Password
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

export default ResetPassword;