const express=require("express");
const path=require("path");
const exphbs=require("express-handlebars")
const methodOverride=require("method-override")
const session=require("express-session")

//Variables
const app= express()
require("./database")

app.set("port",5500) 
app.set("views", path.join(__dirname,"views"))
app.engine(".hbs", exphbs({
    defaultLayout:"main", //marco por defecto
    layoutsDir: path.join(app.get("views"),"layouts"),
    partialsDir: path.join(app.get("views"),"partials"),
    extname: ".hbs",
}));
app.set("view engine",".hbs");

//funciones
app.use(express.urlencoded({extended: false})) //no se aceptan formatos diferentes a texto
app.use(methodOverride("_method")) // extiende funcionalidades de formularios, ver mas adelante
//pendiente configurar sessions

//rutas
app.use(require("./routes/index"))
app.use(require("./routes/proyectos"))
app.use(require("./routes/usuarios"))

//archivos
app.use(express.static(path.join(__dirname,"public")))

app.listen(app.get("port"),()=>{
    console.log("servidor ativo y funcionando desde el puerto", app.get("port"))
})
