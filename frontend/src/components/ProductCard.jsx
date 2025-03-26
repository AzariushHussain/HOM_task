const ProductCard = ({ productData, onEdit, onDelete }) => {
    return (
        <div className="card mb-3 shadow-sm">
            <div className="card-body d-flex justify-content-between align-items-center">
                {/* Left Side: Product Details */}
                <div>
                    <h5 className="card-title mb-1"><strong>Name:</strong> {productData.name}</h5>
                    <p className="card-text mb-1"><strong>Description:</strong> {productData.description}</p>
                    <p className="mb-1"><strong>Price:</strong> ₹{productData.price}</p>
                    <p className="mb-1"><strong>Category:</strong> {productData.category}</p>
                    <p className="mb-1"><strong>Date:</strong> {new Date(productData.date).toLocaleDateString()}</p>
                    <p className="mb-1"><strong>Quantity:</strong> {productData.quantity}</p>
                </div>

                {/* Right Side: Buttons */}
                <div>
                    <button 
                        className="btn btn-warning btn-sm me-2" 
                        onClick={() => onEdit(productData._id)}>
                        ✏️ Edit
                    </button>
                    <button 
                        className="btn btn-danger btn-sm" 
                        onClick={() => onDelete(productData._id)}>
                        🗑️ Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
