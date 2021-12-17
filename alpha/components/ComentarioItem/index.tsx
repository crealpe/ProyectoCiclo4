import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Pressable, TextInput } from 'react-native'
import { AntDesign, MaterialIcons,Ionicons,FontAwesome5 } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { useMutation, gql } from '@apollo/client';
import alert from '../Alert';
import styles from '../styles/styles';


interface ComentarioItemProps {
  comentario: {
    observacionesLider:string,
  }
}
const ComentarioItem = ({ comentario }: ComentarioItemProps) => {
  const navegation = useNavigation();
    
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
      <View style={styles.iconContainer}>
      
      <MaterialIcons name="post-add" size={24} color="white" />
     
      </View>
      
      <View style={{ flexDirection: 'row', alignItems: 'center', width:150 }}>
        <Text >{comentario.observacionesLider}</Text>
      </View>
      
      
        </View>
    
  )

}

export default ComentarioItem