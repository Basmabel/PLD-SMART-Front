import { StatusBar } from 'expo-status-bar';
import { registerRootComponent } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import LandingScreen from './app/screens/LandingScreen.js';
import SignInScreen from './app/screens/SignInScreen.js';
import SignUpScreen from './app/screens/SignUpScreen.js';
import ProfileScreen from './app/screens/ProfileScreen.js';
import HomePageScreen from './app/screens/HomePageScreen.js';
import EventPerCategoryScreen from './app/screens/EventPerCategoryScreen.js';
import NavigatorBar from './app/screens/NavigatorBar.js';
import { NavigationContainer } from '@react-navigation/native';
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "./app/screens/SearchScreen.js";
import { TextField } from "native-base";
import ValidationCode from './app/screens/ValidationCode'
import FilterScreen from "./app/screens/FilterScreen.js";
import CategorieCard from './app/components/CategorieCard.js';
import CarouselCard from './app/components/CarouselCard';

import ParticipationDemandScreen from './app/screens/ParticipationDemandScreen.js';
import NotificationsScreen from './app/screens/NotificationsScreen.js'
import MyAccountScreen from './app/screens/MyAccountScreen.js';
import MyEventsScreen from './app/screens/MyEventsScreen'
import NotifBuble from './app/components/NotifBuble.js';

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
        <Stack.Screen name="CategorieCard" component={CategorieCard} />
        <Stack.Screen name="EventPerCategoryScreen" component={EventPerCategoryScreen}/>
        <Stack.Screen name="Demand" component={ParticipationDemandScreen}/>
        <Stack.Screen name="Notifications" component={NotificationsScreen}/>
        <Stack.Screen name="Profile" component={MyAccountScreen}/>
        <Stack.Screen name="CarousselCard" component={CarouselCard}/>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen}/>
        <Stack.Screen name="MyEventsScreen" component={MyEventsScreen}/>
        <Stack.Screen name="Buble" component={NotifBuble}/>
        <Stack.Screen name="MyAccount" component={MyAccountScreen}/>
        <Stack.Screen
          name="Previous"
          component={NavigatorBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="FilterScreen" component={FilterScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
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
