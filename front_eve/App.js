import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LandingScreen from './app/screens/LandingScreen.js';
import SignInScreen from './app/screens/SignInScreen.js';
import SignUpScreen from './app/screens/SignUpScreen.js';

export default function App() {
  return (
      <SignInScreen/>

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
