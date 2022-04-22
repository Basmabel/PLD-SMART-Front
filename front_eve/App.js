import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { registerRootComponent } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import LandingScreen from './app/screens/LandingScreen.js';
import SignInScreen from './app/screens/SignInScreen.js';
import SignUpScreen from './app/screens/SignUpScreen.js';
import HomePageScreen from './app/screens/HomePageScreen.js';
import NavigatorBar from './app/screens/NavigatorBar.js';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    //<SignUpScreen/>
    //<NavigatorBar/>
    //<LandingScreen/>

    //<SignInScreen/>

    <NavigationContainer>
      <Stack.Navigator>
       
        <Stack.Screen name="Connection" component={SignInScreen} />
        <Stack.Screen name="Inscription" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

