const express = require('express');
const router = express.Router();
const multer = require("multer");
const { fetchProduct, fetchProducts,addProduct, updateProducts, removeProduct } = require('../controllers/productController');
const verifyToken = require('../middlewares/auth');

router.use(verifyToken);
router.get('/', fetchProducts);
router.get('/:id', fetchProduct);
router.post('/',addProduct);
router.put('/:id', updateProducts);
router.delete('/:id', removeProduct);

module.exports = router;