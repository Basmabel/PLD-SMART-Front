import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../config/colors.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MyCarousel from "../components/MyCarousel";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useFonts } from "@expo-google-fonts/dev";
import AppLoading from "expo-app-loading";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/dev";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import { io } from "socket.io-client";
import NotifBuble from "../components/NotifBuble.js";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";

var light = "dark";
var colorBack = COLORS.greyBlue;
var colorText = COLORS.lightBlue;

if (light === "light") {
  colorBack = COLORS.white;
  colorText = COLORS.greyBlue;
}

export default function HomePageScreen({ route }) {
  const tabBarHeight = useBottomTabBarHeight();
  const navigation = useNavigation();

  var state = "";
  if (route.params != undefined) {
    state = route.params.state;
  }

  const [popularEvents, setPopularEvents] = React.useState([]);
  const [userInfo, setUserInfo] = React.useState(null);
  const [isLoading, setLoading] = React.useState(true);
  const [categories, setCategories] = React.useState(null);
  const [eventPerCat, setEventPerCat] = React.useState([]);
  const [retreive, setRetreive] = React.useState(false);
  const [userId, setUserId] = React.useState("");
  const [userToken, setUserToken] = React.useState("");
  const [notifVisible, setNotifVisible] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const socketRef = useRef();
  const isFocused = useIsFocused();
  const [position, setPosition] = React.useState("");
  const [isPosition, setIsPosition] = React.useState("false");
  //const [socketRef.current, setSocket]= React.useState(null);

  //   const LOCATION_TASK_NAME = "LOCATION_TASK_NAME"
  // let foregroundSubscription = null

  // // Define the background task for location tracking
  // TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  //   if (error) {
  //     console.error(error)
  //     return
  //   }
  //   if (data) {
  //     // Extract location coordinates from data
  //     const { locations } = data
  //     const location = locations[0]
  //     if (location) {
  //       console.log("Location in background", location.coords)
  //     }
  //   }
  // })

  var [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
  });

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log(notifVisible);
      console.log("connected");
      socketRef.current = io("https://eve-back.herokuapp.com");

      return () => {
        socketRef.current?.disconnect();
      };
    }, [])
  );

  useEffect(() => {
    if (userId != "") {
      socketRef.current?.emit("userId", userId);
    }

    console.log("in use effect" + userId);
  }, [userId]);

  useEffect(() => {
    if (userId != "") {
      socketRef.current?.emit("userId", userId);
    }

    console.log("in use effect" + userId);
  }, [socketRef.current]);

  useEffect(() => {
    socketRef.current?.on("message", (message) => {
      console.log("You received a notification");
      setNotifVisible(true);
    });
  }, [socketRef.current]);

  //Request permissions right after starting the app
  // useEffect(() => {
  //   const requestPermissions = async () => {
  //     const foreground = await Location.requestForegroundPermissionsAsync()
  //     if (foreground.granted){
  //         setPosition(null)
  //     }
  //   }
  //   requestPermissions()
  // }, [])

  // const getLocation = async () => {
  //   // Check if foreground permission is granted
  //   let { status } = await Location.requestForegroundPermissionsAsync();

  //   if (status !== 'granted') {
  //     Alert.alert(
  //       'Permission not granted',
  //       'Allow the app to use location service.',
  //       [{ text: 'OK' }],
  //       { cancelable: false }
  //     );
  //   }
  //   console.log("la")

  //   Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Balanced , maximumAge: 10000})
  //   .then((res) => {
  //     var {coords} = res
  //     const {latitude,longitude} = coords
  //     console.log(latitude,longitude)
  //     Location.reverseGeocodeAsync({latitude, longitude}).then((res)=>{
  //       res.map((item)=>{
  //          var address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
  //          setPosition(address)
  //       })
  //     })
  //   })
  //   .catch(e => console.log(e))

  // }

  //   let { coords } = await Location.getCurrentPositionAsync();

  //   if (coords) {
  //     console.log("ici")
  //     const { latitude, longitude } = coords;
  //     let response = await Location.reverseGeocodeAsync({
  //       latitude,
  //       longitude
  //     });

  //     for (let item of response) {
  //       let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;

  //       setPosition(address);
  //     }
  //   }

  // useEffect (()=>{
  //   getLocation()
  // },[])

  useEffect(() => {
    const retreiveData = async () => {
      try {
        const valueString = await AsyncStorage.getItem("key");
        const value = JSON.parse(valueString);

        const tokenString = await AsyncStorage.getItem("token");
        const token = JSON.parse(tokenString);
        console.log(value);
        setUserId(value);
        setUserToken(token);
        setRetreive(true);
      } catch (error) {
        console.log(error);
      }
    };
    //'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTY1MDA1MDU1NiwiZXhwIjoxNjUwMDYxMzU2fQ.WGMvctVy10fkxjI74xpTGil7DPH52pSHmmcNWuqj-dU'
    retreiveData();

    /*socketRef.current?.emit('userId',(userId))
    console.log("co")
    console.log(socketRef.current?.id)*/
    if (route.params != undefined) {
      state = route.params.state;
    }

    if (state === "event update" && isFocused) {
      setLoading(true);
    }

    if (retreive) {
      console.log(position);
      Promise.all([
        fetch("https://eve-back.herokuapp.com/getPopular"),
        fetch("https://eve-back.herokuapp.com/getUserInfo", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: "bearer " + userToken,
          },
          body: JSON.stringify({
            id: userId,
          }),
        }),
        fetch("https://eve-back.herokuapp.com/getCategories"),
        fetch("https://eve-back.herokuapp.com/getEventsByCategory"),
      ])
        .then(function (responses) {
          // Get a JSON object from each of the responses
          return Promise.all(
            responses.map(function (response) {
              return response.json();
            })
          );
        })
        .then(function (data) {
          // Log the data to the console
          // You would do something with both sets of data here
          data.map((item, index) => {
            console.log(index, item);
            if (index == 0) {
              setPopularEvents(item);
            } else if (index == 1) {
              setUserInfo(item);
            } else if (index == 2) {
              setCategories(item);
            } else if (index == 3) {
              var cat_id = item[0].category_id;
              var nexEv = [];
              var iter = 0;
              var stockEvent = [];
              item.map((eve, i) => {
                if (cat_id === eve.category_id) {
                  nexEv = [...nexEv];
                  nexEv[iter] = eve;
                  iter++;
                  // console.log(nexEv)
                }
                if (iter != 0 && cat_id != eve.category_id) {
                  stockEvent = [...stockEvent, nexEv];
                  iter = 0;
                  cat_id = eve.category_id;
                  nexEv = [];
                  //console.log(stockEvent)
                } else if (
                  cat_id === eve.category_id &&
                  i + 1 < item.length &&
                  cat_id != item[i + 1].category_id
                ) {
                  stockEvent = [...stockEvent, nexEv];
                  iter = 0;
                  cat_id = item[i + 1].category_id;
                  nexEv = [];
                } else if (cat_id === eve.category_id && i + 1 == item.length) {
                  stockEvent = [...stockEvent, nexEv];
                }
              });
              setEventPerCat(stockEvent);
              //console.log(stockEvent)
            }
          });
        })
        .catch(function (error) {
          // if there's an error, log it
          console.log(error);
        })
        .finally(() => setLoading(false));
    }
  }, [retreive, isFocused]);

  const DisplayEvents = () => {
    const listEvents = eventPerCat.map((item) => (
      <View style={styles.events} key={item[0].category_id}>
        <View style={styles.categorieEvents}>
          <Text style={[styles.title_body]}>{item[0].description}</Text>
        </View>
        <MyCarousel
          data={item}
          type={{ event: "oui" }}
          navigation={navigation}
        />
      </View>
    ));
    if (!fontsLoaded) {
      return <AppLoading />;
    } else {
      return <View>{listEvents}</View>;
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={StyleSheet.container}>
        {isLoading ? (
          <Spinner
            //visibility of Overlay Loading Spinner
            visible={isLoading}
            //Text with the Spinner
            textContent={"Loading..."}
            //Text style of the Spinner Text
            textStyle={styles.spinnerTextStyle}
          />
        ) : (
          <View>
            <View style={styles.header}>
              <Text style={styles.title_header}>Home</Text>
              <View style={styles.infoView}>
                <Image
                  style={styles.profilImage}
                  source={{
                    uri: userInfo[0].photo
                      ? userInfo[0].photo
                      : "https://cdn-icons-png.flaticon.com/128/1946/1946429.png",
                  }}
                />
              </View>
            </View>

            <View style={styles.body}>
              <ScrollView style={{marginBottom: Dimensions.get("window").height*0.23 }}>
                <View
                  style={[
                    styles.notif_buble,
                    { display: notifVisible ? "flex" : "none" },
                  ]}
                >
                  <TouchableOpacity
                    style={styles.container_icon}
                    onPress={() => {
                      navigation.navigate("Notifications");
                      setNotifVisible(false);
                    }}
                  >
                    <Ionicons
                      name="notifications"
                      size={30}
                      color={COLORS.white}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.locationView}>
                  <Text style={styles.text_header}> Lyon </Text>
                  <MaterialCommunityIcons
                    name="map-marker"
                    color={colorText}
                    size={24}
                  />
                </View>
                <View style={styles.contentContainer}>
                  <View style={styles.events}>
                    <View style={styles.categorieEvents}>
                      <Text style={[styles.title_body]}>Categories</Text>
                    </View>
                    <MyCarousel
                      data={categories}
                      type={{ event: "non" }}
                      navigation={navigation}
                    />
                  </View>
                  <View style={styles.events}>
                    <View style={styles.categorieEvents}>
                      <Text style={[styles.title_body]}>Popular</Text>
                    </View>
                    <MyCarousel
                      data={popularEvents}
                      type={{ event: "oui" }}
                      navigation={navigation}
                    />
                  </View>

                  <DisplayEvents />
                </View>
              </ScrollView>
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

/*

<View style={styles.events}>
                            <View style={styles.categorieEvents}>
                                <Text style={styles.title_header}>Popular</Text>
                                <MaterialCommunityIcons name="fire" color={COLORS.greyBlue} size={26}/>
                            </View>  
                            <MyCarousel data={popularEvents} type={{"event":"oui"}}/>                  
                        </View>
*/
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.beige,
    //shadowColor: "#000",
    //shadowOpacity: 0.9,
    //shadowRadius: 7,
    //borderRadius: 10,
    // flex:1
  },
  title_header: {
    color: COLORS.greyBlue,
    fontSize: 25,
    fontFamily: "Montserrat_600SemiBold",
  },
  infoView: {
    flexDirection: "column",
    alignItems: "center",
  },
  profilImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  locationView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 10,
  },
  text_header: {
    fontSize: 20,
    fontFamily: "Montserrat_400Regular",
    color: colorText,
  },
  body: {
    backgroundColor: colorBack,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  contentContainer: {
    flexDirection: "column",
    paddingTop: 5,
    height: "100%",
  },
  title_body: {
    color: colorText,
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 23,
  },
  events: {
    flexDirection: "column",
    marginBottom: 20,
  },
  categorieEvents: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  notif_buble: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: -40,
    zIndex: 100,
  },
  container_icon: {
    backgroundColor: COLORS.red,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: COLORS.black,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
