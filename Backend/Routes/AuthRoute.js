const express = require("express");
const router = express.Router();
const { userRegister, userLogin } = require("../Controllers/authController");


router.post("/register",function(req,res){ 
    userRegister(req, res);
}), 
router.post("/login",function(req,res){
    
    login(req, res);
    
    
});
module.exports = router;
