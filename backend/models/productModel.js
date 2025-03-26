const { ProductModel } = require('../models/schemaLoader');
const paginate = require('../utils/paginate');

const createProduct = async (data) => {
    const product = new ProductModel(data);
    return await product.save();
}

const getProducts = async (page=1) => {
    const products = await paginate(ProductModel, {}, page, 5, {}, { createdAt: -1 }); 
    return products;
};

const getProduct = async (id) => {
    const product = await ProductModel.findById(id);
    return product;
};


const upadteProduct = async (_id, data) => {
    const product = await ProductModel.findByIdAndUpdate(_id, { $set: data }, { new: true, runValidators: true });
    return product;
}

const deleteProduct = async (id) => {
    const product = await ProductModel.findByIdAndDelete(id);
    return product;
}   

module.exports = {
    getProduct,
    createProduct,
    getProducts,
    upadteProduct,
    deleteProduct
}