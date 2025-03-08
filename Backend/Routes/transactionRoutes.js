const express = require("express");
const router = express.Router();
const { transferFunds, getTransactionHistory } = require("../Controllers/TransactionController");

// Currency Transfer Routes
router.post("/transfer", transferFunds);
router.get("/transactions", getTransactionHistory);

module.exports = router;
