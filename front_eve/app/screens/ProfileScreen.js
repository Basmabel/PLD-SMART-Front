import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  Alert
} from "react-native";
import React, { useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from "react";
import { COLORS } from "../config/colors.js";
import {  MaterialIcons } from "@expo/vector-icons";
import MyCarousel from "../components/MyCarousel";
import { Dropdown } from "react-native-element-dropdown";
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
import AntDesign from "react-native-vector-icons/AntDesign";
import NotifBuble from "../components/NotifBuble.js";
import {io} from "socket.io-client"
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons'; 

export default function ProfileScreen({route,navigation}) {
  const profile_id=route.params.profile_id;
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
  const [profileInfo, setProfileInfo] = React.useState(null);
  const [participantRating, setParticipantRating]= React.useState(0);
  const [creatorRating, setCreatorRating]= React.useState(0);
  const [review, setReviewUser] = React.useState(null);
  const [birthDate, setBirthDate] = React.useState("");
  const [reportTypes, setReportTypes] = React.useState(null);
  const [reportType, setReportType] = React.useState(null)
  const [isFocus, setIsFocus] = React.useState(false);
  const [causeVisible, setCauseVisible] = React.useState(false);
  const [causeId, setCauseId] =  React.useState(1);
  const [isRported, setReported] =  React.useState(false);
  const [isBlocked, setBlocked] =  React.useState(false);
  const [notifVisible, setNotifVisible] = React.useState(false)
 const socketRef = useRef();
 const isFocused = useIsFocused();

 console.log("///////////////////FRESH START///////////////")

  const fetchReport = async ()=>{
    setCauseVisible(false)
    fetch("http://192.168.52.1:3000/createReport",{
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ user_id: profile_id, type_id: causeId}),
    }).catch((error)=>console.error(error));

    var message = "hello"
    var type = 6
    var event_id = null
    var user_id = profile_id
    var review_id = null
    var user_targeted_id = null
    var participation_demand_id = null
    socketRef.current.emit('message',{message,type,event_id,user_id,review_id,user_targeted_id,participation_demand_id})

    fetch("http://192.168.52.1:3000/getAdminId").then((response) => {
      return response.json()
    }).then(async (json) => {
      json.map((item)=>{
        type = 11
        event_id = null
        user_id = item.id
        review_id = null
        user_targeted_id = profile_id
        participation_demand_id = null
        socketRef.current.emit('message',{message,type,event_id,user_id,review_id,user_targeted_id,participation_demand_id})
      })
    })
    .catch((error)=>console.error(error))
    .finally(()=>{alert("User has been reported")
    setReported(true)});   
  }


  const blockUser = async (blocked)=>{
    var message =""

    if(blocked){
      message = "Do you really want to block this user?"
    }else{
      message = "Do you really want to unblock this user?"
    }
    Alert.alert(
      message,
      ``,
      [
        {
          text: "Yes",
          onPress: () => {blockFetch(blocked)}
        },
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
    
  }

  const blockFetch = async (blocked)=>{
   
    fetch("http://192.168.52.1:3000/editUserBlockStatus",{
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: profile_id, block_status: blocked}),
    }).catch((error)=>console.error(error));

    var alertMessage = ""
    var type = 7
    if(isBlocked){
      alertMessage ="User is not blocked anymore : he can access the application again"
      type=15
    }else{
      alertMessage ="User has been blocked : he can't access the application anymore"
    }

    var message = "hello"
    var event_id = null
    var user_id = profile_id
    var review_id = null
    var user_targeted_id = null
    var participation_demand_id = null
    socketRef.current.emit('message',{message,type,event_id,user_id,review_id,user_targeted_id,participation_demand_id})
    
    if(isBlocked){
      alert(alertMessage)
    }else{
      alert(alertMessage)
    }

    setBlocked(!isBlocked)
    
  }

  useFocusEffect(
    React.useCallback(() => {
      console.log("connected")
      socketRef.current=io("http://192.168.52.1:3000")
     
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

      
      if(isFocused) {
        setLoading(true)
      }

      if(retreive){      
        Promise.all([
          fetch('http://192.168.52.1:3000/getUserAdmin',{
            method: "POST",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
              "id":userId,
            })}),
          fetch('http://192.168.52.1:3000/getMyAccountInfo',{
            method: "POST",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
              "id":profile_id,
            })}),
          fetch('http://192.168.52.1:3000/getReviewUser',{
            method: "POST",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
              "id":profile_id,
            })}),
          fetch('http://192.168.52.1:3000/getReportTypes'),
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
              console.log(item)
              setuserInfo(item[0])
            }
            else if(index===1){
              setProfileInfo(item.global_infos[0])
              if(item.global_infos[0].reported!=-1){
                setReported(true)
              }else{
                setReported(false)
              }
              setBlocked(item.global_infos[0].blocked)
              console.log(item)
              setCreatorRating(item.creator_rating[0].score)
              setParticipantRating(item.participant_rating[0].score)
            }else if(index===2){
              setReviewUser(item)
            }else if(index===3){
              setReportTypes(item)
            }
          });
        }).catch(function (error) {
          // if there's an error, log it
          console.log(error);
        }).finally(()=> setLoading(false));
      }
    }, [retreive,isFocused]);
    
    

  if(!fontsLoaded){
    return(<AppLoading/>)
  }else{

    //console.log(userInfo.admin)
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
            <ScrollView style={{marginBottom: '40%'}}>
            <View style={[styles.notif_buble, {display: notifVisible? "flex": "none"}]}>
              <TouchableOpacity style={styles.container_icon} onPress={()=>{navigation.navigate("Notifications"); setNotifVisible(false)}}>
                          <Ionicons
                            name="notifications"
                            size={30}
                            color={COLORS.white}
                          />
                    </TouchableOpacity>
              </View>
              <View style={{paddingTop: 40,justifyContent: "center",alignItems: "center"}}>
              
              <Image
                source={{ uri: (profileInfo.photo)? profileInfo.photo : 'https://cdn-icons-png.flaticon.com/128/1946/1946429.png'}}
                style={styles.profilImage}/>
              </View>

              <View style= {styles.content_info_name}>
                  <Text style={[styles.text_footer]}>
                  {profileInfo.name} {profileInfo.surname}
                  </Text>
                  <Text style={[styles.subtext_footer]}>
                  {profileInfo.mail}
                  </Text>
                  <Text style={[styles.subtext_footer]}>
                  {profileInfo.phone}
                  </Text>
              </View>            

              <View style= {styles.content_info}>  
                  <View style={styles.events}>
                    <View style={[{flexDirection: "row"}]}>
                      <Text style={styles.text_body}><Text style={{fontWeight: "bold"}}>Birthdate :  </Text> {formatageDate(profileInfo.date_birth)}</Text>
                    </View>
                    <View style={[{flexDirection: "row"}]}>
                      <Text style={styles.text_body}><Text style={{fontWeight: "bold"}}>School :  </Text> {profileInfo.school_name}</Text>
                    </View>
                    <View style={[{flexDirection: "row"}]}>
                    <Text style={styles.text_body}><Text style={{fontWeight: "bold"}}>Participation : </Text></Text>
                      <StarRating ratings={participantRating} reviews={participantRating} color={COLORS.lightYellow}/>
                    </View>
                    <View style={[{flexDirection: "row"}]}>
                    <Text style={styles.text_body}><Text style={{fontWeight: "bold"}}>Organisation : </Text></Text>
                    <StarRating ratings={creatorRating} reviews={creatorRating} color={COLORS.lightYellow} />
                    </View>
                  </View>

                  <View style={styles.events}>
                      <View style={styles.categorieEvents}>
                        <Text style={styles.title_body}>Reviews</Text>
                        <MaterialIcons name="preview" color={COLORS.lightBlue} size={26}/>
                      </View>
                      <MyCarousel data={review} type={{ event: "review" }} navigation={navigation}/>
                    </View>
                  </View>

                  <View style= {[styles.content_report,{ display: (!isRported)? "flex" : "none"}]}>
                        <TouchableOpacity style={styles.button_report} onPress={()=>{setCauseVisible(true)}}>
                         <Text style={styles.text_report}>Report {profileInfo.name} {profileInfo.surname}</Text>
                        </TouchableOpacity>
                        
                  </View>
                  <View style= {[styles.content_report,{display:(userInfo.admin===1 && isRported)? "flex" : "none"}]}>
                      <TouchableOpacity style={[styles.button_report]} onPress={()=>{blockUser(!isBlocked)}}>
                            <Text style={[styles.text_report,{display:(!isBlocked)? "flex" : "none"}]}> Block {profileInfo.name} {profileInfo.surname}</Text>
                            <Text style={[styles.text_report,{display:(isBlocked)? "flex" : "none"}]}> Unblock {profileInfo.name} {profileInfo.surname}</Text>
                      </TouchableOpacity>
                  </View>
                  <View style={[styles.reportCause,{ display: (causeVisible)? "flex" : "none"}]}>
                    <Text style={styles.text_cause}>Select a cause for the report</Text>
                    <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={reportTypes}
                      maxHeight={100}
                      labelField="report_type"
                      placeholder={reportType === null ? "Select a report type" : reportType}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={(item) => {
                        setCauseId(item.id)
                        setReportType(item.report_type);
                        setIsFocus(false);
                      }}
                      renderLeftIcon={() => (
                        <AntDesign
                          style={styles.icon}
                          color={isFocus ? "blue" : "black"}
                          name="Safety"
                          size={20}
                        />
                      )}
                    />
                    <View style= {styles.content_report}>
                        <TouchableOpacity style={styles.button_report} onPress={()=>{fetchReport()}}>
                         <Text style={styles.text_report}>Validate</Text>
                        </TouchableOpacity>
                  </View>
                  <View style= {styles.content_report}>
                        <TouchableOpacity style={styles.button_report} onPress={()=>{setCauseVisible(false)}}>
                         <Text style={styles.text_report}>Cancel</Text>
                        </TouchableOpacity>
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
    marginTop:20, 
    
  },
  content_info_name:{
    marginTop:10,
    flexDirection: "column",
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
    fontSize: 23,
  },
  content_report:{
    marginTop:30,
    width:'100%',
  },
  button_report: {
    width: "100%",
    backgroundColor: COLORS.lightBlue,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  text_report:{
      fontSize: 18,
      fontWeight: "bold",
      color:COLORS.greyBlue
  },    
  profilImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  
  body: {
    backgroundColor: COLORS.greyBlue,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
    
  },
  text_body:{
    color: COLORS.lightBlue,
    fontFamily: "Montserrat_400Regular",
    fontSize: 19,
    marginBottom: 5,
    marginRight: 10
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
      fontSize: 35,
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
      color: COLORS.lightBlue,
      fontFamily: "Montserrat_600SemiBold",
      fontSize: 25,
  },
  subtext_footer:{
      marginTop: Platform.OS === "ios" ? 5 : 6,
      marginHorizontal : 10,
      color: COLORS.lightBlue,
      fontFamily: "Montserrat_500Medium",
      fontSize: 15,
  },dropdown: {
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginBottom: 15,
    color:COLORS.black
  },
  placeholderStyle: {
    fontSize: 16,
    color:COLORS.black
  },
  selectedTextStyle: {
    fontSize: 14,
    color:COLORS.black
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color:COLORS.black
  },
  reportCause:{
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical:20,
    marginVertical: 30,
   
  },
  text_cause:{
    color:COLORS.black,
    fontFamily: "Montserrat_500Medium",
    fontSize: 18,
    paddingBottom: 20
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
