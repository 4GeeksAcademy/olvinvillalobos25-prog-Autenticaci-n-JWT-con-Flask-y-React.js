import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {

        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        try {

            const response = await fetch(
                backendUrl + "/api/signup",
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

            alert(data.message);

            if (response.ok) {
                navigate("/login");
            }

        }
        catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="container mt-5">

            <h1>Create Account</h1>

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
                className="btn btn-primary"
                onClick={handleSignup}
            >
                Create Account
            </button>

        </div>

    );

}