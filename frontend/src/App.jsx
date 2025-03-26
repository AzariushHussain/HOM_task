import './App.css'
import React, {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ToastNotification from "./components/ToastNotification";
import CreateProductForm from './components/CreateProductForm';
import { setUserFromStorage } from "./store/authSlice";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      dispatch(setUserFromStorage({ user: JSON.parse(user), token }));
    }
  }, [dispatch]);

  return (
    <>
      <ToastNotification />
      <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/add-product" element={<CreateProductForm />} />
                  <Route path="/update/:id" element={<CreateProductForm />} />
                </Route>
            </Routes>
        </Router>
    </>
  )
}

export default App
