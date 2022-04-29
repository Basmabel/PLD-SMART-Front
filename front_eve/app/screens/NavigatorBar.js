
import { COLORS } from "../config/colors.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {
  createBottomTabNavigator
} from "@react-navigation/bottom-tabs";
import HomePageScreen from "../screens/HomePageScreen";
import SearchScreen from "../screens/SearchScreen";
import MyEventsScreen from "../screens/MyEventsScreen";
import MyAccountScreen from "./MyAccountScreen.js";
import NotificationsScreen from "./NotificationsScreen.js"
import { Ionicons } from '@expo/vector-icons'; 
import EventPerCategoryScreen from "./EventPerCategoryScreen.js";
import ProfileScreen from "./ProfileScreen.js";


const Tab = createBottomTabNavigator();

export default function NavigatorBar() {
  

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.greyBlue,
        tabBarInactiveTintColor: COLORS.mauve,
        tabBarStyle: { backgroundColor: COLORS.beige },
        tabBarLabelStyle: {
          paddingBottom: 5,
          fontSize: 12,
          fontWeight: "bold",
        },
        //unmountOnBlur: true,
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
      }}
      tabBarOptions={{
        labelStyle: { paddingBottom: 5, fontSize: 12, fontWeight: "bold" },
        style: { padding: 10, height: 70 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomePageScreen}
        options={{
          headerShown: false,
          component: { HomePageScreen },
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home"
              size={25}
              color={color}
              style={{ paddingTop: 5 }}
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
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="map-outline"
              size={25}
              color={color}
              style={{ paddingTop: 5 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="My events"
        component={MyEventsScreen}
        options={{
          headerShown: false,
          component: { MyEventsScreen },
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="event"
              size={25}
              color={color}
              style={{ paddingTop: 5 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          headerShown: false,
          component: { NotificationsScreen },
          tabBarIcon: ({color}) => (
            <Ionicons
              name="notifications"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={MyAccountScreen}
        options={{
          headerShown: false,
          component: { MyAccountScreen },
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="account"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="EventPerCategoryScreen"
        component={EventPerCategoryScreen}
        options={{
          headerShown: false,
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Profile user"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarButton: () => null,
        }}
      />

    </Tab.Navigator>
  );
}
