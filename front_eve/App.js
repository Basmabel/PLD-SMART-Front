import { StatusBar } from 'expo-status-bar';
import { registerRootComponent } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import LandingScreen from './app/screens/LandingScreen.js';
import SignInScreen from './app/screens/SignInScreen.js';
import SignUpScreen from './app/screens/SignUpScreen.js';
import HomePageScreen from './app/screens/HomePageScreen.js';
import NavigatorBar from './app/screens/NavigatorBar.js';

export default function App() {
  return (
    //<SignUpScreen/>
    <NavigatorBar/>
      //<LandingScreen/>

      //<SignInScreen/>
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

