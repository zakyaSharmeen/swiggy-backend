    const express = require('express');
    const router = express.Router();
    const productController = require('../controllers/productController');
    const path = require("path");

    router.post('/add-product/:firmId', productController.addProduct);
    router.get('/:firmId/products', productController.getProductByFirm);

    router.get("/uploads/:imageName", (req, res) => {
        const imageName = req.params.imageName;
        res.sendFile(path.join(__dirname, "..", "uploads", imageName));
    
    })
    router.delete('/:productId', productController.deleProductById);
    

    module.exports = router;