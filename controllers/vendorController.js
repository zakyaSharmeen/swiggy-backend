const VendorModel = require("../models/Vendor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");

dotEnv.config();
const secretKey = process.env.SECRET_KEY;
const venderRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const venderEmail = await VendorModel.findOne({ email });
    if (venderEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newVendor = new VendorModel({
      username,
      email,
      password: hashPassword,
    });
    await newVendor.save();
    res.status(200).json({ message: "Vendor registered successfully" });
    console.log("Vendor registered successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const venderLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const vendor = await VendorModel.findOne({ email });
    if (!vendor) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ vendorId: vendor._id }, secretKey);
    res
      .status(200)
      .json({
        message: "Vendor logged and token created in successfully",
        token,
      });

    console.log("Vendor logged in successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// getting all vendors
const getAllVendors = async (req, res) => {
  try {
    const vendors = await VendorModel.find().populate("firm");
    res.status(200).json({ vendors });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get single vendor
const getVendorById = async (req, res) => {
  const vendorId = req.params.id;
  try {
    const vendor = await VendorModel.findById(vendorId).populate("firm");
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json({ vendor });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { venderRegister, venderLogin, getAllVendors,getVendorById }
