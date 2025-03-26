import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { getProducts,deleteProduct, updateProduct  } from "../api/product";
import { showNotification } from "../store/notificationSlice";

function Home() {
    const user =localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    // Fetch products when the component mounts or page changes
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts(currentPage, token);
                if (response.status === true) {
                    setProducts(response.data.data);
                    setTotalPages(response.data.totalPages);
                } else {
                    console.error("Failed to fetch products:", response.message);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [currentPage]);

    const onDelete = async(id) => {
        const confirmDelete = window.confirm("Do you really want to delete this product?");
        
        if (confirmDelete) {
            const response = await deleteProduct(token, id);
            console.log("delete product reponse in home: ", response);
            if (response.status === true) {
                dispatch(showNotification({ message: response.message, type: "success" }));
                const updatedProducts = products.filter((product) => product._id !== id);
                setProducts(updatedProducts);
            }
            else {
                dispatch(showNotification({ message: response.message, type: "error" }));
            }
        }
    };

    const onUpdate = async (id) => {
        console.log("update called with id: ", id);
        navigate(`/update/${id}`);

    }
    
    return (
        <>
            <Navbar />

            <div className="container mt-4">
                {/* Product List */}
                <div className="mt-4">
                    {loading ? (
                        <div className="text-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="d-flex justify-content-center align-items-center text-center mt-4">
                            No products found
                        </div>
                    ) : (
                        <div className="row">
                            {products.map((element) => (
                                <ProductCard key={element._id} productData={element} onEdit={onUpdate} onDelete={onDelete}/>
                            ))}
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {products.length>0 && <nav>
                    <ul className="pagination justify-content-center mt-4">
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                            <li
                                key={page}
                                className={`page-item ${page === currentPage ? "active" : ""}`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>}
            </div>
        </>
    );
}

export default Home;
