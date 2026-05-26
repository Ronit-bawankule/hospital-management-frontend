import { useState } from "react";

import axios from "axios";

function Login() {

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const response = await axios.post(
                "https://hospital-management-backend-u64d.onrender.com/auth/login",
                {
                    username,
                    password
                }
            );

            if(response.data) {

                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data)
                );

                alert("Login Successful");

                window.location.href = "/";

            }

            else {

                alert("Invalid Credentials");
            }
        }

        catch(error) {

            console.log(error);

            alert("Login Failed");
        }
    };

    return (

        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f5f5"
            }}
        >

            <div
                style={{
                    backgroundColor: "white",
                    padding: "40px",
                    borderRadius: "10px",
                    width: "350px",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)"
                }}
            >

                <h1
                    style={{
                        marginBottom: "20px",
                        textAlign: "center"
                    }}
                >

                    Hospital Login

                </h1>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px"
                    }}
                >

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                        style={{
                            padding: "12px",
                            fontSize: "16px"
                        }}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        style={{
                            padding: "12px",
                            fontSize: "16px"
                        }}
                    />

                    <button
                        onClick={handleLogin}
                        style={{
                            padding: "12px",
                            backgroundColor: "#1976d2",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "16px",
                            borderRadius: "5px"
                        }}
                    >

                        Login

                    </button>

                </div>

            </div>

        </div>
    );
}

export default Login;