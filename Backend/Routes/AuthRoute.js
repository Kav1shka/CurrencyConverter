const express = require("express");
const router = express.Router();
const { register, login } = require("../Controllers/authController");


router.post("/register",function(req,res){ 
    register(req, res);
}), 
router.post("/login",function(req,res){
    
    login(req, res);
    
    
});
module.exports = router;
