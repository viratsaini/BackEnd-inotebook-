const express=require("express");
const router=express.Router();

router.get('/',(req,res)=>{
    classs={
        a:"nadfkjbjsnme",
        b:"clsdjdbsjfns"
    }
    res.json(classs)
})

module.exports=router