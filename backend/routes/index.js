const express = require('express');
const  router = express.Router();

const authRoutes = require('./authRoute');
const productRoutes = require('./productRoute');

router.use('/auth', authRoutes);
router.use('/product', productRoutes);

module.exports = router;