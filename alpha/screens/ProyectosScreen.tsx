import * as React from 'react';
import { Alert, FlatList, Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, gql } from '@apollo/client';
import alert from '../components/Alert';
import { AntDesign } from '@expo/vector-icons';
import ProyectoItem from '../components/ProyectoItem';

const MY_PROYECTOS = gql`
query MyProjects {
  myProjects {
    id
    nombre
    objetivosGenerales
    objetivosEspecificos
    prespuesto
    fechaInicio
    fechaFin
    liderId {
      id
      nombre
    }
    estado
    fase
  }
}
`;

export default function ProyectosScreen() {
  const navegation= useNavigation();
  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    navegation.navigate("SignIn")
  }

	const nuevoProyecto = async () =>{
    navegation.navigate("NuevoProyecto", {items: proyectos, setData: setProyectos})
  }

  const [proyectos, setProyectos] = useState([]);

  const { data, error, loading, refetch} = useQuery(MY_PROYECTOS)

  useEffect(() => {
    if (error) {
      alert("Error Cargando los proyectos. Intenta de Nuevo")
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setProyectos(data.myProjects);
     
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
      
      <Text style={styles.title}>LISTA DE PROYECTOS</Text>
      <FlatList
        data={proyectos}
        renderItem={({item}) => <><ProyectoItem proyecto={item} /></>}
        style={{ width: '100%' }}
      />
      <View style={{
        flexDirection: 'row'}}>
      <Pressable
      onPress={nuevoProyecto} 
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
          Nuevo Proyecto
        </Text>
      </Pressable>
      <Pressable
      onPress={() => refetch()} 
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
          Refrescar
        </Text>
      </Pressable>
      </View>
    </View>

    

  );
}
const styles = StyleSheet.create({
  container: {
    padding: 12,
    width:"90%",
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
    color:"black",
    width:"80%",
    marginHorizontal:"10%",
    marginBottom:30
  },
  time: {
    color: 'darkgrey'
  }
});
