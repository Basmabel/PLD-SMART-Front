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
  const [userInfo, setUserInfo] = React.useState(null);
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
          fetch('https://eve-back.herokuapp.com/getUserInfo',{
            method: "POST",
            headers: {'content-type': 'application/json',Authorization: 'bearer '+ userToken},
            body: JSON.stringify({
              "id":userId,
            })}),
          fetch('https://eve-back.herokuapp.com/getHistoric'),
          fetch('https://eve-back.herokuapp.com/getUpcomingEvent'),
          fetch('https://eve-back.herokuapp.com/getReviewUser'),
            console.log(response)
        ]).then(function (responses) {
          // Get a JSON object from each of the responses
          return Promise.all(responses.map(function (response) {
            return response.json();
          }));
        }).then(function (data) {
          // Log the data to the console
          // You would do something with both sets of data here
          data.map((item,index)=>{
            if(index==0){
              setUserInfo(item)
            }else if(index==1){
              setOrganizedEvents(item)
            }else if(index==2){
              setUpcomingEvents(item)
            }else if(index==3){
              setReviewUser(item)
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

  const sendInputPhoneNumber = (inputText) => {setUserInfo({ ...userInfo,phoneNumber: inputText,});
      setVisiblePhoneNumber(false);
  };
  const sendInputCity = (inputText) => {setUserInfo({ ...userInfo,city: inputText,});
      setVisibleCity(false);
  };
  const sendInputStreetNumber = (inputText) => {setUserInfo({ ...userInfo,streetNb: inputText,});
      setVisibleStreetNumber(false);
  };
  const sendInputStreet = (inputText) => {setUserInfo({ ...userInfo,street: inputText,});
      setVisibleStreet(false);
  };
  const sendInputRegion = (inputText) => {setUserInfo({ ...userInfo,region: inputText,});
      setVisibleRegion(false);
  };
  const sendInputZipCode = (inputText) => {setUserInfo({ ...userInfo,zipCode: inputText,});
      setVisibleZipCode(false);
  };
  const sendInputAddressComplement = (inputText) => {setUserInfo({ ...userInfo,addressComplement: inputText,});
      setVisibleAddressComplement(false);
  };
  const sendInputPassword = (inputText) => {setUserInfo({ ...userInfo,password: inputText,});
      setVisiblePassword(false);
  };
  const sendInputGender = (inputText) => {setUserInfo({ ...userInfo,gender: inputText,});
      setVisibleGender(false);
  };
  const sendInputBirthDate = (inputText) => {setUserInfo({ ...userInfo,birthDate: inputText,});
      setVisibleBirthDate(false);
  };
  const sendInputImgProfil = (inputText) => {setUserInfo({ ...userInfo,imgProfil: inputText,});
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
  <ScrollView>
    <SafeAreaView style={StyleSheet.container}>
     <View style={styles.header}>
          <Text style={styles.title_header}> Your profile </Text>
      </View>

      <View style={{paddingTop: 40,justifyContent: "center",alignItems: "center",}}>
      <UploadImage/>
      </View>

      <View style= {{marginHorizontal:30}}>
          <Text style={[styles.text_footer, styles.titleTextInput]}>
              Name
          </Text>

          <View style={styles.action}>
              <Feather name="user" color={COLORS.midnightBlue} size={20} />
              <TextInput style={styles.textInput}
              defaultValue={userInfo.name}
              editable={false}
              //onChangeText={onChangeEmail}
              />
              <TouchableOpacity onPress={editName}>
                  <Feather name="edit-2" color={COLORS.midnightBlue} size={20}/>
              </TouchableOpacity>
          </View>
      </View>

      <View style= {{marginHorizontal:30}}>
          <Text style={[styles.text_footer, styles.titleTextInput]}>
              Surname
          </Text>

          <View style={styles.action}>
              <Feather name="user" color={COLORS.midnightBlue} size={20} />
              <TextInput style={styles.textInput}
              defaultValue={userInfo.surname}
              editable={false}
              //onChangeText={onChangeEmail}
              />
              <TouchableOpacity onPress={editSurame}>
                  <Feather name="edit-2" color={COLORS.midnightBlue} size={20}/>
              </TouchableOpacity>
          </View>
      </View>

      <View style= {{marginHorizontal:30}}>
          <Text style={[styles.text_footer, styles.titleTextInput]}>
              Password
          </Text>

          <View style={styles.action}>
              <Feather name="lock" color={COLORS.midnightBlue} size={20} />
              <TextInput style={styles.textInput}
              defaultValue={userInfo.password}
              editable={false}
              //onChangeText={onChangeEmail}
              />

              <TouchableOpacity onPress={editPassword}>
                  <Feather name="edit-2" color={COLORS.midnightBlue} size={20}/>
              </TouchableOpacity>
              <View>
                 <DialogInput 
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

      <View style= {{marginHorizontal:30}}>
          <Text style={[styles.text_footer, styles.titleTextInput]}>
              Email
          </Text>

          <View style={styles.action}>
              <Feather name="mail" color={COLORS.midnightBlue} size={20} />
              <TextInput style={styles.textInput}
              defaultValue={userInfo.email}
              placeholder="Veillez entrer votre adresse mail"
              placeholderTextColor={COLORS.greyBlue}
              editable={false}
              //onChangeText={onChangeEmail}
              />
              <TouchableOpacity onPress={editMail}>
                  <Feather name="edit-2" color={COLORS.midnightBlue} size={20}/>
              </TouchableOpacity>
          </View>
      </View>

      <View style= {{marginHorizontal:30}}>
          <Text style={[styles.text_footer, styles.titleTextInput]}>
              Phone number
          </Text>

          <View style={styles.action}>
              <Feather name="phone" color={COLORS.midnightBlue} size={20} />
              <TextInput style={styles.textInput}
              defaultValue={userInfo.phoneNumber}
              placeholder="Enter your phone number"
              placeholderTextColor={COLORS.greyBlue}
              editable={false}
              //onChangeText={onChangeEmail}
              />
              <TouchableOpacity onPress={editPhoneNumber}>
                  <Feather name="edit-2" color={COLORS.midnightBlue} size={20}/>
              </TouchableOpacity>
              <View>
                 <DialogInput 
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
      <ImageBackground style={{marginHorizontal:15, marginTop: 10,}}source={require('../assets/images/lightViolet.png')}>
      

      <View style={{flexDirection: "row",}}>
      <View style= {{marginHorizontal:30}}>
          <Text style={[styles.text_footer, styles.titleTextInput, ]}>
              Street n°
          </Text>

          <View style={[styles.action,{width: (windowWidth/4)}]}>
              <Feather name="home" color={COLORS.midnightBlue} size={20} />
              <TextInput style={styles.textInput}
              defaultValue={userInfo.streetNb}
              placeholder="Enter your street number"
              placeholderTextColor={COLORS.greyBlue}
              editable={false}
              //onChangeText={onChangeEmail}
              />
              <TouchableOpacity onPress={editStreetNumber}>
                  <Feather name="edit-2" color={COLORS.midnightBlue} size={20}/>
              </TouchableOpacity>
              <DialogInput 
                      isDialogVisible={visibleStreetNumber}
                      title={"Enter a new street n°"}
                      hintInput ={"street n°"}
                      submitInput={ (inputText) => {sendInputStreetNumber(inputText)} }
                      closeDialog={ () => {showDialog(false)}}>
              </DialogInput>
          </View>
      </View>

      <View style= {{marginHorizontal:30}}>
          <Text style={[styles.text_footer, styles.titleTextInput,{marginHorizontal:-50}]}>
              Street
          </Text>

          <View style={[styles.action,{width: (windowWidth/2), marginHorizontal:-50}]}>
              <TextInput style={styles.textInput}
              defaultValue={userInfo.street}
              placeholder="Enter your street"
              placeholderTextColor={COLORS.greyBlue}
              editable={false}

              //onChangeText={onChangeEmail}
              />
              <TouchableOpacity onPress={editStreet}>
                  <Feather name="edit-2" color={COLORS.midnightBlue} size={20}/>
              </TouchableOpacity>
              <DialogInput 
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
      <View style= {{marginHorizontal:30}}>
          <Text style={[styles.text_footer, styles.titleTextInput]}>
              Address complement
          </Text>

          <View style={[styles.action,{width: (windowWidth/2),}]}>
              <Feather name="home" color={COLORS.midnightBlue} size={20} />
              <TextInput style={styles.textInput}
              defaultValue={userInfo.addressComplement}
              placeholder="Enter your address complement"
              placeholderTextColor={COLORS.greyBlue}
              editable={false}
              //onChangeText={onChangeEmail}
              />
              <TouchableOpacity onPress={editAddressComplement}>
                  <Feather name="edit-2" color={COLORS.midnightBlue} size={20}/>
              </TouchableOpacity>
              <DialogInput 
                      isDialogVisible={visibleAddressComplement}
                      title={"Enter a new address complement"}
                      hintInput ={"address complement"}
                      submitInput={ (inputText) => {sendInputAddressComplement(inputText)} }
                      closeDialog={ () => {showDialog(false)}}>
              </DialogInput>
          </View>
      </View>

      <View style= {{marginHorizontal:30}}>
          <Text style={[styles.text_footer, styles.titleTextInput, {marginHorizontal:-50}]}>
              Zip Code
          </Text>

          <View style={[styles.action,{width: (windowWidth/4), marginHorizontal:-50}]}>
              <TextInput style={styles.textInput}
              defaultValue={userInfo.zipCode}
              placeholder="Enter your zip code"
              placeholderTextColor={COLORS.greyBlue}
              editable={false}
              //onChangeText={onChangeEmail}
              />
              <TouchableOpacity onPress={editZipCode}>
                  <Feather name="edit-2" color={COLORS.midnightBlue} size={20}/>
              </TouchableOpacity>
              <DialogInput 
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
      <View style= {{marginHorizontal:30}}>
          <Text style={[styles.text_footer, styles.titleTextInput]}>
              City
          </Text>

          <View style={[styles.action,{width: (windowWidth/3)}]}>
              <Feather name="home" color={COLORS.midnightBlue} size={20} />
              <TextInput style={styles.textInput}
              defaultValue={userInfo.city}
              placeholder="Enter your city"
              placeholderTextColor={COLORS.greyBlue}
              editable={false}
              //onChangeText={onChangeEmail}
              />
              <TouchableOpacity onPress={editCity}>
                  <Feather name="edit-2" color={COLORS.midnightBlue} size={20}/>
              </TouchableOpacity>
              <DialogInput 
                      isDialogVisible={visibleCity}
                      title={"Enter a new city"}
                      hintInput ={"city"}
                      submitInput={ (inputText) => {sendInputCity(inputText)} }
                      closeDialog={ () => {showDialog(false)}}>
              </DialogInput>
          </View>
      </View>

      <View style= {{marginHorizontal:30}}>
          <Text style={[styles.text_footer, styles.titleTextInput, {marginHorizontal:-40}]}>
              Region
          </Text>

          <View style={[styles.action,{width: (windowWidth/2.5), marginHorizontal:-40}]}>
              <TextInput style={styles.textInput}
              defaultValue={userInfo.region}
              placeholder="Enter your region"
              placeholderTextColor={COLORS.greyBlue}
              editable={false}
              //onChangeText={onChangeEmail}
              />
              <TouchableOpacity onPress={editRegion}>
                  <Feather name="edit-2" color={COLORS.midnightBlue} size={20}/>
              </TouchableOpacity>
              <DialogInput 
                      isDialogVisible={visibleRegion}
                      title={"Enter a new region"}
                      hintInput ={"region"}
                      submitInput={ (inputText) => {sendInputRegion(inputText)} }
                      closeDialog={ () => {showDialog(false)}}>
              </DialogInput>
          </View>
      </View>
      </View>
      </ImageBackground>

      
      <View style= {{marginHorizontal:30}}>
          <Text style={[styles.text_footer, styles.titleTextInput]}>
              Gender
          </Text>

          <View style={styles.action}>
              <Feather name="user" color={COLORS.midnightBlue} size={20} />
              <TextInput style={styles.textInput}
              defaultValue={userInfo.gender}
              placeholder="Enter your gender"
              placeholderTextColor={COLORS.greyBlue}
              editable={false}
              //onChangeText={onChangeEmail}
              />
              <TouchableOpacity onPress={editGender}>
                  <Feather name="edit-2" color={COLORS.midnightBlue} size={20}/>
              </TouchableOpacity>
              <DialogInput 
                      isDialogVisible={visibleGender}
                      title={"Enter a new gender"}
                      hintInput ={"gender"}
                      submitInput={ (inputText) => {sendInputGender(inputText)} }
                      closeDialog={ () => {showDialog(false)}}>
              </DialogInput>
          </View>
      </View>

      <View style= {{marginHorizontal:30}}>
          <Text style={[styles.text_footer, styles.titleTextInput]}>
              Birth date
          </Text>

          <View style={styles.action}>
              <Feather name="calendar" color={COLORS.midnightBlue} size={20} />
              <TextInput style={styles.textInput}
              defaultValue={userInfo.birthDate}
              placeholder="Enter your birth date"
              placeholderTextColor={COLORS.greyBlue}
              editable={false}
              //onChangeText={onChangeEmail}
              />
              <TouchableOpacity onPress={editBirthDate}>
                  <Feather name="edit-2" color={COLORS.midnightBlue} size={20}/>
              </TouchableOpacity>
              <DialogInput 
                      isDialogVisible={visibleBirthDate}
                      title={"Enter a new birth date"}
                      hintInput ={"birth date"}
                      submitInput={ (inputText) => {sendInputBirthDate(inputText)} }
                      closeDialog={ () => {showDialog(false)}}>
              </DialogInput>
          </View>

          <View style={styles.events}>
          <View style={styles.categorieEvents}>
            <Text style={styles.title_header}>Organized events</Text>
            <MaterialIcons name="event-available" color={COLORS.greyBlue} size={26}/>
          </View>
          <MyCarousel data={organizedEvents} type={{ event: "oui" }} />

          <View style={styles.events}>
          <View style={styles.categorieEvents}>
            <Text style={styles.title_header}>Upcoming events</Text>
            <MaterialIcons name="calendar-today" color={COLORS.greyBlue} size={26}/>
          </View>
          <MyCarousel data={upcomingEvents} type={{ event: "oui" }} />
          </View>


          <View style={styles.events}>
          <View style={styles.categorieEvents}>
            <Text style={styles.title_header}>Ratings</Text>
            <MaterialIcons name="star-rate" color={COLORS.greyBlue} size={26}/>
            <MyCarousel data={review.score} type={{ event: "oui" }} />
          </View>
          
          </View>

          <View style={styles.events}>
          <View style={styles.categorieEvents}>
            <Text style={styles.title_header}>Review</Text>
            <MaterialIcons name="preview" color={COLORS.greyBlue} size={26}/>
          </View>
          <MyCarousel data={review.review} type={{ event: "oui" }} />
          </View>
          
          </View>

      </View>
      

    </SafeAreaView>
  </ScrollView>
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
    paddingTop: 30,
    flexDirection: "row",
    justifyContent: "space-evenly" ,
    //alignItems: "center",
    backgroundColor: COLORS.mauve,
    //textAlign : "center",
  },
  action: {
      flexDirection: "row",
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.mauve,
      paddingBottom: 5,
      width: (windowWidth - 60),
    },
  title_header: {
    color: COLORS.greyBlue,
    fontSize: 25,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
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
    flexDirection: "column",
    padding: 20,
    backgroundColor: COLORS.beige,
    height: "100%",
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
      color: COLORS.mauve,
  },
  textInput: {
      flex: 1,
      marginTop: Platform.OS === "ios" ? 0 : -12,
      paddingLeft: 10,
      color: COLORS.greyBlue,
      marginHorizontal: 1,
  },
  text_footer: {
      marginTop: Platform.OS === "ios" ? 5 : 6,
      marginHorizontal : 10,
      color: "#05375a",
      fontSize: 18,
  },
});
