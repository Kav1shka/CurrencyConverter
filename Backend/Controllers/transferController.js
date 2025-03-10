
const Transfer = require("../Models/Transfer.js");


const getExchangeRate = require("../Services/exchangeRateService.js");

/**
 * @desc Create a new transfer
 * @route POST /api/transfers
 */
  const createTransfer = async (req, res) => {
    try {
        const { fromCurrency, toCurrency, transferAmount } = req.body;

        // Validate input
        if (!fromCurrency || !toCurrency || !transferAmount) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Fetch exchange rate
        const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
        if (!exchangeRate) {
            return res.status(400).json({ error: 'Invalid currency conversion' });
        }

        // Calculate converted amount
        const convertedAmount = transferAmount * exchangeRate;

        // Create and save transfer record
        const newTransfer = new Transfer({
            fromCurrency,
            toCurrency,
            transferAmount,
            convertedAmount,
        });

        await newTransfer.save();
        res.status(201).json({ message: 'Transfer recorded successfully', transfer: newTransfer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * @desc Get all transfers
 * @route GET /api/transfers
 */
const getAllTransfers = async (req, res) => {
    try {
        const transfers = await Transfer.find().sort({ createdAt: -1 });
        res.status(200).json(transfers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * @desc Delete a transfer
 * @route DELETE /api/transfers/:id
 */
 const deleteTransfer = async (req, res) => {
    try {
        const { id } = req.params;
        const transfer = await Transfer.findById(id);

        if (!transfer) {
            return res.status(404).json({ error: 'Transfer not found' });
        }

        await transfer.deleteOne();
        res.status(200).json({ message: 'Transfer deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};
  module.exports = { createTransfer,getAllTransfers,deleteTransfer};