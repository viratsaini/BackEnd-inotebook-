const express=require("express");
const router=express.Router();

router.get('/',(req,res)=>{
    obj={
        a:"name",
        b:"class"
    }
    res.json(obj)
})

module.exports=router