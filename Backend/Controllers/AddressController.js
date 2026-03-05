
const Address = require("../models/Address");

const createAddress = async (req, res) => {
    try {
        const address = await Address.create({
            ...req.body,
            user: req.user._id,
        });
        return res.status(201).json({
            success: true,
            data: address,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getUserAddresses = async (req, res) => {
    try {
        const addresses = await Address.find({ user: req.user._id });
        return res.status(200).json({
            success: true,
            data: addresses,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateAddress = async (req, res) => {
    try {
        const address = await Address.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true }
        );
        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: address,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteAddress = async (req, res) => {
    try {
        const address = await Address.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });
        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Address deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createAddress,
    getUserAddresses,
    updateAddress,
    deleteAddress,
};
