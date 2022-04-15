import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LandingScreen from './app/screens/LandingScreen.js';
import SignInScreen from './app/screens/SignInScreen.js';
import SignUpScreen from './app/screens/SignUpScreen.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  return (
    <SignUpScreen/>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
