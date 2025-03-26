import React, { useEffect, useState } from "react";
import { createProduct, updateProduct, getProductById } from "../api/product";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../store/notificationSlice";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const CreateProductForm = () => {
    const { id } = useParams();  // Get product ID from URL (if updating)
    console.log("received id to update: ", id);
    const location = useLocation();
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);

    // Fetch product details if updating
    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                setLoading(true);
                try {
                    const response = await getProductById(token, id); // Fetch product details
                    if (response.status) {
                        const { name, quantity, description, price, category } = response.data;
                        setName(name);
                        setQuantity(quantity);
                        setDescription(description);
                        setPrice(price);
                        setCategory(category);
                    } else {
                        dispatch(showNotification({ message: "Failed to fetch product!", type: "error" }));
                    }
                } catch (error) {
                    console.error("Error fetching product:", error);
                    dispatch(showNotification({ message: "Error fetching product!", type: "error" }));
                }
                setLoading(false);
            };
            fetchProduct();
        }
    }, [id, token, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !price || !category) {
            dispatch(showNotification({ message: "Name, Price, and Category are required!", type: "error" }));
            return;
        }

        const productData = {
            name,
            quantity: Number(quantity),
            description,
            price: Number(price),
            category,
        };

        try {
            let response;
            if (id) {
                // Update existing product
                response = await updateProduct(token, id, productData);
            } else {
                // Create new product
                response = await createProduct(token, productData);
            }

            if (response.status) {
                dispatch(showNotification({ message: response.message, type: "success" }));
                navigate("/");
            } else {
                dispatch(showNotification({ message: response.message, type: "error" }));
            }
        } catch (error) {
            dispatch(showNotification({ message: "Error processing request!", type: "error" }));
            console.error("Product submission error:", error);
        }
    };
    console.log("product creation form location: ", location);
    return (
        <div className="container mt-4">
            <h4 className="mb-3">{id ? "Update Product" : "Add New Product"}</h4>
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <form onSubmit={handleSubmit} className="border p-4 rounded bg-light">
                    <div className="mb-3">
                        <label className="form-label">Product Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Enter product name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Quantity</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            placeholder="Enter quantity" 
                            value={quantity} 
                            onChange={(e) => setQuantity(e.target.value)} 
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea 
                            className="form-control" 
                            placeholder="Enter product description" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Price</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            placeholder="Enter price" 
                            value={price} 
                            onChange={(e) => setPrice(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Category</label>
                        <select 
                            className="form-select" 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)} 
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Home">Home</option>
                            <option value="Beauty">Beauty</option>
                            <option value="Books">Books</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        {id ? "Update Product" : "Add Product"}
                    </button>
                </form>
            )}
        </div>
    );
};

export default CreateProductForm;
