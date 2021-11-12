const express = require("express")
const router=express.Router()

router.get("/",(req,res)=>{
    res.send("Hola grupos 16,17 y 18")
})

router.get("/abouts",(req,res)=>{
    res.send("esto es acerca de nosotros")
})

module.exports=router;

