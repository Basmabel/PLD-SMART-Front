import{ StyleSheet, Dimensions, Text, View, Image,TouchableNativeFeedback,SafeAreaView, Button, Alert, Platform, TextInput, Pressable } from 'react-native';
import {COLORS} from '../config/colors.js';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePageScreen from '../screens/HomePageScreen';
 
const Tab = createBottomTabNavigator();

export default function NavigatorBar() {
    return(
        <NavigationContainer>
            <Tab.Navigator tabBarOptions={{ activeTintColor: '#42f44b'}}>
                <Tab.Screen
                    name="Home"
                    component={HomePageScreen}
                    options={{
                        tabBarLabel: 'Home',
                        component: {HomePageScreen},
                        tabBarIcon: () => (
                            <MaterialCommunityIcons
                                name="home"
                                color={COLORS.black}
                                size={24}
                            />
                        ),
                    }}  />
            </Tab.Navigator>
        </NavigationContainer>
        
    );
}