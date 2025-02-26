    const express = require('express');
    const firmController = require('../controllers/firmController');
    const router = express.Router();
    const verifyToken = require('../middleware/verifyToken');
    const path = require("path");


    router.post('/add-firm', verifyToken, firmController.addFirm);

router.get("/uploads/:imageName", (req, res) => {
    const imageName = req.params.imageName;
    res.sendFile(path.join(__dirname, "..", "uploads", imageName));

})

router.delete('/:firmId', firmController.deleteFirmById);

    module.exports = router;