import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import * as Location from "expo-location";
import { Marker } from "react-native-maps";
import { mapDarkMode } from "../model/Map";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import GetLocation from "react-native-get-location";

import StarRating from "../components/StarRating";
import MyCarousel from "../components/MyCarousel";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import { COLORS } from "../config/colors";
import { useTheme } from "@react-navigation/native";
import Geocoder from "react-native-geocoding";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

Geocoder.init("AIzaSyCY2VFm6E1vB8lYpmhz2jGQawaCN5UY5D4");

/*const Images = [
  { image: require("../assets/images/mcdo.jpg") },
  { image: require("../assets/images/patinoire.jpg") },
  { image: require("../assets/images/tete_dor.jpg") },
];*/

/*export const markers = [
  {
    coordinate: {
      latitude: 45.7701707,
      longitude: 4.8635116,
    },
    name: "Mcdo Party",
    description: "Mcdonald's Date",
    image: Images[0].image,
    rating: 4,
    reviews: 4,
  },
  {
    coordinate: {
      latitude: 45.7618026,
      longitude: 4.8685605,
    },
    name: "groupe Patinoire",
    description: "Let's all go to the ice skating rink",
    image: Images[1].image,
    rating: 5,
    reviews: 10,
  },
  {
    coordinate: {
      latitude: 45.7758115,
      longitude: 4.8530063,
    },
    name: "Running",
    description: "Let's go running at la tête d'or",
    image: Images[2].image,
    rating: 4.5,
    reviews: 5,
  },
];*/

const SearchScreen = ({ navigation }) => {
  const theme = useTheme();
  const initialMapState = {
    markers,
    categories: [
      {
        name: "Party",
        icon: (
          <MaterialCommunityIcons
            style={styles.chipsIcon}
            name="party-popper"
            size={18}
          />
        ),
      },
      {
        name: "Sports",
        icon: <Ionicons name="basketball" style={styles.chipsIcon} size={18} />,
      },
    ],
    region: {
      latitude: 45.7603831,
      longitude: 4.849664,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };

  const [state, setState] = React.useState(initialMapState);
  const [popularEvents, setPopularEvents] = React.useState([]);
  const [userInfo, setUserInfo] = React.useState(null);
  const [isLoading, setLoading] = React.useState(true);
  const [categories, setCategories] = React.useState(null);
  const [eventPerCat, setEventPerCat] = React.useState([]);
  const [retreive, setRetreive] = React.useState(false);
  const [userId, setUserId] = React.useState("");
  const [userToken, setUserToken] = React.useState("");

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    const retreiveData = async () => {
      try {
        const valueString = await AsyncStorage.getItem("key");
        const value = JSON.parse(valueString);

        const tokenString = await AsyncStorage.getItem("token");
        const token = JSON.parse(tokenString);

        setUserId(value);
        setUserToken(token);
        setRetreive(true);
      } catch (error) {
        console.log(error);
      }
    };

    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= { popularEvents }.length) {
        index = { popularEvents }.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate } = { popularEvents }.results[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });

    retreiveData();
    if (retreive) {
      Promise.all([
        fetch("http://169.254.3.246:3000/getPopular"),
        fetch("http://169.254.3.246:3000/getUserInfo", {
          //fetch('https://eve-back.herokuapp.com/getPopular'),
          //fetch('https://eve-back.herokuapp.com/getUserInfo',{
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: "bearer " + userToken,
          },
          body: JSON.stringify({
            id: userId,
          }),
        }),
        fetch("http://169.254.3.246:3000/getCategories"),
        fetch("http://169.254.3.246:3000/getEventsByCategory"),
        // fetch('https://eve-back.herokuapp.com/getCategories'),
        // fetch('https://eve-back.herokuapp.com/getEventsByCategory')
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
  }, [retreive]);

  const interpolations = Object.keys({ popularEvents }).map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp",
    });

    Geocoder.from("Pyramid", {
      southwest: { lat: 45.7603831, lng: -115.25 },
      northeast: { lat: 4.849664, lng: -115.1 },
    })
      .then((json) => {
        var location = { popularEvents }.results[0].geometry.location;
        console.log(location);
      })
      .catch((error) => console.warn(error));

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  };

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        initialRegion={state.region}
        style={styles.container}
        showsUserLocation={true}
        customMapStyle={mapDarkMode}
        provider={PROVIDER_GOOGLE}
      >
        {Object.keys({ popularEvents }).map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <MapView.Marker
              key={index}
              coordinate={{ latitude: 45.7701707, longitude: 4.8635116 }}
              onPress={(e) => onMarkerPress(e)}
            >
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require("../assets/images/Map_pin.png")}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </MapView.Marker>
          );
        })}
      </MapView>
      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={() => navigation.navigate("FilterScreen")}
          style={styles.filter}
        >
          <Ionicons name="ios-filter" size={20} />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={console.log("heeeey")}
          style={styles.filterButton}
        >
          <Text>I'm a button</Text>
        </TouchableOpacity>
      </View>
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {Object.keys({ popularEvents }).map((marker, index) => (
          <View style={styles.card} key={index}>
            <Image
              source={marker.photo}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>
                {marker.name}
              </Text>
              <StarRating ratings={marker.rating} reviews={marker.reviews} />
              <Text numberOfLines={1} style={styles.cardDescription}>
                {marker.description}
              </Text>
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => {}}
                  style={[
                    styles.signIn,
                    {
                      borderColor: COLORS.greyBlue,
                      borderWidth: 1,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: COLORS.greyBlue,
                      },
                    ]}
                  >
                    Participate!
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};
export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filter: {
    position: "absolute",
    backgroundColor: COLORS.white,
    width: "13.5%",
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    borderRadius: 100,
    padding: 15,
  },
  chipsScrollView: {
    position: "absolute",
    top: Platform.OS === "ios" ? 90 : 80,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: COLORS.nightBlue,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: "center",
    marginTop: 5,
  },
  signIn: {
    width: "100%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: "bold",
  },
  filterButton: {
    position: "absolute",
    margin: Platform.OS === "ios" ? 40 : 20,
    flexDirection: "row",
    backgroundColor: COLORS.white,
    width: "10%",
    alignSelf: "flex-end",
    borderRadius: 100,
    padding: 10,
    elevation: 10,
    flex: 1,
  },
  buttonView: {
    position: "absolute",
    marginTop: Platform.OS === "ios" ? 40 : 20,
    //flexDirection: "row",
    width: "100%",
    alignContent: "flex-end",
    alignSelf: "flex-end",
    padding: 10,
    flex: 1,
  },
});
