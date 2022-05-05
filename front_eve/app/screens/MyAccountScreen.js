import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import React, { useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { COLORS } from "../config/colors.js";
import { MaterialIcons } from "@expo/vector-icons";
import MyCarousel from "../components/MyCarousel";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Feather from "react-native-vector-icons/Feather";
import DialogInput from "react-native-dialog-input";
import UploadImage from "../config/uploadImage.js";
import formatageDate from "../utils/date_formatage";
import StarRating from "../components/StarRating";
import { useFonts } from "@expo-google-fonts/dev";
import AppLoading from "expo-app-loading";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/dev";
import Spinner from "react-native-loading-spinner-overlay";
import NotifBuble from "../components/NotifBuble.js";
import { io } from "socket.io-client";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';




export default function MyAccountScreen({navigation}) {
  const tabBarHeight = useBottomTabBarHeight() * 2;
  const [notifVisible, setNotifVisible] = React.useState(false);
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

  //Edit functions
  const editName = () => {
    Alert.alert("You can't edit your name");
  };
  const editSurame = () => {
    Alert.alert("You can't edit your surname");
  };
  const editMail = () => {
    Alert.alert("You can't edit your email");
  };
  const editPhoneNumber = () => {
    setVisiblePhoneNumber(true);
  };
  const editPassword = () => {
    setVisiblePassword(true);
  };
  const editGender = () => {
    setVisibleGender(true);
  };
  const editBirthDate = () => {
    setVisibleBirthDate(true);
  };
  const editImgProfil = () => {
    setVisibleImgProfil(true);
  };

  //Recup les infos d'inscription ET imgProfil
  const [retreive, setRetreive] = React.useState(false);
  const [userId, setUserId] = React.useState("");
  const [userToken, setUserToken] = React.useState("");
  const [isLoading, setLoading] = React.useState(true);
  const [userInfo, setuserInfo] = React.useState(null);
  const [participantRating, setParticipantRating] = React.useState(0);
  const [creatorRating, setCreatorRating] = React.useState(0);
  const [review, setReviewUser] = React.useState(null);
  const [birthDate, setBirthDate] = React.useState("");

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

  
  //Recuperation des données
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

     

      if(retreive){      
        Promise.all([
          fetch('https://eve-back.herokuapp.com/getMyAccountInfo',{
            method: "POST",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
              "id":userId,
            })}),
          fetch('https://eve-back.herokuapp.com/getReviewUser',{
            method: "POST",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
              "id":userId,
            })}),
        ]).then(function (responses) {
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
            if (index === 0) {
              setuserInfo(item.global_infos[0]);
              setCreatorRating(item.creator_rating[0].score);
              setParticipantRating(item.participant_rating[0].score);
              console.log(item)
            }
            if (index === 1) {
              setReviewUser(item);
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

  //Modification des données
  /*const storeData = async () => {
    try {
      await AsyncStorage.setItem(
        'userId',
        JSON.stringify(userInfo),
        () => {
          AsyncStorage.mergeItem(
            'userId',
            JSON.stringify(userInfo),
            () => {
              AsyncStorage.getItem(userId, (err, result) => {
                console.log(result);
              });
            }
          );
        }
      );
    } catch (error) {
      // Error saving data
    }
  };
  storeData();*/

  //Dialog visibility
  const [visiblePhoneNumber, setVisiblePhoneNumber] = useState(false);

  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleGender, setVisibleGender] = useState(false);
  const [visibleBirthDate, setVisibleBirthDate] = useState(false);
  const [visibleImgProfil, setVisibleImgProfil] = useState(false);

  //Write data

  const editFecth = (i, val) => {
    var edit = [];
    const keys = Object.keys(userInfo);
    keys.map((item, index) => {
      if (index >= 3) {
        if (index != i) {
          edit.push(null);
        } else {
          edit.push(val);
        }
      }
    });

    
    fetch('https://eve-back.herokuapp.com/editProfile',{
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        phone: edit[0],
        gender: edit[2],
        dateBirth: edit[3],
        userPassword: edit[1],
        id: userId,
      }),
    })
      .then((response) => {})
      .catch((error) => console.error(error));
  };

  const sendInputPhoneNumber = (inputText) => {
    setuserInfo({ ...userInfo, phone: inputText });
    setVisiblePhoneNumber(false);
    editFecth(3, inputText);
  };

  const sendInputPassword = (inputText) => {
    setuserInfo({ ...userInfo, password: inputText });
    setVisiblePassword(false);
    editFecth(4, inputText);
  };
  const sendInputGender = (inputText) => {
    setuserInfo({ ...userInfo, gender: inputText });
    setVisibleGender(false);
    editFecth(5, inputText);
  };
  const sendInputBirthDate = (inputText) => {
    setuserInfo({ ...userInfo, date_birth: inputText });
    setVisibleBirthDate(false);
    editFecth(6, inputText);
  };
  const sendInputImgProfil = (inputText) => {
    setuserInfo({ ...userInfo, imgProfil: inputText });
    setVisibleImgProfil(false);
    editFecth(7, inputText);
  };

  const showDialog = () => {
    setVisiblePhoneNumber(false);

    setVisiblePassword(false);
    setVisibleGender(false);
    setVisibleBirthDate(false);
    setVisibleImgProfil(false);
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
              textContent={'Loading...'}
              //Text style of the Spinner Text
              textStyle={styles.spinnerTextStyle}
            />
      ) :
         (<View>
          <View style={styles.header}>
                    <Text style={styles.title_header}>Profile</Text>
          </View>
          <View style={styles.body}>
            <ScrollView  style={{marginBottom: (Platform.OS==='ios')? 0 : tabBarHeight*2}}>
                <View style={[styles.notif_buble, {display: notifVisible? "flex": "none"}]}>
                  <TouchableOpacity style={styles.container_icon} onPress={()=>{navigation.navigate("Notifications"); setNotifVisible(false)}}>
                          <Ionicons
                            name="notifications"
                            size={30}
                            color={COLORS.white}
                          />
                    </TouchableOpacity>
                </View>

                <View
                  style={{
                    paddingTop: 40,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <UploadImage imgProfil={userInfo.photo} id={userId} />
                </View>
               

                <View style={styles.content_info}>
                  <Text style={[styles.text_footer, styles.titleTextInput]}>
                    Name
                  </Text>

                  <View style={styles.action}>
                    <Feather name="user" color={COLORS.white} size={20} />
                    <TextInput
                      style={styles.textInput}
                      defaultValue={userInfo.name}
                      editable={false}
                      //onChangeText={onChangeEmail}
                    />
                    <TouchableOpacity onPress={editName}>
                      <Feather name="edit-2" color={COLORS.white} size={20} />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.content_info}>
                  <Text style={[styles.text_footer, styles.titleTextInput]}>
                    Surname
                  </Text>

                  <View style={styles.action}>
                    <Feather name="user" color={COLORS.white} size={20} />
                    <TextInput
                      style={styles.textInput}
                      defaultValue={userInfo.surname}
                      editable={false}
                      //onChangeText={onChangeEmail}
                    />
                    <TouchableOpacity onPress={editSurame}>
                      <Feather name="edit-2" color={COLORS.white} size={20} />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.content_info}>
                  <Text style={[styles.text_footer, styles.titleTextInput]}>
                    Password
                  </Text>

                  <View style={styles.action}>
                    <Feather name="lock" color={COLORS.lightBlue} size={20} />
                    <TextInput
                      style={styles.textInput}
                      defaultValue={userInfo.password}
                      editable={false}
                      //onChangeText={onChangeEmail}
                    />

                    <TouchableOpacity onPress={editPassword}>
                      <Feather name="edit-2" color={COLORS.white} size={20} />
                    </TouchableOpacity>
                    <View>
                      <DialogInput
                        style={styles.dialoginput}
                        isDialogVisible={visiblePassword}
                        title={"Enter a new password"}
                        //message={"Enter a new password"}
                        hintInput={"password"}
                        submitInput={(inputText) => {
                          sendInputPassword(inputText);
                        }}
                        closeDialog={() => {
                          showDialog(false);
                        }}
                      ></DialogInput>
                    </View>
                  </View>
                </View>

                <View style={styles.content_info}>
                  <Text style={[styles.text_footer, styles.titleTextInput]}>
                    Email
                  </Text>

                  <View style={styles.action}>
                    <Feather name="mail" color={COLORS.white} size={20} />
                    <TextInput
                      style={styles.textInput}
                      defaultValue={userInfo.mail}
                      placeholder="Veillez entrer votre adresse mail"
                      placeholderTextColor={COLORS.lightBlue}
                      editable={false}
                      //onChangeText={onChangeEmail}
                    />
                    <TouchableOpacity onPress={editMail}>
                      <Feather name="edit-2" color={COLORS.white} size={20} />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.content_info}>
                  <Text style={[styles.text_footer, styles.titleTextInput]}>
                    Phone number
                  </Text>

                  <View style={styles.action}>
                    <Feather name="phone" color={COLORS.white} size={20} />
                    <TextInput
                      style={styles.textInput}
                      defaultValue={userInfo.phone}
                      placeholder="Enter your phone number"
                      placeholderTextColor={COLORS.lightBlue}
                      editable={false}
                      //onChangeText={onChangeEmail}
                    />
                    <TouchableOpacity onPress={editPhoneNumber}>
                      <Feather name="edit-2" color={COLORS.white} size={20} />
                    </TouchableOpacity>
                    <View>
                      <DialogInput
                        style={styles.dialoginput}
                        isDialogVisible={visiblePhoneNumber}
                        title={"Enter a new phone number"}
                        hintInput={"Phone number"}
                        submitInput={(inputText) => {
                          sendInputPhoneNumber(inputText);
                        }}
                        closeDialog={() => {
                          showDialog(false);
                        }}
                      ></DialogInput>
                    </View>
                  </View>
                </View>

                <View style={styles.content_info}>
                  <Text style={[styles.text_footer, styles.titleTextInput]}>
                    Gender
                  </Text>

                  <View style={styles.action}>
                    <Feather name="user" color={COLORS.white} size={20} />
                    <TextInput
                      style={styles.textInput}
                      defaultValue={userInfo.gender}
                      placeholder="Enter your gender"
                      placeholderTextColor={COLORS.lightBlue}
                      editable={false}
                      //onChangeText={onChangeEmail}
                    />
                    <TouchableOpacity onPress={editGender}>
                      <Feather name="edit-2" color={COLORS.white} size={20} />
                    </TouchableOpacity>
                    <DialogInput
                      style={styles.dialoginput}
                      isDialogVisible={visibleGender}
                      title={"Enter a new gender"}
                      hintInput={"gender"}
                      submitInput={(inputText) => {
                        sendInputGender(inputText);
                      }}
                      closeDialog={() => {
                        showDialog(false);
                      }}
                    ></DialogInput>
                  </View>
                </View>

                <View style={styles.content_info}>
                  <Text style={[styles.text_footer, styles.titleTextInput]}>
                    Birth date
                  </Text>

                  <View style={styles.action}>
                    <Feather name="calendar" color={COLORS.white} size={20} />
                    <TextInput
                      style={styles.textInput}
                      defaultValue={formatageDate(userInfo.date_birth)}
                      placeholder="Enter your birth date"
                      placeholderTextColor={COLORS.greyBlue}
                      editable={false}
                      //onChangeText={onChangeEmail}
                    />
                    <TouchableOpacity onPress={editBirthDate}>
                      <Feather name="edit-2" color={COLORS.white} size={20} />
                    </TouchableOpacity>
                    <DialogInput
                      style={styles.dialoginput}
                      isDialogVisible={visibleBirthDate}
                      title={"Enter a new birth date"}
                      hintInput={"birth date"}
                      submitInput={(inputText) => {
                        sendInputBirthDate(inputText);
                      }}
                      closeDialog={() => {
                        showDialog(false);
                      }}
                    ></DialogInput>
                  </View>

                  <View style={styles.events}>
                    <View style={styles.categorieEvents}>
                      <Text style={styles.title_body}>Ratings</Text>
                      <MaterialIcons
                        name="star-rate"
                        color={COLORS.lightBlue}
                        size={26}
                      />
                    </View>
                    <Text style={styles.text_body}>Participation rating</Text>
                    <StarRating
                      ratings={participantRating}
                      reviews={participantRating}
                      color={COLORS.lightYellow}
                    />
                    <Text style={styles.text_body}>Organisation rating</Text>
                    <StarRating
                      ratings={creatorRating}
                      reviews={creatorRating}
                      color={COLORS.lightYellow}
                    />
                  </View>

                  <View style={styles.events}>
                    <View style={styles.categorieEvents}>
                      <Text style={styles.title_body}>Reviews</Text>
                      <MaterialIcons
                        name="preview"
                        color={COLORS.lightBlue}
                        size={26}
                      />
                    </View>
                    <MyCarousel
                      data={review}
                      type={{ event: "review" }}
                      navigation={navigation}
                    />
                  </View>
                  </View>
                  <View style={{width:'100%', flexDirection: 'row', justifyContent:'center'}}>
                    <TouchableOpacity activeOpacity={0.7} 
                                      style={[styles.button, 
                                              {backgroundColor: COLORS.lightBlue, 
                                              marginLeft:10
                                            }]} 
                                      onPress={()=>{navigation.navigate("SignInScreen")}}>
                        <Text style={[styles.text_button, {color: COLORS.greyBlue}]}>Log out</Text>
                    </TouchableOpacity>   
                  </View>
            </ScrollView>
                                 

          </View>
            

          </View>
        )}
      </SafeAreaView>
    );
  }
}

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

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
    shadowColor: "#000",
    shadowOpacity: 0.9,
    shadowRadius: 7,
    borderRadius: 10,
    // flex:1
  },
  content_info: {
    marginHorizontal: 30,
    marginTop: 20,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightBlue,
    paddingBottom: 5,
    width: windowWidth - 60,
    alignItems: "center",
  },
  title_header: {
    color: COLORS.greyBlue,
    fontSize: 25,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
  title_body: {
    color: COLORS.lightBlue,
    fontSize: 23,
  },

  profilImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  dialogStyle: {
    width: "20%",
    height: "20%",
    borderRadius: 25,
  },
  locationView: {
    flexDirection: "row",
  },
  text_header: {
    fontSize: 20,
  },
  body: {
    backgroundColor: COLORS.greyBlue,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 0,
    paddingVertical: 20,
  },
  text_body: {
    color: COLORS.lightBlue,
    fontFamily: "Montserrat_400Regular",
    fontSize: 19,
    marginBottom: 5,
  },
  events: {
    flexDirection: "column",
    marginTop: 50,
  },
  categorieEvents: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  titleTextInput: {
    color: COLORS.lightBlue,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: COLORS.lightBlue,
    marginHorizontal: 1,
  },
  text_footer: {
    marginTop: Platform.OS === "ios" ? 5 : 6,
    marginHorizontal: 10,
    color: "#05375a",
    fontSize: 18,
  },
  notif_buble: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: -40,
    zIndex: 100,
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
  },
  button: {
    borderRadius : 10,
    backgroundColor : COLORS.lightBlue,
    width : 140,
    height: 40,
    justifyContent: "center",
    alignItems: 'center'
  },
  text_button: {
    color: COLORS.purple,
    fontSize: 15,
    fontFamily: 'Montserrat_600SemiBold',
  }
  
});
