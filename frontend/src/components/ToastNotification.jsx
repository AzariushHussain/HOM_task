import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideNotification } from "../store/notificationSlice";

const ToastNotification = () => {
    const dispatch = useDispatch();
    const { message, type, visible } = useSelector((state) => state.notification);

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                dispatch(hideNotification());
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [visible, dispatch]);

    if (!visible) return null;

    return (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
            <div
                className={`toast show align-items-center text-white border-0 ${
                    type === "success" ? "bg-success" : "bg-danger"
                }`}
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
            >
                <div className="d-flex">
                    <div className="toast-body fw-bold">{message}</div>
                    <button
                        type="button"
                        className="btn-close btn-close-white me-2 m-auto"
                        onClick={() => dispatch(hideNotification())}
                        aria-label="Close"
                    ></button>
                </div>
            </div>
        </div>
    );
};

export default ToastNotification;
