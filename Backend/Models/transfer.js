const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema(
    {
        fromCurrency: {
            type: String,
            required: true,
            enum: ['USD', 'LKR', 'AUD', 'INR'], // Allowed currencies
        },
        toCurrency: {
            type: String,
            required: true,
            enum: ['USD', 'LKR', 'AUD', 'INR'],
        },
        transferAmount: {
            type: Number,
            required: true,
            min: 0.01, // Minimum transfer amount
        },
        convertedAmount: {
            type: Number,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const Transfer = mongoose.model('Transfer', transferSchema);
module.exports=Transfer;
