import * as React from 'react';
import { Alert, FlatList, Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, gql } from '@apollo/client';
import alert from '../components/Alert';
import { AntDesign } from '@expo/vector-icons';
import ComentarioItem from '../components/ComentarioItem';

const MY_COMENTARIOS = gql`
query MyComentarios($myComentariosId: ID!) {
    myComentarios(id: $myComentariosId) {
      observacionesLider
    }
  }
`;

export default function ComentariosScreen() {
  const navegation= useNavigation();
  
  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    navegation.navigate("SignIn")
  }

 

  const [comentarios, setComentarios] = useState([]);
  const route = useRoute();
  const id = route.params.id;

  const { data, error, loading } = useQuery(MY_COMENTARIOS,{ variables: { myComentariosId:id }})

  

  useEffect(() => {
    if (error) {
      alert("Error Cargando los comentarios. Intenta de Nuevo")
    }
  }, [error]);

  useEffect(() => {
    if (data) {
        setComentarios(data.myComentarios);
    }
  }, [data]);

  console.log(comentarios)

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
      <Text style={styles.title}>LISTA DE COMENTARIOS</Text>
      <FlatList
        data={comentarios}
        renderItem={({item}) => <><ComentarioItem comentario={item} /></>}
        style={{ width: '100%' }}
      />
      
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
    color:"black",
    width:"80%",
    marginHorizontal:"10%",
    marginBottom:30
  },
  
});