import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  TouchableNativeFeedback,
  SafeAreaView,
  Button,
  Alert,
  Platform,
  TextInput,
  Pressable,
} from "react-native";
import { COLORS } from "../config/colors.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import {
  createBottomTabNavigator,
  useBottomTabBarHeight,
} from "@react-navigation/bottom-tabs";
import HomePageScreen from "../screens/HomePageScreen";
import SearchScreen from "../screens/SearchScreen";

const Tab = createBottomTabNavigator();

export default function NavigatorBar() {
  return (
    <Tab.Navigator
      screenOptions={{ tabBarStyle: { backgroundColor: COLORS.beige } }}
      tabBarOptions={{
        activeTintColor: COLORS.mauve,
        inactiveTintColor: COLORS.mauve,
        labelStyle: {paddingBottom:5,fontSize: 12, fontWeight:'bold' },
        style: { padding: 10, height: 70 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomePageScreen}
        options={{
          headerShown: false,
          component: { HomePageScreen },
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="home"
              color={COLORS.mauve}
              size={25}
              style={{paddingTop:5}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          component: { SearchScreen },
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="map-outline"
              color={COLORS.mauve}
              size={25}
              style={{paddingTop:5}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
