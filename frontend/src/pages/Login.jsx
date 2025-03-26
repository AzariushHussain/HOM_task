import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { showNotification } from "../store/notificationSlice";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            dispatch(showNotification({ message: "Email and Password are required!", type: "error" }));
            return;
        }

        const resp = await loginUser(email, password);
        console.log('resp', resp);

        if (resp.status === false) {
            dispatch(showNotification({ message: resp.message, type: "error" }));
            return;
        } else {
            dispatch(login({ user: { username: resp.data.user.username, email: resp.data.user.email }, token: resp.data.token }));
            dispatch(showNotification({ message: "Login successful!", type: "success" }));
            navigate("/");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow-lg" style={{ width: "22rem" }}>
                <h2 className="text-center mb-4">Login</h2>

                <form onSubmit={handleLogin}>
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
                        Login
                    </button>
                </form>

                <p className="mt-3 text-center">
                    Don't have an account? <a href="/register" className="text-primary">Register</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
