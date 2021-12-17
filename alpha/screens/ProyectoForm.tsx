import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Pressable, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMutation, gql } from '@apollo/client';
import { Text, View } from '../components/Themed';

const CREATE_PROJECT = gql`
mutation Mutation($input: proyectoInput) {
  createProyecto(input: $input) {
    id
  }
}
`

const ProjectCreationScreen = () => {
	const title = "Crear Nuevo Proyecto";
	const [name, setName] = useState("");
	const [general, setGeneral] = useState("");
	const [specific, setSpecific] = useState("");
	const [scope, setScope] = useState(0.0);
  const [createProyecto, {data, error, loading}] = useMutation(CREATE_PROJECT);
  const nav = useNavigation();

  const onSubmit = () => {
		createProyecto({ variables: {
				"input": {
					"nombre": name,
					"objetivosEspecificos": specific,
					"objetivosGenerales": general,
					"prespuesto": parseFloat(scope)
				}
			}
		});
		nav.navigate("Proyecto");
  }

	const css = StyleSheet.create({
		container: {
			padding: 12,
			width:"80%",
			marginHorizontal:"10%"
		},
		title: {
      margin: "auto",
      fontSize: "2em",
      fontWeight: "bold"
		},
		field: {
			margin: "1em"
		},
		pressable: {
			backgroundColor:'blue',
			height:50,
			borderRadius:5,
			alignItems:'center',
			justifyContent:"center",
			marginTop:30,
			width:'20%',
			marginHorizontal:"5%"
		},
		pressableText: {
				color:"white",
				fontSize:18,
				fontWeight:"bold"
		}
	});

	return (
		<View style={css.container}>
			<Text style={css.title}>{title}</Text>
			<TextInput style={css.field} placeholder="Nombre" value={name} onChangeText={setName} />
			<TextInput style={css.field} placeholder="Objetivos Generales" value={general} onChangeText={setGeneral} />
			<TextInput style={css.field} placeholder="Objetivos Especificos" value={specific} onChangeText={setSpecific} />
			<TextInput style={css.field} placeholder="Presupuesto" value={scope} onChangeText={setScope} />
			<Pressable style={StyleSheet.compose(css.field, css.pressable)} onPress={onSubmit}>
				<Text style={css.pressableText}>Crear</Text>
			</Pressable>
		</View>
	);
}

export default ProjectCreationScreen