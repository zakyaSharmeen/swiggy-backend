

const multer = require('multer');
const VendorModel = require('../models/Vendor');
const FirmModel = require('../models/Firm');  
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()  + path.extname(file.originalname));  
    }
});

const upload = multer({ storage: storage });

const addFirm = async (req, res) => {
    try {
        const { firmName, area, category, region, offer } = req.body;
        const image = req.file ? req.file.filename : undefined;

        const vendor = await VendorModel.findById(req.vendorId);  
        console.log("Vendor ID:", req.vendorId);

        if (!vendor) {
            return res.status(400).json({ message: "Vendor not found" });
        }

        const firm = new FirmModel({
            firmName,
            area,
            category,
            region,
            offer,
            image,
            vendor: vendor._id
        });

        const savedFirm = await firm.save();
        vendor.firm.push(savedFirm);
        await vendor.save();
        return res.status(200).json({ message: "Firm added successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteFirmById = async (req, res) => {
    try {
        const firmId = req.params.firmId;
        const dletedProduct = await FirmModel.findByIdAndDelete(firmId);
        if (!dletedProduct) {
            return res.status(400).json({ message: "Firm not found" });
        }
        // await firm.remove();
        return res.status(200).json({ message: "Firm deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { addFirm: [upload.single('image'), addFirm] ,deleteFirmById};
