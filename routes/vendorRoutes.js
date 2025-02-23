
const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');

router.post('/register', vendorController.venderRegister);
router.post('/login', vendorController.venderLogin);
router.get('/all-vendors', vendorController.getAllVendors);
router.get('/single-vendor/:id', vendorController.getVendorById);



module.exports = router;