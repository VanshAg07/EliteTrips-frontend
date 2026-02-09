import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./Signup.css";

export default function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username || !email || !password) {
            setError("Please fill all fields.");
            return;
        }

        fetch("https://elitetrips-backend.onrender.com/register", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer your-token'
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data, "userRegister");
            if (data.status === "ok") {
                navigate("/Login");
            } else {
                setError("Signup failed. User may already exist.");
            }
        });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
                <p id="heading">Sign Up</p>
                {error && <p className="error-message">{error}</p>}
                <div className="field">
                    <input
                        autoComplete="off"
                        placeholder="Username"
                        className="input-field"
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="field">
                    <input
                        placeholder="Email"
                        className="input-field"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="field">
                    <input
                        placeholder="Password"
                        className="input-field"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="btn">
                    <button className="button1">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sign
                        Up&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </button>
                    <Link to="/Login"><button className="button2">Login</button></Link>
                </div>
            </form>
        </div>
    );
}