const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String, required: false },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
    registeredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = InventorySchema