import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import { useMutation, gql } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SIGN_IN_MUTATION = gql`
mutation SignIn($email:String!,$password:String!) {
  signIn(input: {email:$email,
    password:$password,}) {
    token
    user {
      id
      nombre
    }
    
  }
}
`;

const SignInScreen = () =>{
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [signIn, { data, error, loading }] = useMutation(SIGN_IN_MUTATION);
  const navegation= useNavigation();

  useEffect(() => {
    if (error) {
      alert("Credeciales equivocadas, por favor intente de nuevo")
    }
  }, [error])

  if (data) {
    AsyncStorage.setItem('token', data.signIn.token)
      .then(() => {
        navegation.navigate("Home")
      })
  }

  const onSubmit = () => {
    signIn({ variables: { email, password }})
  }
  return (
    <View style={{padding:20}}>
      {/*<Text>Log In</Text>*/}
      <TextInput 
        placeholder="Email aquí"
        value={email}
        onChangeText={setEmail}
        style={{
          color:"black",
          backgroundColor:"white",
          fontSize:18,
          marginVertical:25,
          width:"30%",
          marginHorizontal:"35%"
        }          
        }
      >
      </TextInput>

      <TextInput 
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          color:"black",
          backgroundColor:"white",
          fontSize:18,
          marginVertical:25,
          width:"30%",
          marginHorizontal:"35%"
        }          
        }
      >
      </TextInput>
      <Pressable
        onPress={onSubmit} 
        style={{
          backgroundColor:"blue",
          height:50,
          borderRadius:5,
          width:"30%",
          alignItems:"center",
          justifyContent:"center",
          marginHorizontal:"35%"
        }}
      >
        <Text 
          style={{
            color:"white",
            fontSize:18,
            fontWeight:"bold",
            fontFamily:"sans-serif"
          }}
        >
          Iniciar Sesión
        </Text>
      </Pressable>

      <Pressable
        onPress={() => navegation.navigate("SignUp")}
        style={{
          height:50,
          width:"30%",
          alignItems:"center",
          justifyContent:"center",
          marginHorizontal:"35%"
        }}
      >
        {loading && <ActivityIndicator />}
        <Text 
          style={{
            color:"blue",
            fontSize:18,
            fontWeight:"bold",
            fontFamily:"sans-serif"
          }}
        >
          Registrese Aquí
        </Text>
      </Pressable>    

    </View>
  );
}

export default SignInScreen;
