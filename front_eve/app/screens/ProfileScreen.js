import {
    StyleSheet,
    Dimensions,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TextInput,
    Image
  } from "react-native";
  import React from 'react';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import {useEffect} from "react";
  import { COLORS } from "../config/colors.js";
  import {  MaterialIcons } from "@expo/vector-icons";
  import MyCarousel from "../components/MyCarousel";
  import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
  import Feather from "react-native-vector-icons/Feather";
  import UploadImage from '../config/uploadImage.js';
  import formatageDate from '../utils/date_formatage';
  import StarRating from '../components/StarRating';
  import {useFonts} from "@expo-google-fonts/dev";
  import AppLoading from "expo-app-loading";
  import { 
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold
  } from '@expo-google-fonts/dev'
  import Spinner from 'react-native-loading-spinner-overlay';
import { TouchableOpacity } from "react-native-gesture-handler";
  
  export default function ProfileScreen({route}) {
    const tabBarHeight = useBottomTabBarHeight() * 2;
    //const {profile_id}=route.params;
  
    var [fontsLoaded] = useFonts({
      Montserrat_400Regular,
      Montserrat_500Medium,
      Montserrat_600SemiBold
    });
  
    const startLoading = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
  
  
    //Recup les infos d'inscription ET imgProfil
    const [retreive, setRetreive] = React.useState(false);
    const [userId, setUserId] = React.useState("");
    const [userToken, setUserToken] = React.useState("");
    const [isLoading, setLoading] = React.useState(true);
    const [userInfo, setuserInfo] = React.useState(null);
    const [participantRating, setParticipantRating]= React.useState(0);
    const [creatorRating, setCreatorRating]= React.useState(0);
    const [review, setReviewUser] = React.useState(null);
    const [birthDate, setBirthDate] = React.useState("")
  
      
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
        //setUserId(profile_id);
        if(retreive){      
          Promise.all([
            fetch('http://192.168.1.107:3000/getMyAccountInfo',{
              method: "POST",
              headers: {'content-type': 'application/json'},
              body: JSON.stringify({
                "id":userId,
              })}),
            fetch('http://192.168.1.107:3000/getReviewUser',{
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
                setuserInfo(item.global_infos[0])
                setCreatorRating(item.creator_rating[0].score)
                setParticipantRating(item.participant_rating[0].score)
              }if(index===1){
                setReviewUser(item)
              }
            });
          }).catch(function (error) {
            // if there's an error, log it
            console.log(error);
          }).finally(()=> setLoading(false));
        }
      }, [retreive]);
  
    if(!fontsLoaded){
      return(<AppLoading/>)
    }else{
      return (

        <SafeAreaView style={StyleSheet.container}>
        {isLoading ? (
              <Spinner
                visible={isLoading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
              />
        ) :
           (<View>
            <View style={styles.header}>
                      <Text style={styles.title_header}>Profile</Text>
            </View>
            <View style={styles.body}>
              <ScrollView style={{marginBottom: tabBarHeight*2}}>
                <View style={{paddingTop: 40,justifyContent: "center",alignItems: "center"}}>
                
                <Image
                  source={{ uri: (userInfo.photo)? userInfo.photo : 'https://cdn-icons-png.flaticon.com/128/1946/1946429.png'}}
                  style={styles.profilImage}/>
                </View>
  
                <View style= {styles.content_info_name}>
                    <Text style={[styles.text_footer, styles.titleTextInput]}>
                    {userInfo.name} {userInfo.surname}
                    </Text>
                </View>
  
                <View style= {styles.content_info}>
                    <View style={styles.action}>
                        <Feather name="mail" color={COLORS.white} size={20} />
                        <TextInput style={styles.textInput}
                        defaultValue={userInfo.mail}
                        placeholder="No email"
                        placeholderTextColor={COLORS.lightBlue}
                        editable={false}
                        />
                    </View>
                </View>
  
                <View style= {styles.content_info}>
                    <View style={styles.action}>
                        <Feather name="phone" color={COLORS.white} size={20} />
                        <TextInput style={styles.textInput}
                        defaultValue={userInfo.phone}
                        placeholder="No phone number filled in"
                        placeholderTextColor={COLORS.lightBlue}
                        editable={false}
                        />
                    </View>
                </View>              
  
                <View style={{flexDirection: "row",}}>
                <View style= {styles.content_info}>
                    <View style={[styles.action,{width: (windowWidth/3)}]}>
                        <Feather name="home" color={COLORS.white} size={20} />
                        <TextInput style={styles.textInput}
                        defaultValue={userInfo.city}
                        placeholder="No city filled in"
                        placeholderTextColor={COLORS.lightBlue}
                        editable={false}
                        />
                    </View>
                </View>
  
                <View style= {styles.content_info}>
                    <View style={[styles.action,{width: (windowWidth/2.5), marginHorizontal:-40}]}>
                        <TextInput style={styles.textInput}
                        defaultValue={userInfo.region}
                        placeholder="No region filled in"
                        placeholderTextColor={COLORS.lightBlue}
                        editable={false}
                        />
                    </View>
                </View>
                </View>
  
                
                <View style= {styles.content_info}>
                    
  
                    <View style={styles.action}>
                        <Feather name="user" color={COLORS.white} size={20} />
                        <TextInput style={styles.textInput}
                        defaultValue={userInfo.gender}
                        placeholder="No gender filled in"
                        placeholderTextColor={COLORS.lightBlue}
                        editable={false}
                        />
                    </View>
                </View>
  
                <View style= {styles.content_info}>
                    <View style={styles.action}>
                        <Feather name="calendar" color={COLORS.white} size={20} />
                        <TextInput style={styles.textInput}
                        defaultValue={formatageDate(userInfo.date_birth)}
                        placeholder="No birth date filled in "
                        placeholderTextColor={COLORS.greyBlue}
                        editable={false}
                        />
                    </View>
  
                    
                    <View style={styles.events}>
                      <View style={styles.categorieEvents}>
                        <Text style={styles.title_body}>Ratings</Text>
                        <MaterialIcons name="star-rate" color={COLORS.lightBlue} size={26}/>
                      </View>
                      <Text style={styles.text_body}>Participation rating</Text>
                      <StarRating ratings={participantRating} reviews={participantRating} color={COLORS.lightYellow} />
                      <Text style={styles.text_body}>Organisation rating</Text>
                      <StarRating ratings={creatorRating} reviews={creatorRating} color={COLORS.lightYellow} />
                    </View>
  
                    <View style={styles.events}>
                    <View style={styles.categorieEvents}>
                      <Text style={styles.title_body}>Reviews</Text>
                      <MaterialIcons name="preview" color={COLORS.lightBlue} size={26}/>
                    </View>
                    <MyCarousel data={review} type={{ event: "review" }} />
                    </View>
                    </View>

                    <View style= {styles.content_info_name}>
                    <View style={styles.events}>
                    <View style={styles.categorieEvents}>
                      <TouchableOpacity onPress={console.log("report user")}>
                      <Text style={styles.report}>Report {userInfo.name} {userInfo.surname}</Text>
                      </TouchableOpacity>
                    </View>
                    </View>
                    </View>

                    

                    
                    

              </ScrollView>
              </View>
              </View>)}    
  
        </SafeAreaView>
  
     );
    }
  }
  
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
    },
    content_info:{
      marginHorizontal:30,
      marginTop:20, 
    },
    content_info_name:{
      marginHorizontal:30,
      marginTop:10,
      alignItems: "center" 
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
    report: {
      color: COLORS.lightBlue,
      fontSize: 23,
      textDecorationLine: "underline",
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
    text_body:{
      color: COLORS.lightBlue,
      fontFamily: "Montserrat_400Regular",
      fontSize: 19,
      marginBottom: 5
    },
    events: {
      flexDirection: "column",
      marginTop : 50,
    },
    categorieEvents: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15,
    },
    titleTextInput : {
        color: COLORS.lightBlue,
        fontSize: 25,
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
  