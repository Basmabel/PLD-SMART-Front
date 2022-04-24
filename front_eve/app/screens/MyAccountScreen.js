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
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from "react";
import { COLORS } from "../config/colors.js";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Button, Column } from "native-base";
import MyCarousel from "../components/MyCarousel";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { NativeBaseProvider } from 'native-base';
import DialogInput from 'react-native-dialog-input';
import UploadImage from '../config/uploadImage.js';

const Swiper = require("react-native-swiper");

//Recup les events
/*const organizedEvents = [
  {
    name: "Pool party",
    date: "20 april 2022",
    place: "Ibiza",
    imgUrl: "https://picsum.photos/id/11/200/300",
    imgProfil: "https://picsum.photos/id/11/200/300",
  },
  {
    name: "Laser game",
    date: "5 february 2021",
    place: "Charpennes",
    imgUrl: "https://picsum.photos/id/11/200/300",
    imgProfil: "https://picsum.photos/id/11/200/300",
  },
  {
    name: "Aenean leo",
    date: "5 march 2020",
    place: "Charpennes",
    imgUrl: "https://picsum.photos/id/11/200/300",
    imgProfil: "https://picsum.photos/id/11/200/300",
  },
];*/

//Recup les ratings
//const rating = {value:"10/10"};


export default function MyAccountScreen() {
  const tabBarHeight = useBottomTabBarHeight() * 2;

  //Edit functions
  const editName= () => {Alert.alert("You can't edit your name")}
  const editSurame= () => {Alert.alert("You can't edit your surname")}
  const editMail= () => {Alert.alert("You can't edit your email")}
  const editPhoneNumber= () => {setVisiblePhoneNumber(true);}
  const editCity= () => {setVisibleCity(true);}
  const editStreetNumber= () => {setVisibleStreetNumber(true);}
  const editStreet= () => {setVisibleStreet(true);}
  const editRegion= () => {setVisibleRegion(true);}
  const editZipCode= () => {setVisibleZipCode(true);}
  const editAddressComplement= () => {setVisibleAddressComplement(true);}
  const editPassword= () => {setVisiblePassword(true);}
  const editGender= () => {setVisibleGender(true);}
  const editBirthDate= () => {setVisibleBirthDate(true);}
  const editImgProfil= () => {setVisibleImgProfil(true);}

  //Recup les infos d'inscription ET imgProfil
  const [retreive, setRetreive] = React.useState(false);
  const [userId, setUserId] = React.useState("");
  const [userToken, setUserToken] = React.useState("");
  const [isLoading, setLoading] = React.useState(true);
  const [userInfo, setuserInfo] = React.useState(null);
  const [participantRating, setParticipantRating]= React.useState(0);
  const [creatorRating, setCreatorRating]= React.useState(0);
  const [organizedEvents, setOrganizedEvents] = React.useState(null);
  const [upcomingEvents, setUpcomingEvents] = React.useState(null);
  const [review, setReviewUser] = React.useState(null);


  /*({
      name: "Meryem",
      surname: "Alami",
      email: "malami@gmail.com",
      phoneNumber: "0606060606",
      city: "Lyon",
      streetNb: "20",
      street: "Avenue Albert Einstein",
      region: "Rhone",
      zipCode: "69100",
      addressComplement: "Batiment M",
      password: "malamieve",
      gender: "Femme",
      birthDate: "19/12/2000",
      imgProfil: "https://picsum.photos/200/300",
      //secureTextEntry: true,
      //isValidPassword: true,
      //isCompatiblePassword: true,
    });*/

    //Recuperation des données
    useEffect(() => {

      const retreiveData = async ()=>{
        try {
          const valueString = await AsyncStorage.getItem('key');
          const value = JSON.parse(valueString);
  
          const tokenString = await AsyncStorage.getItem('token');
          const token = JSON.parse(tokenString);
          
          setUserId(value)
          setUserToken(token)
          setRetreive(true)
        } catch (error) {
          console.log(error)
        }
      }
      retreiveData();
      if(retreive){      
        Promise.all([
          fetch('http://169.254.3.246:3000/getMyAccountInfo',{
            method: "POST",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
              "id":userId,
            })}),
          fetch('http://169.254.3.246:3000/getHistoric',{
            method: "POST",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
              "id":userId,
            })}),
          fetch('http://169.254.3.246:3000/getReviewUser',{
            method: "POST",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
              "id":userId,
            })}),
        ]).then(function (responses) {
          // Get a JSON object from each of the responses
          return Promise.all(responses.map(function (response) {
            return response.json();
          }));
        }).then(function (data) {
          // Log the data to the console
          // You would do something with both sets of data here
          data.map((item,index)=>{
            if(index===0){
              setuserInfo(item.global_infos)
              setCreatorRating(item.creator_rating[0].score)
              setParticipantRating(item.participant_rating[0].score)
            }else if(index===1){
              setOrganizedEvents(item)
            }else if(index===2){
              setReviewUser(item)
              console.log(item)
            }
          });
        }).catch(function (error) {
          // if there's an error, log it
          console.log(error);
        }).finally(()=> setLoading(false));
      }
    }, [retreive]);

  //Modification des données
  /*const storeData = async () => {
    try {
      await AsyncStorage.setItem(
        'userId',
        JSON.stringify(userInfo[0]),
        () => {
          AsyncStorage.mergeItem(
            'userId',
            JSON.stringify(userInfo[0]),
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
  const [visibleCity, setVisibleCity] = useState(false);
  const [visibleStreetNumber, setVisibleStreetNumber] = useState(false);
  const [visibleStreet, setVisibleStreet] = useState(false);
  const [visibleRegion, setVisibleRegion] = useState(false);
  const [visibleZipCode, setVisibleZipCode] = useState(false);
  const [visibleAddressComplement, setVisibleAddressComplement] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleGender, setVisibleGender] = useState(false);
  const [visibleBirthDate, setVisibleBirthDate] = useState(false);
  const [visibleImgProfil, setVisibleImgProfil] = useState(false);


  //Write data

  const sendInputPhoneNumber = (inputText) => {setuserInfo({ ...userInfo,phoneNumber: inputText,});
      setVisiblePhoneNumber(false);
  };
  const sendInputCity = (inputText) => {setuserInfo({ ...userInfo,city: inputText,});
      setVisibleCity(false);
  };
  const sendInputStreetNumber = (inputText) => {setuserInfo({ ...userInfo,streetNb: inputText,});
      setVisibleStreetNumber(false);
  };
  const sendInputStreet = (inputText) => {setuserInfo({ ...userInfo,street: inputText,});
      setVisibleStreet(false);
  };
  const sendInputRegion = (inputText) => {setuserInfo({ ...userInfo,region: inputText,});
      setVisibleRegion(false);
  };
  const sendInputZipCode = (inputText) => {setuserInfo({ ...userInfo,zipCode: inputText,});
      setVisibleZipCode(false);
  };
  const sendInputAddressComplement = (inputText) => {setuserInfo({ ...userInfo,addressComplement: inputText,});
      setVisibleAddressComplement(false);
  };
  const sendInputPassword = (inputText) => {setuserInfo({ ...userInfo,password: inputText,});
      setVisiblePassword(false);
  };
  const sendInputGender = (inputText) => {setuserInfo({ ...userInfo,gender: inputText,});
      setVisibleGender(false);
  };
  const sendInputBirthDate = (inputText) => {setuserInfo({ ...userInfo,birthDate: inputText,});
      setVisibleBirthDate(false);
  };
  const sendInputImgProfil = (inputText) => {setuserInfo({ ...userInfo,imgProfil: inputText,});
      setVisibleImgProfil(false);
  };
  
  const showDialog = () => {
      setVisiblePhoneNumber(false);
      setVisibleCity(false);
      setVisibleStreetNumber(false);
      setVisibleStreet(false);
      setVisibleRegion(false);
      setVisibleZipCode(false);
      setVisibleAddressComplement(false);
      setVisiblePassword(false);
      setVisibleGender(false);
      setVisibleBirthDate(false);
      setVisibleImgProfil(false);
  };

  

  return (
  
    <SafeAreaView style={StyleSheet.container}>
    {isLoading ? (<Text>Loading...</Text>) :
      (
        <View>
        <View style={styles.header}>
                  <Text style={styles.title_header}>Profile</Text>
        </View>
        <View style={styles.body}>
          <ScrollView>
            <View style={{paddingTop: 40,justifyContent: "center",alignItems: "center"}}>
            <UploadImage/>
            </View>

            <View style= {styles.content_info}>
                <Text style={[styles.text_footer, styles.titleTextInput]}>
                    Name
                </Text>

                <View style={styles.action}>
                    <Feather name="user" color={COLORS.white} size={20} />
                    <TextInput style={styles.textInput}
                    defaultValue={userInfo[0].name}
                    editable={false}
                    //onChangeText={onChangeEmail}
                    />
                    <TouchableOpacity onPress={editName}>
                        <Feather name="edit-2" color={COLORS.white} size={20}/>
                    </TouchableOpacity>
                </View>
            </View>

            <View style= {styles.content_info}>
                <Text style={[styles.text_footer, styles.titleTextInput]}>
                    Surname
                </Text>

                <View style={styles.action}>
                    <Feather name="user" color={COLORS.white} size={20} />
                    <TextInput style={styles.textInput}
                    defaultValue={userInfo[0].surname}
                    editable={false}
                    //onChangeText={onChangeEmail}
                    />
                    <TouchableOpacity onPress={editSurame}>
                        <Feather name="edit-2" color={COLORS.white} size={20}/>
                    </TouchableOpacity>
                </View>
            </View>

            <View style= {styles.content_info}>
                <Text style={[styles.text_footer, styles.titleTextInput]}>
                    Password
                </Text>

                <View style={styles.action}>
                    <Feather name="lock" color={COLORS.lightBlue} size={20} />
                    <TextInput style={styles.textInput}
                    defaultValue={userInfo[0].password}
                    editable={false}
                    //onChangeText={onChangeEmail}
                    />

                    <TouchableOpacity onPress={editPassword}>
                        <Feather name="edit-2" color={COLORS.white} size={20}/>
                    </TouchableOpacity>
                    <View>
                      <DialogInput style={styles.dialoginput}
                            isDialogVisible={visiblePassword}
                            title={"Enter a new password"}
                            //message={"Enter a new password"}
                            hintInput ={"password"}
                            submitInput={ (inputText) => {sendInputPassword(inputText)} }
                            closeDialog={ () => {showDialog(false)}}>
                        </DialogInput>
                    </View>
                </View>

                
            </View>

            <View style= {styles.content_info}>
                <Text style={[styles.text_footer, styles.titleTextInput]}>
                    Email
                </Text>

                <View style={styles.action}>
                    <Feather name="mail" color={COLORS.white} size={20} />
                    <TextInput style={styles.textInput}
                    defaultValue={userInfo[0].mail}
                    placeholder="Veillez entrer votre adresse mail"
                    placeholderTextColor={COLORS.lightBlue}
                    editable={false}
                    //onChangeText={onChangeEmail}
                    />
                    <TouchableOpacity onPress={editMail}>
                        <Feather name="edit-2" color={COLORS.white} size={20}/>
                    </TouchableOpacity>
                </View>
            </View>

            <View style= {styles.content_info}>
                <Text style={[styles.text_footer, styles.titleTextInput]}>
                    Phone number
                </Text>

                <View style={styles.action}>
                    <Feather name="phone" color={COLORS.white} size={20} />
                    <TextInput style={styles.textInput}
                    defaultValue={userInfo[0].phone}
                    placeholder="Enter your phone number"
                    placeholderTextColor={COLORS.lightBlue}
                    editable={false}
                    //onChangeText={onChangeEmail}
                    />
                    <TouchableOpacity onPress={editPhoneNumber}>
                        <Feather name="edit-2" color={COLORS.white} size={20}/>
                    </TouchableOpacity>
                    <View>
                      <DialogInput style={styles.dialoginput}
                            isDialogVisible={visiblePhoneNumber}
                            title={"Enter a new phone number"}
                            hintInput ={"Phone number"}
                            submitInput={ (inputText) => {sendInputPhoneNumber(inputText)} }
                            closeDialog={ () => {showDialog(false)}}>
                        </DialogInput>
                    </View>
                </View>
            </View>

            <View style= {{marginHorizontal:25}}>
                <Text style={[styles.text_footer, styles.titleTextInput]}>
                    Address
                </Text>
            </View>
            <View style={{flexDirection: "row",}}>
            <View style= {styles.content_info}>
                <Text style={[styles.text_footer, styles.titleTextInput, ]}>
                    Street n°
                </Text>

                <View style={[styles.action,{width: (windowWidth/4)}]}>
                    <Feather name="home" color={COLORS.white} size={20} />
                    <TextInput style={styles.textInput}
                    defaultValue={userInfo[0].street_number}
                    placeholder="Enter your street number"
                    placeholderTextColor={COLORS.lightBlue}
                    editable={false}
                    //onChangeText={onChangeEmail}
                    />
                    <TouchableOpacity onPress={editStreetNumber}>
                        <Feather name="edit-2" color={COLORS.white} size={20}/>
                    </TouchableOpacity>
                    <DialogInput style={styles.dialoginput}
                            isDialogVisible={visibleStreetNumber}
                            title={"Enter a new street n°"}
                            hintInput ={"street n°"}
                            submitInput={ (inputText) => {sendInputStreetNumber(inputText)} }
                            closeDialog={ () => {showDialog(false)}}>
                    </DialogInput>
                </View>
            </View>

            <View style= {styles.content_info}>
                <Text style={[styles.text_footer, styles.titleTextInput,{marginHorizontal:-50}]}>
                    Street
                </Text>

                <View style={[styles.action,{width: (windowWidth/2), marginHorizontal:-50}]}>
                    <TextInput style={styles.textInput}
                    defaultValue={userInfo[0].street}
                    placeholder="Enter your street"
                    placeholderTextColor={COLORS.lightBlue}
                    editable={false}

                    //onChangeText={onChangeEmail}
                    />
                    <TouchableOpacity onPress={editStreet}>
                        <Feather name="edit-2" color={COLORS.white} size={20}/>
                    </TouchableOpacity>
                    <DialogInput style={styles.dialoginput}
                            isDialogVisible={visibleStreet}
                            title={"Enter a new street"}
                            hintInput ={"street"}
                            submitInput={ (inputText) => {sendInputStreet(inputText)} }
                            closeDialog={ () => {showDialog(false)}}>
                    </DialogInput>
                </View>
            </View>
            </View>
            <View style={{flexDirection: "row",}}>
            <View style= {styles.content_info}>
                <Text style={[styles.text_footer, styles.titleTextInput]}>
                    Address complement
                </Text>

                <View style={[styles.action,{width: (windowWidth/2),}]}>
                    <Feather name="home" color={COLORS.midnightBlue} size={20} />
                    <TextInput style={styles.textInput}
                    defaultValue={userInfo[0].address_complement}
                    placeholder="Enter your address complement"
                    placeholderTextColor={COLORS.lightBlue}
                    editable={false}
                    //onChangeText={onChangeEmail}
                    />
                    <TouchableOpacity onPress={editAddressComplement}>
                        <Feather name="edit-2" color={COLORS.white} size={20}/>
                    </TouchableOpacity>
                    <DialogInput style={styles.dialoginput}
                            isDialogVisible={visibleAddressComplement}
                            title={"Enter a new address complement"}
                            hintInput ={"address complement"}
                            submitInput={ (inputText) => {sendInputAddressComplement(inputText)} }
                            closeDialog={ () => {showDialog(false)}}>
                    </DialogInput>
                </View>
            </View>

            <View style= {styles.content_info}>
                <Text style={[styles.text_footer, styles.titleTextInput, {marginHorizontal:-50}]}>
                    Zip Code
                </Text>

                <View style={[styles.action,{width: (windowWidth/4), marginHorizontal:-50}]}>
                    <TextInput style={styles.textInput}
                    defaultValue={userInfo[0].zip_code}
                    placeholder="Enter your zip code"
                    placeholderTextColor={COLORS.lightBlue}
                    editable={false}
                    //onChangeText={onChangeEmail}
                    />
                    <TouchableOpacity onPress={editZipCode}>
                        <Feather name="edit-2" color={COLORS.white} size={20}/>
                    </TouchableOpacity>
                    <DialogInput style={styles.dialoginput}
                            isDialogVisible={visibleZipCode}
                            title={"Enter a new zip code"}
                            hintInput ={"zip code"}
                            submitInput={ (inputText) => {sendInputZipCode(inputText)} }
                            closeDialog={ () => {showDialog(false)}}>
                    </DialogInput>
                </View>
            </View>
            </View>

            <View style={{flexDirection: "row",}}>
            <View style= {styles.content_info}>
                <Text style={[styles.text_footer, styles.titleTextInput]}>
                    City
                </Text>

                <View style={[styles.action,{width: (windowWidth/3)}]}>
                    <Feather name="home" color={COLORS.white} size={20} />
                    <TextInput style={styles.textInput}
                    defaultValue={userInfo[0].city}
                    placeholder="Enter your city"
                    placeholderTextColor={COLORS.lightBlue}
                    editable={false}
                    //onChangeText={onChangeEmail}
                    />
                    <TouchableOpacity onPress={editCity}>
                        <Feather name="edit-2" color={COLORS.white} size={20}/>
                    </TouchableOpacity>
                    <DialogInput style={styles.dialoginput}
                            isDialogVisible={visibleCity}
                            title={"Enter a new city"}
                            hintInput ={"city"}
                            submitInput={ (inputText) => {sendInputCity(inputText)} }
                            closeDialog={ () => {showDialog(false)}}>
                    </DialogInput>
                </View>
            </View>

            <View style= {styles.content_info}>
                <Text style={[styles.text_footer, styles.titleTextInput, {marginHorizontal:-40}]}>
                    Region
                </Text>

                <View style={[styles.action,{width: (windowWidth/2.5), marginHorizontal:-40}]}>
                    <TextInput style={styles.textInput}
                    defaultValue={userInfo[0].region}
                    placeholder="Enter your region"
                    placeholderTextColor={COLORS.lightBlue}
                    editable={false}
                    //onChangeText={onChangeEmail}
                    />
                    <TouchableOpacity onPress={editRegion}>
                        <Feather name="edit-2" color={COLORS.white} size={20}/>
                    </TouchableOpacity>
                    <DialogInput style={styles.dialoginput}
                            isDialogVisible={visibleRegion}
                            title={"Enter a new region"}
                            hintInput ={"region"}
                            submitInput={ (inputText) => {sendInputRegion(inputText)} }
                            closeDialog={ () => {showDialog(false)}}>
                    </DialogInput>
                </View>
            </View>
            </View>

            
            <View style= {styles.content_info}>
                <Text style={[styles.text_footer, styles.titleTextInput]}>
                    Gender
                </Text>

                <View style={styles.action}>
                    <Feather name="user" color={COLORS.white} size={20} />
                    <TextInput style={styles.textInput}
                    defaultValue={userInfo[0].gender}
                    placeholder="Enter your gender"
                    placeholderTextColor={COLORS.lightBlue}
                    editable={false}
                    //onChangeText={onChangeEmail}
                    />
                    <TouchableOpacity onPress={editGender}>
                        <Feather name="edit-2" color={COLORS.white} size={20}/>
                    </TouchableOpacity>
                    <DialogInput style={styles.dialoginput}
                            isDialogVisible={visibleGender}
                            title={"Enter a new gender"}
                            hintInput ={"gender"}
                            submitInput={ (inputText) => {sendInputGender(inputText)} }
                            closeDialog={ () => {showDialog(false)}}>
                    </DialogInput>
                </View>
            </View>

            <View style= {styles.content_info}>
                <Text style={[styles.text_footer, styles.titleTextInput]}>
                    Birth date
                </Text>

                <View style={styles.action}>
                    <Feather name="calendar" color={COLORS.white} size={20} />
                    <TextInput style={styles.textInput}
                    defaultValue={userInfo[0].date_birth}
                    placeholder="Enter your birth date"
                    placeholderTextColor={COLORS.greyBlue}
                    editable={false}
                    //onChangeText={onChangeEmail}
                    />
                    <TouchableOpacity onPress={editBirthDate}>
                        <Feather name="edit-2" color={COLORS.white} size={20}/>
                    </TouchableOpacity>
                    <DialogInput style={styles.dialoginput}
                            isDialogVisible={visibleBirthDate}
                            title={"Enter a new birth date"}
                            hintInput ={"birth date"}
                            submitInput={ (inputText) => {sendInputBirthDate(inputText)} }
                            closeDialog={ () => {showDialog(false)}}>
                    </DialogInput>
                </View>

                <View style={styles.events}>
                <View style={styles.categorieEvents}>
                  <Text style={styles.title_body}>Organized events</Text>
                  <MaterialIcons name="event-available" color={COLORS.lightBlue} size={26}/>
                </View>
                <MyCarousel data={organizedEvents} type={{ event: "oui" }} />

                <View style={styles.events}>
                <View style={styles.categorieEvents}>
                  <Text style={styles.title_body}>Upcoming events</Text>
                  <MaterialIcons name="calendar-today" color={COLORS.lightBlue} size={26}/>
                </View>
                <MyCarousel data={upcomingEvents} type={{ event: "oui" }} />
                </View>


                <View style={styles.events}>
                  <View style={styles.categorieEvents}>
                    <Text style={styles.title_body}>Ratings</Text>
                    <MaterialIcons name="star-rate" color={COLORS.lightBlue} size={26}/>
                    
                  </View>
                  <Text>As a participant : {participantRating}</Text>
                    <Text>As a creator : {creatorRating}</Text>
                
                </View>

                <View style={styles.events}>
                <View style={styles.categorieEvents}>
                  <Text style={styles.title_body}>Reviews</Text>
                  <MaterialIcons name="preview" color={COLORS.lightBlue} size={26}/>
                </View>
                <MyCarousel data={review} type={{ event: "oui" }} />
                </View>
                
                </View>

            </View>
          </ScrollView>
          </View>
          </View>)}    

    </SafeAreaView>
  );
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
  content_info:{
    marginHorizontal:30,
    marginTop:20
  },
  action: {
      flexDirection: "row",
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.lightBlue,
      paddingBottom: 5,
      width: (windowWidth - 60),
      alignItems: 'center'
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
    fontSize: 23
  },
  
  profilImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  dialogStyle: {
      width: '20%',
      height: '20%',
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
  events: {
    flexDirection: "column",
    marginBottom: 20,
    marginTop : 50,
  },
  categorieEvents: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  titleTextInput : {
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
      marginHorizontal : 10,
      color: "#05375a",
      fontSize: 18,
  },
});
