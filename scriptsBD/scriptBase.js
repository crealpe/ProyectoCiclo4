// User Roles
ADMIN = "administrador"
LIDER = "lider"
ESTUDIANTE= "estudiante"

// User Status
PENDIENTE = "pendiente"
AUTORIZADO = "autorizado"
NOAUTORIZADO = "no_autorizado"

// Project Status
ACTIVO = "activo"
INACTIVO= "inactivo"

// Project fase
INICIADO = "iniciado"
ENDESARROLLO = "en_desarrollo"
TERMINADO = "terminado"

// insripciones estado
ACEPTADA= "aceptada"
RECHAZADA= "rechazada"


db.createCollection("usuarios");
usuarios = db.usuarios.insertMany([
  {"email": "carmen@gmail.com","password": "1234","identificacion":"12345678", "nombre": "Carmen",  "rol": ADMIN, "estado": AUTORIZADO },
  {"email": "humberto@gmail.com","password": "1234","identificacion":"1908765435", "nombre": "Humberto",  "rol": ADMIN, "estado": AUTORIZADO },
  {"email": "lola@gmail.com","password": "1234","identificacion":"34567543", "nombre": "Lola",  "rol": LIDER, "estado": AUTORIZADO },  
  {"email": "wilson@gmail.com","password": "1234","identificacion":"12567432", "nombre": "Wilson",  "rol": LIDER, "estado": PENDIENTE },
  {"email": "leidy@gmail.com","password": "1234","identificacion":"1087654321", "nombre": "Leidy",  "rol": LIDER, "estado": AUTORIZADO },
  {"email": "Juan@gmail.com","password": "1234","identificacion":"45321654", "nombre": "Juan",  "rol": ESTUDIANTE, "estado": AUTORIZADO },
  {"email": "Dilsa@gmail.com","password": "1234","identificacion":"27432125", "nombre": "Dilsa",  "rol": ESTUDIANTE, "estado": AUTORIZADO },
  {"email": "Mario@gmail.com","password": "1234","identificacion":"36432145", "nombre": "Mario",  "rol": ESTUDIANTE, "estado": AUTORIZADO },
  {"email": "Jose@gmail.com","password": "1234","identificacion":"5432129", "nombre": "Jose",  "rol": ESTUDIANTE, "estado": AUTORIZADO },
  {"email": "Viviana@gmail.com","password": "1234","identificacion":"55234777", "nombre": "Viviana",  "rol": ESTUDIANTE, "estado": PENDIENTE },		
  
]);

db.createCollection("proyectos");
proyectos = db.proyectos.insertMany([
  {"nombre": "proyecto 1", "objetivosGenerales": "objetivosGenerales 1", "objetivosEspecificos": "objetivosEspecificos 1", "presupuesto": 10000000, "fechaInicio":"01/10/2021", "fechaFin": "31/10/2021", "liderId": [usuarios["insertedIds"]["2"]], "estado": INACTIVO, "fase": TERMINADO},
  {"nombre": "proyecto 2", "objetivosGenerales": "objetivosGenerales 2", "objetivosEspecificos": "objetivosEspecificos 2", "presupuesto": 20000000, "fechaInicio":null, "fechaFin":null, "liderId": [usuarios["insertedIds"]["2"]], "estado": INACTIVO, "fase": null},
  {"nombre": "proyecto 3", "objetivosGenerales": "objetivosGenerales 3", "objetivosEspecificos": "objetivosEspecificos 3", "presupuesto": 13000000, "fechaInicio":null, "fechaFin":null, "liderId": [usuarios["insertedIds"]["4"]], "estado": INACTIVO, "fase": null},
  {"nombre": "proyecto 4", "objetivosGenerales": "objetivosGenerales 4", "objetivosEspecificos": "objetivosEspecificos 4", "presupuesto": 15000000, "fechaInicio":"01/09/2021", "fechaFin":null, "liderId": [usuarios["insertedIds"]["4"]], "estado": ACTIVO, "fase": ENDESARROLLO},
  {"nombre": "proyecto 5", "objetivosGenerales": "objetivosGenerales 5", "objetivosEspecificos": "objetivosEspecificos 5", "presupuesto": 12000000, "fechaInicio":"23/11/2021", "fechaFin":null, "liderId": [usuarios["insertedIds"]["2"]], "estado": ACTIVO, "fase": INICIADO},	
]);

db.createCollection("inscripciones");
inscripciones = db.inscripciones.insertMany([
  {"proyectoId": [proyectos["insertedIds"]["3"]], "estudianteId": [usuarios["insertedIds"]["5"]], "estado": ACEPTADA, "fechaIngreso": "05/09/2021", "fechaEgreso": null},
  {"proyectoId": [proyectos["insertedIds"]["4"]], "estudianteId": [usuarios["insertedIds"]["6"]], "estado": null, "fechaIngreso": null, "fechaEgreso": null},
  {"proyectoId": [proyectos["insertedIds"]["4"]], "estudianteId": [usuarios["insertedIds"]["7"]], "estado": null, "fechaIngreso": null, "fechaEgreso": null},
  {"proyectoId": [proyectos["insertedIds"]["3"]], "estudianteId": [usuarios["insertedIds"]["7"]], "estado": RECHAZADA, "fechaIngreso": "20/09/2021", "fechaEgreso": null},
  {"proyectoId": [proyectos["insertedIds"]["4"]], "estudianteId": [usuarios["insertedIds"]["8"]], "estado": null, "fechaIngreso": null, "fechaEgreso": null},
  
]);

db.createCollection("avances");
avances = db.avances.insertMany([
  {"proyectoId":[proyectos["insertedIds"]["3"]], "fechaAvance": "10/09/2021", "descripcion": "descripcion avance 1", "observacionesLider": ["muy bueno"]},
  {"proyectoId":[proyectos["insertedIds"]["3"]], "fechaAvance": "15/09/2021", "descripcion": "descripcion avance 2", "observacionesLider": ["buenas notas"]},
]);
