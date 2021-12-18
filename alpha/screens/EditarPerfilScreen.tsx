import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState,useEffect } from 'react';
import { ActivityIndicator, Alert, Pressable, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import { useMutation,useQuery, gql } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Token } from 'graphql';
const bcrypt = require('bcryptjs');

const UPDATE_USER= gql`
mutation Mutation($updateUserId: ID!,$email: String, $identificacion: String, $nombre: String, $password: String) {
  updateUser(id: $updateUserId, email: $email, identificacion: $identificacion, nombre: $nombre, password: $password) {
    id
    email
    password
    identificacion
    nombre
    rol
    estado
  }
}`;

const GET_USUARIO= gql`
query GetUser {
  getUser {
    id
    email
    password
    identificacion
    nombre
  }
}
`;



const EditarPerfilScreen =() => {
  const [email, setEmail]=useState("")
  const [nombre, setNombre]=useState("")
  const [identificacion, setIdentificacion]=useState("")
  const [password, setPassword]=useState("")
  
  const navegation= useNavigation();
    
  // mutation[0] : A function to trigger the mutation
  // mutation[1] : result object 
  //    { data,error, loading }
  const { data, error, loading, refetch } = useQuery(GET_USUARIO)
  const [updateUser,{error:createIerror}] = useMutation(UPDATE_USER);
  
  useEffect(() => {
    if (error) {
      alert("Error Cargando el usuario. Intenta de Nuevo")
    }
  }, [error]);

  useEffect(() => {
    if (data) {
        setEmail(data.getUser.email);
        setNombre(data.getUser.nombre)
        setIdentificacion(data.getUser.identificacion)
        setPassword(data.getUser.password)
        refetch();
    }
  }, [data]);

  
  const onSubmit = () =>{
    updateUser({
      variables: {
        updateUserId: data.getUser.id,
        email: email, 
        identificacion: identificacion, 
        nombre: nombre, 
        password:password
      }
    })
    if(!createIerror){
      alert("Usuario Editado correctamente")  
      navegation.navigate("Home");
    }else{
      alert("Error editando usuario")    
    }
  
  }
 

  return (
    <View style={{padding:20}}>
      <Text style={{
          alignSelf:"center",
          fontSize:25,
          fontWeight:"bold"
      }}>Editar Usuario</Text>
      
    <TextInput
    placeholder="Nombre Completo"
    value={nombre}
    onChangeText={setNombre}
    style={{
      color:"black",
      backgroundColor:"white",
      fontSize:18,
      marginVertical:25,
      width:'50%',
      marginHorizontal:"25%"
    }}
    />

<TextInput
    placeholder="Identificacion"
    value={identificacion}
    onChangeText={setIdentificacion}
    style={{
      color:"black",
      backgroundColor:"white",
      fontSize:18,
      marginVertical:25,
      width:'50%',
      marginHorizontal:"25%"
    }}
    />


      <TextInput
      placeholder="Email Aqui!"
      value={email}
      onChangeText={setEmail}
      style={{
        color:"black",
        backgroundColor:"white",
        fontSize:18,
        marginVertical:25,
        width:'50%',
        marginHorizontal:"25%"
      }}
    
    />

    <TextInput
    placeholder="Contraseña"
    value={password}
    onChangeText={setPassword}
    secureTextEntry
    style={{
      color:"black",
      backgroundColor:"white",
      fontSize:18,
      marginVertical:25,
      width:'50%',
      marginHorizontal:"25%"
    }}
    />


<Pressable
onPress={onSubmit} 
  style={{
    backgroundColor:'#004080',
    height:50,
    borderRadius:5,
    alignItems:'center',
    justifyContent:"center",
    marginTop:30,
    width:'50%',
    marginHorizontal:"25%",
  }}
  >
    {loading && <ActivityIndicator />}
    <Text
      style={{
        color:"white",
        fontSize:18,
        fontWeight:"bold"
      }} >
        Actualizar
        </Text>
  </Pressable>

 
    </View>
  );

  
}

export default EditarPerfilScreen


