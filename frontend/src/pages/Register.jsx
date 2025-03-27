import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../store/authSlice";
import { showNotification } from "../store/notificationSlice";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!username || !email || !password) {
            alert("All fields are required!");
            return;
        }
        const resp = await registerUser(username, email, password);
        console.log("resp", resp);
        if (resp.status === true) {
            dispatch(login({ user: { username, email }, token: resp.data.token }));
            dispatch(showNotification({ message: resp.message, type: "success" }));
            navigate("/");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow-lg" style={{ width: "22rem" }}>
                <h2 className="text-center mb-4">Register</h2>

                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Register
                    </button>
                </form>

                <p className="mt-3 text-center">
                    Already have an account? <Link to="/login" className="text-primary">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
