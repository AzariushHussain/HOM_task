const { getProduct, createProduct, getProducts, upadteProduct, deleteProduct} = require('../models/productModel');
const { successResponse, errorResponse } = require('../utils/response');
const { responseMessages } = require('../utils/constants');
const formatMessage = require('../utils/messageFormatter');


const fetchProducts = async (req, res) => {
    try {
        console.log("📥 Receivd request ")
        const products = await getProducts(req.query.page);
        console.log("products", products);
        const message = formatMessage(responseMessages.success.Fetched, { key: 'products' });
        return successResponse(res, message, products);
    } catch (error) {
        console.log("🚫 Error fetching products:", error);
        return errorResponse(res, responseMessages.error.internalServerError);
    }
}

const fetchProduct = async (req, res) => {
    try {
        const product = await getProduct(req.params.id);
        if (!product) {
            const message = formatMessage(responseMessages.error.NotFound, { key: 'product' });
            return errorResponse(res, message);
        }
        console.log("product", product);
        const message = formatMessage(responseMessages.success.Fetched, { key: 'product' });
        return successResponse(res, message, product);
    } catch (error) {
        return errorResponse(res, responseMessages.error.internalServerError);
    }
}

const addProduct = async (req, res) => {
    console.log("add product called")
    try {
        console.log("📥 Received body:", req.body);
        data = req.body;
        data.registeredBy = req.user.id;
        const product = await createProduct(req.body);
        console.log("📤 Created product:", product);
        const message = formatMessage(responseMessages.success.Created, { key: 'product' });
        return successResponse(res, message, product);
    } catch (error) {
        console.log("🚫 Error creating product:", error);
        return errorResponse(res, responseMessages.error.internalServerError);
    }
}

const updateProducts = async (req, res) => {
    try {
        const product = await upadteProduct(req.params.id, req.body);
        if (!product) {
            const message = formatMessage(responseMessages.error.NotFound, { key: 'product' });
            return errorResponse(res, message);
        }
        const message = formatMessage(responseMessages.success.operationSuccessful, { key: 'product' });
        return successResponse(res, message, product);
    } catch (error) {
        return errorResponse(res, responseMessages.error.internalServerError);
    }
}

const removeProduct = async (req, res) => {
    try {
        const product = await deleteProduct(req.params.id);
        console.log("deleted product", product);
        if (!product) {
            const message = formatMessage(responseMessages.error.NotFound, { key: 'product' });
            return errorResponse(res, message);
        }
        const message = formatMessage(responseMessages.success.Deleted, { key: 'product' });
        return successResponse(res, message);
    } catch (error) {
        console.log("🚫 Error deleting product:", error);
        return errorResponse(res, responseMessages.error.internalServerError);
    }
}

module.exports = {
    fetchProduct,
    fetchProducts,
    addProduct,
    updateProducts,
    removeProduct
}