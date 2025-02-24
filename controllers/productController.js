const ProductModel = require('../models/Product');
const multer = require('multer');
const FirmModel = require('../models/Firm');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()  + path.extname(file.originalname));  
    }
});

const upload = multer({ storage: storage });


const addProduct = async (req, res) => {
    try {
        const { productName, price, category, bestSeller, description } = req.body;
        const image = req.file ? req.file.filename : undefined;


        const firmId = req.params.firmId;
        const firm = await FirmModel.findById(firmId);
        if (!firm) {
            return res.status(400).json({ message: "Firm not found" });
        }
        const product = new ProductModel({
            productName,
            price,
            category,
            bestSeller,
            description,
            image,
            firm: firm._id
        });

        const savedProduct = await product.save();
        firm.products.push(savedProduct);
        await firm.save();





        return res.status(200).json({ message: "Product added successfully" , savedProduct});

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }

}

const getProductByFirm = async (req, res) => {
    try {
        const firmId = req.params.firmId;
        const firm = await FirmModel.findById(firmId)
        if (!firm) {
            return res.status(400).json({ message: "Firm not found" });
        }     

        const restaurantName = firm.firmName
        const products = await ProductModel.find({ firm: firmId });
        return res.status(200).json( {restaurantName,products} );
        
        


} catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
   
}   
}


const deleProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const deletedproduct = await ProductModel.findByIdAndDelete(productId);
        if (!deletedproduct) {
            return res.status(400).json({ message: "Product not found" });
        }
        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}


module.exports = { addProduct: [upload.single('image'), addProduct],getProductByFirm,deleProductById };
