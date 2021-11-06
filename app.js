import express from "express"

const app = express()
const port = 5500
app.get("/", (req,res)=>{
    res.send("Hola grupos 16,17,18")
})

app.listen(port,()=>{
    console.log("servidor ativo y funcionando desde el puerto 5500")
})
