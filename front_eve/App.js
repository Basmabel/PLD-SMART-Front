import { StatusBar } from 'expo-status-bar';
import { registerRootComponent } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import LandingScreen from './app/screens/LandingScreen.js';
import SignInScreen from './app/screens/SignInScreen.js';
import SignUpScreen from './app/screens/SignUpScreen.js';
import HomePageScreen from './app/screens/HomePageScreen.js';
import EventScreen from './app/screens/EventScreen.js';
import NavigatorBar from './app/screens/NavigatorBar.js';
import { NavigationContainer } from '@react-navigation/native';
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "./app/screens/SearchScreen.js";
import { TextField } from "native-base";
import ValidationCode from './app/screens/ValidationCode'
import FilterScreen from "./app/screens/FilterScreen.js";

const Stack = createStackNavigator();

export default function App() {
  return (
    //<SignUpScreen/>
    //<NavigatorBar/>
    //<LandingScreen/>
    <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="NavigatorBar" component={NavigatorBar} />
        <Stack.Screen name="EventScreen" component={EventScreen} />
      
      </Stack.Navigator>
    </NavigationContainer>
   // <ValidationCode/>
   // <SearchScreen />
  );
}

/*const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <SignInScreen name="Connexion" component={connexionScreen}/>
        <SignUpScreen name="Inscription" component={inscriptionScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
