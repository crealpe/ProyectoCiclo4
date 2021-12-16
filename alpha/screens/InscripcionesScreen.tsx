import * as React from 'react';
import { Alert, FlatList, Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, gql } from '@apollo/client';
import alert from '../components/Alert';
import { AntDesign } from '@expo/vector-icons';
import InscripcionItem from '../components/InscripcionItem';

const MY_INSCRIPCIONES = gql`
query MyInscripciones($proyectoId: ID!) {
  myInscripciones(proyectoId: $proyectoId) {
    id
    estudianteId {
      id
      nombre
    }
    estado
    fechaIngreso
    fechaEgreso
    proyectoId {
      id
      nombre
    }
  }
}
`;

export default function InscripcionesScreen() {
  const navegation= useNavigation();
  
  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    navegation.navigate("SignIn")
  }

 const nuevaInscripcion = async () =>{
    //navegation.navigate("NuevaInscripcion")
  }

  const [inscripciones, setInscripciones] = useState([]);
  const route = useRoute();
  const id = route.params.id;

  const { data, error, loading } = useQuery(MY_INSCRIPCIONES,{ variables: { proyectoId:id }})

  

  useEffect(() => {
    if (error) {
      alert("Error Cargando las inscripciones. Intenta de Nuevo")
    }
  }, [error]);

  useEffect(() => {
    if (data) {
        setInscripciones(data.myInscripciones);
    }
  }, [data]);



  return (
    <View style={styles.container}>
      <Pressable
      onPress={logOut} 
      style={{
        backgroundColor:'blue',
        height:50,
        borderRadius:5,
        alignItems:"center",
        justifyContent:"center",
        marginHorizontal:"85%",
        width:'15%',
        position:"absolute"

      }}>  
      <Text
        style={{
          color:"white",
          fontSize:18,
          fontWeight:"bold"
        }}>
          Cerrar Sesión
        </Text>
      </Pressable>
      <Text style={styles.title}>LISTA DE INSCRIPCIONES</Text>
      <FlatList
        data={inscripciones}
        renderItem={({item}) => <><InscripcionItem inscripcion={item} /></>}
        style={{ width: '100%' }}
      />
      <Pressable
      onPress={nuevaInscripcion} 
      style={{
        backgroundColor:'blue',
        height:50,
        borderRadius:5,
        alignItems:'center',
        justifyContent:"center",
        marginTop:30,
        width:'20%',
        marginHorizontal:"5%",
      }}>  
      <Text
        style={{
          color:"white",
          fontSize:18,
          fontWeight:"bold"
        }}>
          Nueva Inscripción
        </Text>
      </Pressable>
    </View>

    

  );
}
const styles = StyleSheet.create({
  container: {
    padding: 12,
    width:"80%",
    marginHorizontal:"10%"
  },
  root: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#404040',
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    borderColor:"white",
    borderRadius:2,
    fontWeight: 'bold',
    textAlign:"center",
    padding: 5,
    color:"white",
    width:"80%",
    marginHorizontal:"10%",
    marginBottom:30
  },
  time: {
    color: 'darkgrey'
  }
});