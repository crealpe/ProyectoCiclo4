import { useNavigation, useRoute } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
import { ActivityIndicator, Alert, Picker, Pressable, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import { useMutation, gql } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';


const NUEVO_AVANCE= gql`
mutation CreateAvance($proyectoId: ID!, $descripcion: String!) {
    createAvance(proyectoId: $proyectoId, descripcion: $descripcion) {
      id
      fechaAvance
      descripcion
      observacionesLider
      proyectoId {
        id
        nombre
      }
    }
  }
`;

const NuevoAvanceScreen =() => {
    const [descripcion, setDescripcion]=useState("")
    const navegation= useNavigation();
    const route = useRoute();
    const proyectoId = route.params.id;
    
    const [createrAvance, { data, error, loading }] = useMutation(NUEVO_AVANCE);
    if (error) {
      Alert.alert('Error registrando avance, por favor intente de nuevo')
    }
  
    {/*if (data){
      AsyncStorage.setItem("token",data.signUp.token)
      .then(()=>{
        AsyncStorage.setItem("rol",data.signUp.rol)
        if (data.signUp.rol=="Estudiante"){
          navegation.navigate("Home")
        }
      })
    }*/}
      
    if (data) {
          //alert("Avance creado Correctamente")
          navegation.navigate("Avances",{ id:proyectoId});
        
         
    }
    
    const onSubmit = () =>{
        createrAvance({variables: {proyectoId,descripcion}})
    }
   

  return (
    <View style={{padding:20}}>
      <Text style={{
          alignSelf:"center",
          fontSize:25,
          fontWeight:"bold"
      }}>Registro de Avances</Text>
      
    <TextInput
    placeholder="Descripcion avance"
    value={descripcion}
    onChangeText={setDescripcion}
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
        Grabar
        </Text>
  </Pressable>

  

    </View>
  );

  
}

export default NuevoAvanceScreen
