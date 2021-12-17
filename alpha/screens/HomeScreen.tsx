import * as React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { useNavigation,useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const navegation= useNavigation();
  const route = useRoute();
  
  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    navegation.navigate("SignIn")
  }
  if (route.params === undefined || route.params.id === undefined)
  {
    logOut(); 
  }
  const id = route.params.id;
  const usuarios = async () =>{
    navegation.navigate("Usuarios")
  }
  const perfil = async () =>{
    navegation.navigate("EditarPerfil",{id:id})
  }

  const proyectos = async () =>{
    navegation.navigate("Proyectos")
  }
  
  return (
    <View style={styles.container}>
      <Pressable
      onPress={perfil} 
      style={{
        backgroundColor:'blue',
        height:50,
        borderRadius:5,
        alignItems:'center',
        justifyContent:"center",
        width:'20%',
        marginHorizontal:"25%",
      }}>  
      <Text
        style={{
          color:"white",
          fontSize:18,
          fontWeight:"bold"
        }}>
          Editar Perfil
        </Text>
      </Pressable>
      <Pressable
      onPress={usuarios} 
      style={{
        backgroundColor:'blue',
        height:50,
        borderRadius:5,
        alignItems:'center',
        justifyContent:"center",
        width:'20%',
        marginHorizontal:"25%",
        marginTop:20,
      }}>  
      <Text
        style={{
          color:"white",
          fontSize:18,
          fontWeight:"bold"
        }}>
          Usuarios
        </Text>
      </Pressable>

      <Pressable
      onPress={proyectos} 
      style={{
        backgroundColor:'blue',
        height:50,
        borderRadius:5,
        alignItems:'center',
        justifyContent:"center",
        width:'20%',
        marginHorizontal:"25%",
        marginTop:20,
      }}>  
      <Text
        style={{
          color:"white",
          fontSize:18,
          fontWeight:"bold"
        }}>
          Proyectos
        </Text>
      </Pressable>

      <Pressable
      onPress={logOut} 
      style={{
        backgroundColor:'blue',
        height:50,
        borderRadius:5,
        alignItems:"center",
        justifyContent:"center",
        marginHorizontal:"25%",
        width:'20%',
        marginTop:20,

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
      
    </View>

    

  );
}
const styles = StyleSheet.create({
  container: {
    padding: 12,
    width:"80%",
    marginHorizontal:"10%"
  },
  
});
