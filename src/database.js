const mongoose=require("mongoose")
const mongoAtlasUri ="mongodb+srv://Admin:Sis01@proyectoconcesionario.rdqu7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

try {
    // Connect to the MongoDB cluster
     mongoose.connect(
      mongoAtlasUri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log("Estamos conectadisimos a Mongoose")
    );

  } catch (e) {
    console.log("Error en conexion :(");
  }