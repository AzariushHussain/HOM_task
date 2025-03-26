const mongoose = require('mongoose');

const UserSchema = require('./schemas/userSchema');
const ProductSchema = require('./schemas/productSchema');

const UserModel = mongoose.model('User', UserSchema);
const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = {
    UserModel,
    ProductModel
}