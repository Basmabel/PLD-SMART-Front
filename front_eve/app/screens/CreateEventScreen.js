import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import CheckBox from "expo-checkbox";
import { Dropdown } from "react-native-element-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../config/colors.js";
import { useFonts } from "@expo-google-fonts/dev";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Foundation from "react-native-vector-icons/Foundation";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import DatePicker from "react-native-datepicker";
import Feather from "react-native-vector-icons/Feather";
import Fontisto from "react-native-vector-icons/Fontisto";
import * as ImagePicker from "expo-image-picker";
import UploadImageEvent from "../config/uploadImageEvent.js";
import * as Animatable from "react-native-animatable";
import { Picker } from "@react-native-picker/picker";
import {io} from "socket.io-client"
import NotifBuble from "../components/NotifBuble.js";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons'; 
import * as Location from "expo-location"
import * as TaskManager from "expo-task-manager"


const tmp = [
  { label: "Sports", value: 1 },
  { label: "Cinema", value: 2 },
  { label: "Culture", value: 3 },
  { label: "Activities", value: 4 },
  { label: "Party", value: 5 },
  { label: "Events", value: 6 },
];

const getCurrentDate = () => {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  //Alert.alert(date + '-' + month + '-' + year);
  // You can turn it in to your desired format
  return date + "-" + month + "-" + year; //format: dd-mm-yyyy;
};

const CreateEventScreen = ({ navigation }) => {
  //TODO : put a link with the admin view event page
  //const goToEvent = () => navigation.navigate("Create");
  const [title, onChangeTitle] = React.useState("");
  //const [date, onChangeDate] = React.useState("");
  const [date, setDate] = useState(getCurrentDate());
  const [participants, onChangeParticipants] = React.useState("");
  const [categories, setCategories] = React.useState(tmp);
  const [address, onChangeAddress] = React.useState("");
  const [street, onChangeStreet] = React.useState("");
  const [streetNumber, onChangeStreetNumber] = React.useState("");
  const [zipCode, onChangeZipCode] = React.useState("");
  const [city, onChangeCity] = React.useState("");
  const [region, onChangeRegion]= React.useState("");
  const [activity, onChangeActivity] = React.useState("");
  const [description, onChangeDescription] = React.useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [place,onChangePlace] = useState("");
  const [img, setImgUri] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [imageName, setImageName] = React.useState(null);
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState({
    check_textInputChange: false,
    isValidTitle: true,
    isValidDate: true,
  });
  const [selectedActivity, setSelectedActivity] = useState("Select a Category");
  const [isSelected, setSelection] = useState(false);
  const [notifVisible, setNotifVisible] = React.useState(false)
  const [retreive, setRetreive] = React.useState(false);
  const [userId, setUserId] = React.useState("")
  const [userToken, setUserToken] = React.useState("")
  const isFocused = useIsFocused();
  const [message, setMessage] = React.useState("")
  const [position, setPosition] = React.useState(null)

   const socketRef = useRef();

   const LOCATION_TASK_NAME = "LOCATION_TASK_NAME"
   let foregroundSubscription = null
   
   // Define the background task for location tracking
   TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
     if (error) {
       console.error(error)
       return
     }
     if (data) {
       // Extract location coordinates from data
       const { locations } = data
       const location = locations[0]
       if (location) {
         console.log("Location in background", location.coords)
       }
     }
   })

  const valuesNotNul = () => {
   console.log(title)
    if (
      title != "" &&
      date != "" &&
      participants != "" &&
      streetNumber != "" &&
      street != "" &&
      zipCode != "" &&
      city != "" &&
      region != "" &&
      selectedActivity != "" &&
      img != "" &&
      place !=""
    ) {
      console.log("aaa")
      return true;
    } else {
      return false;
    }
  };

  const createFormData = (photo,nameImg, body = {}) => {
    const data = new FormData();
    console.log(photo)
    data.append('photo', {
      name: nameImg,
      type: 'image/jpeg',
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });
  
    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    console.log(data)
  
    return data;
  };
  
  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(JSON.stringify(_image));

    if (!_image.cancelled) {
      setImgUri(_image.uri);
      setImage(_image)
      var name = _image.uri.substring(_image.uri.lastIndexOf("/")+1,_image.uri.lastIndexOf("."))
      setImageName(name)
      await fetchImage(_image,name)
    }
  };

  const formatAdress = () =>{
    return streetNumber + " " + street + " " + zipCode + " " + city;
  }

  const fetchImage = async (imageF, name) =>{
    console.log(imageF)
    const config = {
      method: 'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'multipart/form-data',
      },
      body: createFormData(imageF,name,{userId : userId}),
     };

     fetch("http://192.168.52.1:3000/upload", {
      method: 'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'multipart/form-data',
      },
      body: createFormData(imageF,name,{userId : userId}),
     })
      .then((checkStatusAndGetJSONResponse)=>{       
        console.log(checkStatusAndGetJSONResponse);
      }).catch((err)=>{console.log(err)});
      
  }

  const fetchCreateEventVal = async (res) => {
    var status = 0;
    console.log(selectedActivity)
    if (data.isValidTitle && data.isValidDate && valuesNotNul()) {
      fetch("https://eve-back.herokuapp.com/createevent", {
        method: "POST",
        headers: { "content-type": "application/json",Authorization: "bearer " + userToken,},
        body: JSON.stringify({
          name: title,
          date: date,
          description: description,
          creatorId: userId,
          city:city,
          street: street,
          streetNb: streetNumber,
          region: region,
          zipCode: zipCode,
          categoryId:selectedActivity,
          latitude: res[0].latitude,
          longitude: res[0].longitude,
          numberPersonMax: participants,
          paying:isSelected,
          photo: img,
          place: place,
          status_id: 1
        }),
      })
        .then((response) => {
          status = response.status;
          return response.text();
        })
        .then(async (json) => {
          if (status === 401 || status === 400) {
            alert(json);
          } else {
            alert("Event has been created")
            navigation.navigate("Home");
          }
        })
        .catch((error) => console.error(error));
    } else {
      if (!data.isValidTitle) {
        alert("The title of yor event is not valid");
      } else if (!data.isValidDate) {
        alert("The date when your event will occur is not valid");
      } else if (!valuesNotNul()) {
        alert("You didn't fill every mandatory field");
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log("connected")
      socketRef.current=io("https://eve-back.herokuapp.com")
     
      return () => {
        socketRef.current?.disconnect();
      };
    }, [])
  );

  useEffect(()=>{
    if(userId!=''){
      socketRef.current?.emit('userId',(userId))
    }
    
    console.log("in use effect"+userId)
    
  },[userId])

  useEffect(()=>{
    if(userId!=''){
      socketRef.current?.emit('userId',(userId))
    }
    
    console.log("in use effect"+userId)
    
  },[socketRef.current])

  useEffect(()=>{

    socketRef.current?.on('message', (message)=>{
      console.log("You received a notification")
      setNotifVisible(true)
    })

  },[socketRef.current])

  useEffect(() => {
    const requestPermissions = async () => {
      const foreground = await Location.requestForegroundPermissionsAsync()
      if (foreground.granted){
          setPosition(null)
      } 
    }
    requestPermissions()
  }, [])

  const getLocation = async (adress) => {
    // Check if foreground permission is granted
    let { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permission not granted',
        'Allow the app to use location service.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
    console.log("la")
    Location.geocodeAsync(adress)
    .then((res) => {
      //console.log(res)
      fetchCreateEventVal(res)
      
    }).catch(e => console.log(e))
  }



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
    //'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTY1MDA1MDU1NiwiZXhwIjoxNjUwMDYxMzU2fQ.WGMvctVy10fkxjI74xpTGil7DPH52pSHmmcNWuqj-dU'
    retreiveData();


    if(isFocused) {
      setLoading(true)
    }
    
    if(retreive){ 
      Promise.all([
        //fetch("https://eve-back.herokuapp.com/getCategories"),
        fetch("https://eve-back.herokuapp.com/getCategories"),
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
          setCategories(data[0]);
        })
        .catch(function (error) {
          // if there's an error, log it
          console.log(error);
        })
        .finally(() => setLoading(false));
      }

  }, [retreive,isFocused]);

  const textInputChange = (val) => {
    //TODO
    onChangeTitle(val)
  };

  const handleValidTitle = (val) => {
    if (val.trim().length >= 2) {
      setData({
        ...data,
        isValidTitle: true,
      });
    } else {
      setData({
        ...data,
        isValidTitle: false,
      });
    }
  };

  const handleValidDate = (val) => {
    //TODO : no need if we place a date picker
  };

  return (
    <ScrollView style={{width:'100%'}}>
      <View style={[styles.notif_buble, {display: notifVisible? "flex": "none"}]}>
        <TouchableOpacity style={styles.container_icon} onPress={()=>{navigation.navigate("Notifications"); setNotifVisible(false)}}>
              <Ionicons
                name="notifications"
                size={30}
                color={COLORS.white}
              />
        </TouchableOpacity> 
      </View>
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.beige} barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.text_header}>Create Event</Text>
        </View>

        <Animatable.View
          animation="fadeInUpBig"
          style={[styles.footer, { backgroundColor: COLORS.greyBlue }]}
        >
          <Text style={[styles.text_footer, { color: COLORS.lightBlue }]}>
            Title *
          </Text>
          <View style={styles.action}>
            <Foundation name="ticket" color={COLORS.lightBlue} size={20} />
            <TextInput
              style={styles.textInput}
              placeholder="The name of your event"
              placeholderTextColor={COLORS.lightBlue}
              autoCapitalize="none"
              onChangeText={onChangeTitle}
              onEndEditing={(e) => handleValidTitle(e.nativeEvent.text)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          {data.isValidTitle ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Invalid title</Text>
            </Animatable.View>
          )}
          <Text
            style={[
              styles.text_footer,
              {
                color: COLORS.lightBlue,
                marginTop: 35,
              },
            ]}
          >
            Date *
          </Text>
          <View style={styles.drop}>
            <Feather name="calendar" color={COLORS.lightBlue} size={30} />
            <DatePicker
              style={{ width: "90%" }}
              date={date}
              mode="date"
              placeholder="select date"
              placeholderStyle={styles.placeholderStyle}
              showIcon={false}
              format="DD/MM/YYYY"
              minDate="01/01/2016"
              maxDate="01/01/2026"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateText: {
                  fontSize: 14,
                  color: COLORS.lightBlue,
                },
                dateInput: {
                  marginLeft: 36,
                  height: 30,
                },
                datePickerCon: { backgroundColor: COLORS.beige },
                placeholderText: {
                  fontSize: 18,
                  color: COLORS.lightBlue,
                },
              }}
              onDateChange={(date) => {
                const splitted = date.split("/");
                const newDate = `${splitted[2]}-${splitted[1]}-${splitted[0]} 00:00:00`;
                console.log(newDate)
                setDate(newDate);
              }}
            />
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                color: COLORS.lightBlue,
                marginTop: 35,
              },
            ]}
          >
            Number of participants *
          </Text>
          <View style={styles.action}>
            <Fontisto name="persons" color={COLORS.lightBlue} size={20} />
            <TextInput
              style={styles.textInput}
              placeholder="Number"
              keyboardType = 'numeric'
              placeholderTextColor={COLORS.lightBlue}
              onChangeText={onChangeParticipants}
            />
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                color: COLORS.lightBlue,
                marginTop: 35,
              },
            ]}
          >
            Street Number *
          </Text>
          <View style={styles.action}>
            <EvilIcons name="location" color={COLORS.lightBlue} size={20} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your street number"
              placeholderTextColor={COLORS.lightBlue}
              onChangeText={onChangeStreetNumber}
            />
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                color: COLORS.lightBlue,
                marginTop: 35,
              },
            ]}
          >
            Street *
          </Text>
          <View style={styles.action}>
            <EvilIcons name="location" color={COLORS.lightBlue} size={20} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your street: avenue Albert Einstein"
              placeholderTextColor={COLORS.lightBlue}
              onChangeText={onChangeStreet}
            />
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                color: COLORS.lightBlue,
                marginTop: 35,
              },
            ]}
          >
            Zip Code *
          </Text>
          <View style={styles.action}>
            <EvilIcons name="location" color={COLORS.lightBlue} size={20} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your zip code"
              placeholderTextColor={COLORS.lightBlue}
              onChangeText={onChangeZipCode}
            />
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                color: COLORS.lightBlue,
                marginTop: 35,
              },
            ]}
          >
            City *
          </Text>
          <View style={styles.action}>
            <EvilIcons name="location" color={COLORS.lightBlue} size={20} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your city"
              placeholderTextColor={COLORS.lightBlue}
              onChangeText={onChangeCity}
            />
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                color: COLORS.lightBlue,
                marginTop: 35,
              },
            ]}
          >
            Region *
          </Text>
          <View style={styles.action}>
            <EvilIcons name="location" color={COLORS.lightBlue} size={20} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your region"
              placeholderTextColor={COLORS.lightBlue}
              onChangeText={onChangeRegion}
            />
          </View>
          
          
          <Text style={{color:COLORS.red, marginTop:10}}>Users won't know the address till they become participants. They will only see the place you enter bellow</Text>
          <Text
            style={[
              styles.text_footer,
              {
                color: COLORS.lightBlue,
                marginTop: 35,
              },
            ]}
          >
            Place *
          </Text>
          <View style={styles.action}>
            <EvilIcons name="location" color={COLORS.lightBlue} size={20} />
            <TextInput
              style={styles.textInput}
              placeholder="Your event's location"
              placeholderTextColor={COLORS.lightBlue}
              onChangeText={onChangePlace}
            />
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                color: COLORS.lightBlue,
                marginTop: 35,
              },
            ]}
          >
            Type of activity*
          </Text>
          <View style={styles.drop}>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={categories}
              search
              maxHeight={300}
              labelField="description"
              valueField="id"
              placeholder={selectedActivity}
              searchPlaceholder="Search..."
              value={"test"}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setSelectedActivity(item.id);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? "blue" : COLORS.lightBlue}
                  name="Safety"
                  size={20}
                />
              )}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              disabled={false}
              value={isSelected}
              onValueChange={setSelection}
              style={styles.checkbox}
            />

            <Text style={styles.label}>Paid admission</Text>
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                color: COLORS.lightBlue,
                marginTop: 35,
              },
            ]}
          >
            Image*
          </Text>
          <View
            style={{
              paddingTop: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={imageUploaderStyles.container}>
              {
                <Image
                  source={{
                    uri:
                      img != undefined
                        ? img
                        : "https://cdn-icons-png.flaticon.com/512/117/117105.png",
                  }}
                  style={{ width: 120, height: 120, opacity: 0.5 }}
                />
              }

              <View style={imageUploaderStyles.uploadBtnContainer}>
                <TouchableOpacity
                  onPress={addImage}
                  style={imageUploaderStyles.uploadBtn}
                >
                  <Text>{"Upload"} Image</Text>
                  <Feather
                    name="edit-2"
                    color={COLORS.midnightBlue}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                color: COLORS.lightBlue,
                marginTop: 35,
              },
            ]}
          >
            Project Description
          </Text>
          <View style={styles.action}>
            <Fontisto name="info" color={COLORS.lightBlue} size={20} />
            <TextInput
              style={styles.textInput}
              placeholder="Write a description of your event"
              placeholderTextColor={COLORS.lightBlue}
              onChangeText={onChangeDescription}
            />
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.validate}
              onPress={()=>{getLocation(formatAdress())}}
            >
              <View style={styles.validate}>
                <Text style={[styles.textSign, { color: COLORS.greyBlue }]}>
                  Create !
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    </ScrollView>
  );
};

export default CreateEventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.beige,
  },
  header: {
    flex: 2.25,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 4,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  dropdown: {
    height: 50,
    backgroundColor: "transparent",
    borderBottomColor: COLORS.beige,
    borderBottomWidth: 0.5,
    width: "100%",
    marginBottom: 15,
  },
  placeholderStyle: {
    color: COLORS.lightBlue,
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: COLORS.lightBlue,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
  text_header: {
    color: COLORS.greyBlue,
    fontWeight: "bold",
    fontSize: 30,
    paddingTop: 50,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.beige,
    paddingBottom: 5,
  },
  drop: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "transparent",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: COLORS.beige,
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  validate: {
    width: "100%",
    backgroundColor: COLORS.lightBlue,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
  pickerStyle: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: COLORS.lightBlue,
  },
  checkboxContainer: {
    flexDirection: "row",
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
    color: COLORS.lightBlue,
  },
});

const imageUploaderStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    height: 180,
    width: "100%",
    backgroundColor: COLORS.beige,
    position: "relative",
    borderRadius: 0,
    overflow: "hidden",
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "30%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  notif_buble:{
    width:'100%', 
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    marginBottom: -40, 
    zIndex: 100
  },
  container_icon: {
    backgroundColor: COLORS.red,
    width:40,
    height:40,
    borderRadius:20,
    borderColor: COLORS.black,
    borderWidth:2,
    alignItems:'center',
    justifyContent:'center'
  }
});
