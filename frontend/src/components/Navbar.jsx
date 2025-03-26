import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm fixed-top">
            <div className="container">
                {/* Left Side - Welcome Message */}
                {isAuthenticated && (
                    <span className="navbar-text">
                        Welcome, <strong>{user.username}</strong>!
                    </span>
                )}

                {/* Right Side - Logout Button */}
                {isAuthenticated && (
                    <div>
                        <button className="btn btn-primary me-3" onClick={() => navigate("/add-product")}>
                            + Add New Product
                        </button>

                    <button 
                        onClick={handleLogout} 
                        className="btn btn-danger ms-auto">
                        Logout
                    </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
