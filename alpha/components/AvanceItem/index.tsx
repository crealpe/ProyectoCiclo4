import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Pressable, TextInput } from 'react-native'
import { AntDesign, MaterialIcons,Ionicons,FontAwesome5 } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { useMutation, gql } from '@apollo/client';
import alert from '../Alert';
import styles from '../styles/styles';

const UPDATE_AVANCE = gql`
mutation AddComentarioToAvance($avanceId: ID!, $comentarioLider: String!) {
  addComentarioToAvance(AvanceId: $avanceId, ComentarioLider: $comentarioLider) {
    id
    proyectoId {
      id
      nombre
    }
    fechaAvance
    descripcion
    observacionesLider
  }
}`;

interface AvanceItemProps {
  avance: {
    id: string,
    fechaAvance:string,
    descripcion:string,
    observacionesLider:string[],
  }
}
const AvanceItem = ({ avance }: AvanceItemProps) => {
  const navegation = useNavigation();
  const [observacionesLider, setObservacionesLider] = useState('');
    
  const [addComentarioToAvance] = useMutation(UPDATE_AVANCE);
  
  
  const callUpdateItem = () => {
    addComentarioToAvance({
      
        variables: {
          avanceId: avance.id,
          comentarioLider:observacionesLider
                 
        }
      })
  };
  
  async function comentarios() {
    navegation.navigate("Comentarios",{ id:avance.id})
    }
   
  useEffect(() => {
       setObservacionesLider(observacionesLider)  
}, [observacionesLider])

  
  return (
    
    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
      <View style={styles.iconContainer}>
      <Pressable onPress={comentarios} >  
      <MaterialIcons name="post-add" size={24} color="white" />
      </Pressable>
      </View>
      
      <View style={{ flexDirection: 'row', alignItems: 'center', width:150 }}>
        <Text >{avance.fechaAvance}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 10,width:200 }}>
        <Text >{avance.descripcion}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 10,width:300 }}>
      <TextInput
       
        value={observacionesLider}
        onChangeText={setObservacionesLider}
        style={{
          flex: 1,
          fontSize: 18,
          color: 'black',
          marginLeft: 12,
          borderWidth:1
        }}
        editable={true}
        multiline
        blurOnSubmit />
      </View>
      <View style={styles.iconContainer}>
      <Pressable
      onPress={callUpdateItem} 
      >  
      <Ionicons name="add" size={24} color="white" />
      </Pressable>
      </View>
      
    </View>
    
  )

}

export default AvanceItem