import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Pressable } from 'react-native'
import { AntDesign, MaterialCommunityIcons,FontAwesome5 } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { useMutation, gql } from '@apollo/client';
import alert from '../Alert';
import styles from './styles';

const UPDATE_USER = gql`
mutation UpdateUserEstado($updateUserId: ID!, $estado: String) {
  updateUserEstado(id: $updateUserId, estado: $estado) {
    
      id
      email
      password
      identificacion
      nombre
      rol
      estado
   
  }
}
`;


interface UsuarioItemProps {
  usuario: {
    id: string,
    email: string,
    identificacion: string,
    nombre: string,
    rol: string,
    estado: string
  }
}
const UsuarioItem = ({ usuario }: UsuarioItemProps) => {
  const navigation = useNavigation();
  const [estado, setEstado] = useState('');
  const [updateUserEstado] = useMutation(UPDATE_USER);
  
  const onPress = () => {
    updateUserEstado({
      variables: {
        updateUserId: usuario.id,
        estado: 'autorizado'
      }
    })
  };

  const onPressN = () => {
    updateUserEstado({
    variables: {
      updateUserId: usuario.id,
      estado: "no autorizado"
    }
  })
};
  
  useEffect(() => {
    setEstado(estado);
    
  }, [estado])
  
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
      <Pressable  onPress={onPress} style={styles.root}>
      <View style={styles.iconContainer}>
        <FontAwesome5 name="user-check" size={24} color="white" />
      </View>
      </Pressable>
      <Pressable onPress={onPressN} style={styles.root}>
      <View style={styles.iconContainer}>
      <FontAwesome5 name="user-alt-slash" size={24} color="white" />
      </View>
      </Pressable>
      <View style={{ flexDirection: 'row', alignItems: 'center', width:150 }}>
        <Text >{usuario.email}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 10,width:120 }}>
        <Text >{usuario.identificacion}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center',padding: 10,width:150 }}>
        <Text >{usuario.nombre}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center',padding: 10, width:120 }}>
        <Text >{usuario.rol}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center',padding: 10, width:120 }}>
        <Text>{usuario.estado}</Text>
      </View>
    
        </View>
    
  )

}

export default UsuarioItem