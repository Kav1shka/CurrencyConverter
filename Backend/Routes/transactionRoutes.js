const express = require("express");
const router = express.Router();
const { transferFunds, getTransactionHistory } = require("../Controllers/TransactionController");


module.exports = router;

router.post("/transfer",function(req,res){ 
    transferFunds(req, res);
}), 
router.get("/getTransactionHistory",function(req,res){
    
    login(req, res);
    
    
});
