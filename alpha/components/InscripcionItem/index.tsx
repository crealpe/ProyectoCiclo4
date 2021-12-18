import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Pressable } from 'react-native'
import { AntDesign, MaterialCommunityIcons,Fontisto,FontAwesome5 } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { useMutation, gql } from '@apollo/client';
import alert from '../Alert';
import styles from '../styles/styles';

const UPDATE_INSCRIPCION = gql`
mutation UpdateInscripcion($updateInscripcionId: ID!, $estado: String, $fechaIngreso: String, $fechaEgreso: String) {
    updateInscripcion(id: $updateInscripcionId, estado: $estado, fechaIngreso: $fechaIngreso, fechaEgreso: $fechaEgreso) {
      id
      proyectoId {
        nombre
      }
      estudianteId {
        nombre
      }
      estado
      fechaIngreso
      fechaEgreso
    }
  
    
  }`;

interface InscripcionItemProps {
  inscripcion: {
    id: string,
    estudianteId: string[],
    estado:string,
    fechaIngreso:string,
    fechaEgreso:string,
  }
}
const InscripcionItem = ({ inscripcion }: InscripcionItemProps) => {
  const navegation = useNavigation();
  const [estado, setEstado] = useState('');
  const [fechaIngreso, setFechaIngreso] = useState('');
  
  const [updateInscripcion] = useMutation(UPDATE_INSCRIPCION);
  
  const onPress = () => {
      
   updateInscripcion({
      
      variables: {
        updateInscripcionId: inscripcion.id,
        estado: estado,
        fechaIngreso:fechaIngreso
               
      }
    })
  };
  
  useEffect(() => {
    setEstado('aceptada');
    setFechaIngreso(new Date(Date.now()).toISOString());
  }, [])
  
  

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
      <Pressable onPress={onPress} style={styles.root}>
      <View style={styles.iconContainer}>
      <Fontisto name="checkbox-active" size={24} color="white" />
      </View>
      </Pressable>
      <View style={{ flexDirection: 'row', alignItems: 'center', width:120 }}>
        <Text >{inscripcion.estudianteId[0].nombre}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 10,width:150 }}>
        <Text >{inscripcion.estado}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center',padding: 10,width:150 }}>
        <Text >{inscripcion.fechaIngreso}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center',padding: 10, width:100 }}>
        <Text >{inscripcion.fechaEgreso}</Text>
      </View>
        </View>
    
  )

}

export default InscripcionItem