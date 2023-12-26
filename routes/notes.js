//defining the process of how the notes are taken 
const express=require("express");
const router=express.Router();

router.get('/',(req,res)=>{
    obj={
        a:"name",
        b:"class"
    }
    res.json(obj)
})
//exporting the notes module to notes routes
module.exports=router