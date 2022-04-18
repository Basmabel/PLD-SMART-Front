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
import SearchScreen from "./SearchScreen.js";
import MyAccountScreen from "./MyAccountScreen.js";

const Tab = createBottomTabNavigator();

export default function NavigatorBar() {
  return (
    <Tab.Navigator
      screenOptions={{ tabBarStyle: { backgroundColor: COLORS.greyBlue } }}
      tabBarOptions={{
        activeTintColor: COLORS.white,
        inactiveTintColor: "grey",
        labelStyle: { paddingBottom: 10, fontSize: 10 },
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
              color={COLORS.white}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={SearchScreen}
        options={{
          headerShown: false,
          component: { HomePageScreen },
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="map-marker"
              color={COLORS.white}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={MyAccountScreen}
        options={{
          headerShown: false,
          component: { HomePageScreen },
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="account"
              color={COLORS.white}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
