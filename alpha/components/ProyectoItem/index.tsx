import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Pressable } from 'react-native'
import { AntDesign, MaterialCommunityIcons,Fontisto,FontAwesome5 } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { useMutation, gql } from '@apollo/client';
import alert from '../Alert';
import styles from '../styles/styles';
import { Int32 } from 'mongodb';

const UPDATE_PROYECTO = gql`
mutation UpdateProyecto($updateProyectoId: ID!, $fechaInicio: String, $estado: String, $fase: String) {
  updateProyecto(id: $updateProyectoId, fechaInicio: $fechaInicio,  estado: $estado, fase: $fase) {
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
interface ProyectoItemProps {
  proyecto: {
    id: string,
    nombre: string,
    objetivosGenerales: string,
    objetivosEspecificos: string,
    prespuesto: string,
    fechaInicio: string,
    fechaFin: string,
    liderId: string[],
    estado:string,
    fase:string
  }
}
const ProyectoItem = ({ proyecto }: ProyectoItemProps) => {
  const navegation = useNavigation();
  const [estado, setEstado] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fase, setFase] = useState('');
  const [updateProyecto] = useMutation(UPDATE_PROYECTO);
  
  const onPress = () => {
      
    updateProyecto({
      
      variables: {
        updateProyectoId: proyecto.id,
        estado: estado,
        fechaInicio:fechaInicio,
        fase:fase
       
      }
    })
  };
  
  async function inscripciones (){
    navegation.navigate("Inscripciones",{ id:proyecto.id})
  }
  async function avances() {
    navegation.navigate("Avances",{ id:proyecto.id})
    }
  useEffect(() => {
    setEstado('activo');
    setFechaInicio(new Date(Date.now()).toISOString());
    setFase('inicial');
  }, [])
  
  

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
      <Pressable onPress={onPress} style={styles.root}>
      <View style={styles.iconContainer}>
      <Fontisto name="checkbox-active" size={24} color="white" />
      </View>
      </Pressable>
      <Pressable onPress={inscripciones} style={styles.root}>
      <View style={styles.iconContainer}>
      <AntDesign name="form" size={24} color="white" />
      </View>
      </Pressable>
      <Pressable onPress={avances} style={styles.root}>
      <View style={styles.iconContainer}>
      <AntDesign name="addfile" size={24} color="white" />
      </View>
      </Pressable>
      <View style={{ flexDirection: 'row', alignItems: 'center', width:120 }}>
        <Text >{proyecto.nombre}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 10,width:150 }}>
        <Text >{proyecto.objetivosGenerales}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center',padding: 10,width:150 }}>
        <Text >{proyecto.objetivosEspecificos}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center',padding: 10, width:100 }}>
        <Text >{proyecto.prespuesto}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center',padding: 10, width:100 }}>
        <Text>{proyecto.fechaInicio}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center',padding: 10, width:100 }}>
        <Text>{proyecto.fechaFin}</Text>
      </View>  
      <View style={{flexDirection: 'row', alignItems: 'center',padding: 10, width:100 }}>
        <Text>{proyecto.estado}</Text>
      </View>  
      <View style={{flexDirection: 'row', alignItems: 'center',padding: 10, width:100 }}>
        <Text>{proyecto.liderId[0].nombre}</Text>
      </View>  
      <View style={{flexDirection: 'row', alignItems: 'center',padding: 10, width:100 }}>
        <Text>{proyecto.fase}</Text>
      </View>  
        </View>
    
  )

}

export default ProyectoItem