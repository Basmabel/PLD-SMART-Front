import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../config/colors.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts } from "@expo-google-fonts/dev";
import AppLoading from "expo-app-loading";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/dev";
import Spinner from "react-native-loading-spinner-overlay";
import formatageDate from "../utils/date_formatage";
import { io } from "socket.io-client";
import { useFocusEffect } from "@react-navigation/native";

var light = "dark";
var colorBack = COLORS.greyBlue;
var colorText = COLORS.lightBlue;

if (light === "light") {
  colorBack = COLORS.white;
  colorText = COLORS.greyBlue;
}

export default function ParticipationDemandScreen({ route, navigation }) {
  const [userInfo, setUserInfo] = React.useState(null);
  const [isLoading, setLoading] = React.useState(true);
  const [retreive, setRetreive] = React.useState(false);
  const [userId, setUserId] = React.useState("");
  const [userToken, setUserToken] = React.useState("");
  const [demandInfo, setDemandInfo] = React.useState(null);
  const out = route.params.out;
  const notif_id = route.params.notif_id;
  /*  const out =0
  const notif_id =2*/
  const socketRef = useRef();

  var [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
  });

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const refuseDemand = async () => {
    Alert.alert(
      "Do you really want to refuse",
      ``,
      [
        {
          text: "Yes",
          onPress: () => {
            refuseFetch();
          },
        },
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const refuseFetch = async () => {
    fetch("https://eve-back.herokuapp.com/refuseDemand", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: demandInfo.demand_id, notif_id: notif_id }),
    }).catch((error) => console.error(error));
    const message = "hello";
    const type = 3;
    const event_id = demandInfo.event_id;
    const user_id = demandInfo.user_id;
    const review_id = null;
    const user_targeted_id = null;
    const participation_demand_id = null;
    socketRef.current.emit("message", {
      message,
      type,
      event_id,
      user_id,
      review_id,
      user_targeted_id,
      participation_demand_id,
    });
    console.log(event_id);
    navigation.navigate("Event", { event_id: event_id });
    alert("A notification has been sent");
  };

  const acceptFetch = async () => {
    fetch("https://eve-back.herokuapp.com/acceptDemand", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        demand_id: demandInfo.demand_id,
        user_id: demandInfo.user_id,
        event_id: demandInfo.event_id,
        notif_id: notif_id,
      }),
    }).catch((error) => console.error(error));

    const message = "hello";
    const type = 2;
    const event_id = demandInfo.event_id;
    const user_id = demandInfo.user_id;
    const review_id = null;
    const user_targeted_id = null;
    const participation_demand_id = null;
    socketRef.current.emit("message", {
      message,
      type,
      event_id,
      user_id,
      review_id,
      user_targeted_id,
      participation_demand_id,
    });
    navigation.navigate("Event", { event_id: demandInfo.event_id });
    alert("A notification has been sent");
  };

  const signoutFetch = async () => {
    fetch("https://eve-back.herokuapp.com/signoutDemand", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        demand_id: demandInfo.demand_id,
        participation_id: demandInfo.particip_id,
      }),
    }).catch((error) => console.error(error));
  };

  const checkText = () => {
    if (out === 0) {
      return "participate";
    } else {
      return "signout";
    }
  };

  const acceptDemand = async () => {
    Alert.alert(
      "Do you really want to accept",
      ``,
      [
        {
          text: "Yes",
          onPress: () => {
            out === 0 ? acceptFetch() : signoutFetch();
          },
        },
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  useFocusEffect(
    React.useCallback(() => {
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

    retreiveData();

    if (retreive) {
      Promise.all([
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
        fetch("https://eve-back.herokuapp.com/getInfoDemanderNotif", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            id: notif_id,
          }),
        }),
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
              setUserInfo(item);
            } else if (index == 1) {
              setDemandInfo(item[0]);
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
              <Text style={styles.title_header}>My events</Text>
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
              <ScrollView style={{ marginBottom:  Dimensions.get("window").height*0.23, flexGrow: 1 }}>
                <View style={styles.locationView}>
                  <Text style={styles.text_header}> Lyon </Text>
                  <MaterialCommunityIcons
                    name="map-marker"
                    color={colorText}
                    size={24}
                  />
                </View>
                <View style={styles.contentContainer}>
                  <View style={styles.info_event}>
                    <Image
                      style={styles.photo_event}
                      source={{ uri: demandInfo.event_photo }}
                    />
                    <Text style={styles.title_info_event}>
                      {demandInfo.event_name}
                    </Text>
                    <Text style={styles.text_info_event}>
                      {formatageDate(demandInfo.date)}
                    </Text>
                  </View>

                  <View style={styles.info_demander}>
                    <Pressable>
                      <Image
                        style={styles.demanderImage}
                        source={{
                          uri: demandInfo.photo
                            ? demandInfo.photo
                            : "https://cdn-icons-png.flaticon.com/128/1946/1946429.png",
                        }}
                      />
                    </Pressable>
                    <Text style={styles.title_demand}>
                      {demandInfo.surname} wants to {checkText()}
                    </Text>
                  </View>

                  <View style={styles.buttons}>
                    <TouchableOpacity
                      style={styles.accept}
                      onPress={acceptDemand}
                    >
                      <Text
                        style={[styles.textButton, { color: COLORS.greyBlue }]}
                      >
                        Accept
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.refuse,
                        { display: out === 1 ? "none" : "flex" },
                      ]}
                      onPress={refuseDemand}
                    >
                      <Text
                        style={[styles.textButton, { color: COLORS.lightBlue }]}
                      >
                        Refuse
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

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
  info_event: {
    marginBottom: 10,
    marginTop: 10,
  },
  photo_event: {
    width: "100%",
    height: 0.6 * Dimensions.get("window").width,
    marginBottom: 10,
    borderRadius: 10,
  },
  title_info_event: {
    color: COLORS.lightBlue,
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 23,
  },
  text_info_event: {
    color: COLORS.lightBlue,
    fontFamily: "Montserrat_400Regular",
    fontSize: 19,
    marginBottom: 5,
  },
  info_demander: {
    flexDirection: "row",
    alignItems: "center",
  },
  title_demand: {
    fontFamily: "Montserrat_400Regular",
    color: COLORS.lightBlue,
    fontSize: 19,
    textTransform: "capitalize",
    paddingLeft: 20,
  },
  text_demand: {
    color: COLORS.lightBlue,
    fontFamily: "Montserrat_400Regular",
    fontSize: 15,
    marginBottom: 5,
  },
  demanderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  buttons: {
    marginTop: 20,
  },
  accept: {
    width: "100%",
    backgroundColor: COLORS.lightBlue,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  refuse: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: COLORS.lightBlue,
    borderWidth: 1,
    marginTop: 20,
  },
  textButton: {
    fontSize: 18,
    fontFamily: "Montserrat_600SemiBold",
  },
});
