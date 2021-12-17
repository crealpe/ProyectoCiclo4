/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import HomeScreen from '../screens/HomeScreen';
import UsuariosScreen from '../screens/UsuariosScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SplashScreen from '../screens/SplashScreen';
import ProyectoForm from '../screens/ProyectoForm';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import ProyectosScreen from '../screens/ProyectosScreen';
import InscripcionesScreen from '../screens/InscripcionesScreen';
import AvancesScreen from '../screens/AvancesScreen';
import ComentariosScreen from '../screens/ComentariosScreen';
import NuevoAvanceScreen from '../screens/NuevoAvanceScreen';
import EditarPerfilScreen from '../screens/EditarPerfilScreen';
import ProyectoForm from '../screens/ProyectoForm';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Root" component={SplashScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Usuarios" component={UsuariosScreen} />
      <Stack.Screen name="Proyectos" component={ProyectosScreen} />
      <Stack.Screen name="Inscripciones" component={InscripcionesScreen} />
      <Stack.Screen name="Avances" component={AvancesScreen} />
      <Stack.Screen name="Comentarios" component={ComentariosScreen} />
      <Stack.Screen name="NuevoAvance" component={NuevoAvanceScreen} />
      <Stack.Screen name="EditarPerfil" component={EditarPerfilScreen} />
      <Stack.Screen name="NuevoProyecto" component={ProyectoForm} />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
