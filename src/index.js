const { ApolloServer, gql } = require('apollo-server');
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
dotenv.config();
const { DB_URI, DB_NAME, JWT_SECRET } = process.env;

//Verificación de Autenticación Por Token
const getToken = (user) => jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30 days' }); //almacenando token desde el user id y la libreria jsonwebtoken

//Creación de Metodo getUserFromToken para las mutaciones que lo requieren
const getUserFromToken = async (token, db) => {
  if (!token) { return null }
  const tokenData = jwt.verify(token, JWT_SECRET); //funcion de la libreria jsonwebtoken
  if (!tokenData?.id) {
    return null;
  }
  return await db.collection('usuarios').findOne({ _id: ObjectId(tokenData.id) });  //busca el usuario con el _id igual al que reresa el ObjectId
}


//Resolvers
const resolvers = {
    //Query: {
      //misProyectos: () => []
  //},
  Query: {
    
    myUsers: async (_, __, { db, user }) => {  //Ver usuarios
      if (!user) { throw new Error('Error de Autenticación, por favor inicie Sesión'); }
      return await db.collection('usuarios').find().toArray();
    },
    myProjects: async (_, __, { db, user }) => {  //Ver lista de proyectos por lider
      if (!user) { throw new Error('Error de Autenticación, por favor inicie Sesión'); }
      return await db.collection('proyectos')   //busqueda
                                .find({ liderId: user._id })
                                .toArray();
    },
    getProject: async(_, { id }, { db, user }) => {  //Ver un proyecto por ID
      if (!user) { throw new Error('Error de Autenticación, por favor inicie Sesión'); }
      
      return await db.collection('proyectos').findOne({ _id: ObjectId(id) });
    },
    myInscripciones: async (_, {proyectoId}, { db, user }) => {  //Ver lista de inscripciones por proyecto
    if (!user) { throw new Error('Error de Autenticación, por favor inicie Sesión'); }
    return await db.collection('inscripciones')   //busqueda
                              .find({ proyectoId: ObjectId(proyectoId) })
                              .toArray();
    },
    getInscripcion: async(_, { id }, { db, user }) => {  //Ver una inscripcion por ID
      if (!user) { throw new Error('Error de Autenticación, por favor inicie Sesión'); }
      
      return await db.collection('inscripciones').findOne({ _id: ObjectId(id) });
    },

    myAvances: async (_, {proyectoId}, { db, user }) => {  //Ver lista de avances por proyecto
      if (!user) { throw new Error('Error de Autenticación, por favor inicie Sesión'); }
      return await db.collection('avances')   //busqueda
                                .find({ proyectoId: ObjectId(proyectoId) })
                                .toArray();
      },
      getAvances: async(_, { id }, { db, user }) => {  //Ver una inscripcion por ID
        if (!user) { throw new Error('Error de Autenticación, por favor inicie Sesión'); }
        
        return await db.collection('avances').findOne({ _id: ObjectId(id) });
      },
  },

//Mutationes
Mutation: {
  signUp: async(root,{input},{db})=>{   //Registrarse
        const hashedPassword=bcrypt.hashSync(input.password) //hasheamos la contraseña que viene desde el input
        const newUser={ //Creamos al nuevo usuario
            ...input,
            
            password:hashedPassword,
        }
    const result= await db.collection("usuarios").insertOne(newUser);  //Funcion asincrona que puede recibir 3 argumentos y regresa un objeto
    return{  //el esquema pide que se regrese un usuario cuando el proceso se haga bien, al igual que un token
        user:newUser,
        token:getToken(newUser),
    }
  },

  signIn: async(root,{input},{db})=>{    //Iniciar Sesión
    const user = await db.collection('usuarios').findOne({ email: input.email }); //compara el email en el input con los que estan en la collecion user
    const isPasswordCorrect = user && bcrypt.compareSync(input.password, user.password); //compara el hash del password en el input con los que estan en la collecion user
    if (!user || !isPasswordCorrect) {  //Verificamos si ambas respuestas son true
      throw new Error('Credenciales erroneas :('); //sino son true, lanzamos error
    } 
    return {//si son true retornamos la información completa que hay del usuario en la collecion
      user,
      token: getToken(user), //asignamos un getToken al campo token
    }
  },
  updateUser : async(_, {id, estado}, {db, user}) =>{   //Actualizar un usuario, La funcion pide el id del objeto a actualizar y el estado nuevo a asignar
  if(!user){console.log("No esta autenticado, por favor inicie sesión.")}  //Solo usuarios correctamente logueados lo pueden hacer
  const result= await db.collection("usuarios") 
                      .updateOne({_id:ObjectId(id)  //Se actualiza el documento que coincide en su id
                      },{
                          $set:{estado}  //Se setea el nuevo titulo
                      }
  )//IMPORTANTE: Si nuestro proyecto necesita que mas campos sean editables, se deben establecer como argumentos y brindarselos a la funcion desde el front(apollo)
//Si un campo no es editado, es decir, queda en blanco en el front, se puede establecer un if que evalue que si el campo esta en blanco entonces no se ejecuta el update
//console.log("Tarea Actualizada Correctamente")
return await db.collection("usuarios").findOne({_id:ObjectId(id)});  //regresa los nuevos valores de la tarea editada
},
createProyecto: async(root,{input},{db, user})=>{    //crear un proyecto
  if(!user){console.log("No esta autenticado, por favor inicie sesión.")} //Solo usuarios correctamente logueados lo pueden hacer
  const newProyecto={  //Creamos un nuevo documento de tipo proyecto que tenga: el input de proyecto
    ...input,
    fechaInicio: null,
    fechaFin: null,
    liderId:[user._id], //Crea un arreglo donde se guardaran los ID de los usuarios relacionados
    estado: "inactivo",
    fase: null
  }
  console.log("proyecto Creado Correctamente") //mensaje de consola
  const result= await db.collection("proyectos").insertOne(newProyecto); //guardar el documento en la coleccion corespondiente
  return newProyecto //El metodo en los esquemas pide regresar un documento de tipo proyecto
},
updateProyecto : async(_, {id, fechaInicio,fechaFin,estado,fase}, {db, user}) =>{   //Actualizar una tarea, La funcion pide el id del objeto a eliminar y el titulo nuevo a asignar
  if(!user){console.log("No esta autenticado, por favor inicie sesión.")}  //Solo usuarios correctamente logueados lo pueden hacer
  const result= await db.collection("proyectos") //La funcion pide el id del objeto a eliminar y el titulo nuevo a asignar
                      .updateOne({_id:ObjectId(id)  //Se actualiza el documento que coincide en su id
                      },{
                          $set:{fechaInicio,fechaFin,estado,fase}  //Se setea el nuevo titulo
                      }
  )//IMPORTANTE: Si nuestro proyecto necesita que mas campos sean editables, se deben establecer como argumentos y brindarselos a la funcion desde el front(apollo)
//Si un campo no es editado, es decir, queda en blanco en el front, se puede establecer un if que evalue que si el campo esta en blanco entonces no se ejecuta el update
console.log("Proyecto Actualizado Correctamente")
return await db.collection("proyectos").findOne({_id:ObjectId(id)});  //regresa los nuevos valores de la tarea editada
},

createInscripcion: async(root,{proyectoId},{db, user})=>{    //crear una inscripcion
  if(!user){console.log("No esta autenticado, por favor inicie sesión.")} //Solo usuarios correctamente logueados lo pueden hacer
  const newInscripcion={  //Creamos un nuevo documento de tipo inscripcion que tenga: el input de la inscripcion
    proyectoId: [ObjectId(proyectoId)],
    estudianteId:[user._id],
    estado:null,
    fechaIngreso: null,
    fechaEgreso: null,
  }
  console.log("inscripcion Creada Correctamente") //mensaje de consola
  const result= await db.collection("inscripciones").insertOne(newInscripcion); //guardar el documento en la coleccion corespondiente
  return newInscripcion //El metodo en los esquemas pide regresar un documento de tipo proyecto
},
updateInscripcion : async(_, {id,estado,fechaIngreso,fechaEgreso}, {db, user}) =>{   //Actualizar una inscripcion, La funcion pide el id del objeto a actualizar
  if(!user){console.log("No esta autenticado, por favor inicie sesión.")}  //Solo usuarios correctamente logueados lo pueden hacer
  const result= await db.collection("inscripciones") 
      .updateOne({_id:ObjectId(id)  //Se actualiza el documento que coincide en su id
      },{
          $set:{estado,fechaIngreso,fechaEgreso}  //Se setea 
        }
      )
  console.log("inscripcion Actualizada Correctamente")
  return await db.collection("inscripciones").findOne({_id:ObjectId(id)});  //regresa los nuevos valores de la inscripcion editada
},    
//createAvance(proyectoId: ID!,fechaAvance: String!,descripcion: String!):avances!
//addComentarioToAvance(AvanceId: ID!, ComentarioLider:String!):
createAvance: async(root,{proyectoId,descripcion},{db, user})=>{    //crear una inscripcion
  if(!user){console.log("No esta autenticado, por favor inicie sesión.")} //Solo usuarios correctamente logueados lo pueden hacer
  const newAvance={  //Creamos un nuevo documento de tipo avance que tenga: el input de avance
    proyectoId: [ObjectId(proyectoId)],
    fechaAvance:new Date().toISOString(),
    fechaEgreso: null,
    descripcion,
    observacionesLider:[]
  }
  console.log("avance Creada Correctamente") //mensaje de consola
  const result= await db.collection("avances").insertOne(newAvance); //guardar el documento en la coleccion corespondiente
  return newAvance //El metodo en los esquemas pide regresar un documento de tipo proyecto
},

addComentarioToAvance: async(_, {AvanceId, ComentarioLider}, {db,user}) =>{
  if(!user){console.log("No esta autenticado, por favor inicie sesión.")}  //Solo usuarios correctamente logueados lo pueden hacer
  const avances= await db.collection("avances").findOne({_id:ObjectId(AvanceId)});
   
  await db.collection("avances")
          .updateOne({
          _id:ObjectId(AvanceId)
        },{ $push: {
            observacionesLider:ComentarioLider,
          }
        })  
        avances.observacionesLider.push(ComentarioLider)
        return avances;
},


},



//Parametros inmutables del user
user:{
id:(root)=>{
    return root._id;}
},
proyectos: {
  id: ({ _id, id }) => _id || id, //id del objeto sera automaticamente el valor de _id
  liderId: async ({ liderId }, _, { db }) => Promise.all( //Función asincronica que se compromete a traer todos los usuarios relacionados con la tasklist 
    liderId.map((liderId) => (  
      db.collection('usuarios').findOne({ _id: liderId})) //Consulta usuarios por Id
    )
  ),
},

inscripciones: {
  id: ({ _id, id }) => _id || id, //id del objeto sera automaticamente el valor de _id
  proyectoId: async ({ proyectoId }, _, { db }) => Promise.all( //Función asincronica que se compromete a traer todos los usuarios relacionados con la tasklist 
    proyectoId.map((proyectoId) => (  
      db.collection('proyectos').findOne({ _id: proyectoId})) //Consulta usuarios por Id
    )
  ),
  estudianteId: async ({ estudianteId }, _, { db }) => Promise.all( //Función asincronica que se compromete a traer todos los usuarios relacionados con la tasklist 
    estudianteId.map((estudianteId) => (  
      db.collection('usuarios').findOne({ _id: estudianteId})) //Consulta usuarios por Id
    )
  ),
},

avances: {
  id: ({ _id, id }) => _id || id, //id del objeto sera automaticamente el valor de _id
  proyectoId: async ({ proyectoId }, _, { db }) => Promise.all( //Función asincronica que se compromete a traer todos los usuarios relacionados con la tasklist 
    proyectoId.map((proyectoId) => (  
      db.collection('proyectos').findOne({ _id: proyectoId})) //Consulta usuarios por Id
    )
  ),
  
},

}

const start = async () => {   //Iniciar Serviror
    const client = new MongoClient(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db(DB_NAME);
  
    const server = new ApolloServer({   //Contextos del servidor(necesarios)
      typeDefs, 
      resolvers, 
      context: async ({ req }) => {
        const user = await getUserFromToken(req.headers.authorization, db);
        //console.log(user)
        return {
          db,  //base de datos como contexto
          user,  //usuario autenticado como contexto
        }
      },
    });

    // Metodo listen, servidor iniciado
    server.listen().then(({ url }) => {
    console.log(`🚀  Servidor listo y corriendo en ${url}`);
    });
  }  
start();  //Arrancamos!


  //Esquemas para GRAPHL vs MongoDB
  const typeDefs = gql`   
  type Query {
    myUsers:[user!]!
    myProjects:[proyectos!]!
    getProject(id: ID!): proyectos

    myInscripciones(proyectoId: ID!):[inscripciones!]!
    getInscripcion(id: ID!): inscripciones

    myAvances(proyectoId: ID!):[avances!]!
    getAvances(id: ID!): avances
  }
  
  type user{
    id: ID!
    email: String!
    password: String!
    identificacion: String!
    nombre: String!
    rol: String!
    estado: String!
  } 
  
  type proyectos{
      id: ID!
      nombre: String!
      objetivosGenerales: String!
      objetivosEspecificos: String!
      prespuesto: Float!
      fechaInicio: String
      fechaFin: String
      liderId:[user!]!
      estado: String!
      fase: String
  }

  type inscripciones{
    id: ID!
    proyectoId:[proyectos!]!
    estudianteId:[user!]!
    estado:String
    fechaIngreso: String
    fechaEgreso: String
  }

  type avances{
    id: ID!
    proyectoId:[proyectos!]!
    fechaAvance: String!
    descripcion: String!
    observacionesLider: [String]
  }
  
  type Mutation{
    signUp(input:SignUpInput):AuthUser!
    signIn(input:SignInInput):AuthUser!
    updateUser(id:ID!, estado: String!):user!

    createProyecto(input:proyectoInput):proyectos!
    updateProyecto(id:ID!, fechaInicio: String,fechaFin: String,estado: String,fase:String):proyectos!

    createInscripcion(proyectoId: ID!):inscripciones!
    updateInscripcion(id:ID!,estado: String,fechaIngreso: String,fechaEgreso: String):inscripciones!

    createAvance(proyectoId: ID!,descripcion: String!):avances!
    addComentarioToAvance(AvanceId: ID!, ComentarioLider:String!): avances

    
    
    
  }
  input SignUpInput{
    email: String!
    password: String!
    identificacion: String!
    nombre: String!
    rol: String!
    estado: String!
  }
  input SignInInput{
    email: String!
    password: String!
  }
  input proyectoInput{
    nombre: String!
    objetivosGenerales: String!
    objetivosEspecificos: String!
    prespuesto: Float!
    
  }
  type AuthUser{
      user:user!
      token: String!
  }
  

  `;