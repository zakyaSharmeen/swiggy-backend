const VendorModel = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");

dotEnv.config();

const secretKey = process.env.SECRET_KEY;

const verifyToken = async (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ message: "Token is required" });
    }
    try{
        const decoded = jwt.verify(token, secretKey);
        const vendor = await VendorModel.findById(decoded.vendorId);
        if(!vendor){
            return res.status(401).json({message: "Vendor not found"})
        }

        req.vendorId = vendor._id
        next()
        
    }catch(error){
        console.log(error.message);
        
        return res.status(401).json({message: "Invalid token"})
    }   
}


module.exports = verifyToken;



