const express = require("express");
const router = express.Router();
const { createTransfer, getAllTransfers } = require("../Controllers/TransferController");

router.post("/transfer",function(req,res){ 
    createTransfer(req, res);
}), 
router.get("/getTransactionHistory",function(req,res){
    
    getAllTransfers(req, res);

});
module.exports = router;