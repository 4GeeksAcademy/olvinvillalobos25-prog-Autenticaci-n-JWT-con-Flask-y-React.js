import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        try {

            const response = await fetch(
                backendUrl + "/api/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            sessionStorage.setItem("token", data.token);

            navigate("/private");

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="container mt-5">

            <h1>Login</h1>

            <input
                className="form-control mb-3"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                className="form-control mb-3"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                className="btn btn-success"
                onClick={handleLogin}
            >
                Login
            </button>

        </div>

    );
};