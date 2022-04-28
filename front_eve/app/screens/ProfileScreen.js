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
import {io} from "socket.io-client"

  
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
    const socketRef = useRef();

    const fetchReport = async ()=>{
      setCauseVisible(false)
      fetch("http://169.254.3.246:3000/createReport",{
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ user_id: profile_id, type_id: causeId}),
      }).catch((error)=>console.error(error));
      const message = "hello"
      const type = 6
      const event_id = null
      const user_id = profile_id
      const review_id = null
      const user_targeted_id = null
      const participation_demand_id = null
      socketRef.current.emit('message',{message,type,event_id,user_id,review_id,user_targeted_id,participation_demand_id})
      alert("User has been reported")
      setReported(true)
    }
      
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
            fetch('http://169.254.3.246:3000/getMyAccountInfo',{
              method: "POST",
              headers: {'content-type': 'application/json'},
              body: JSON.stringify({
                "id":profile_id,
              })}),
            fetch('http://169.254.3.246:3000/getReviewUser',{
              method: "POST",
              headers: {'content-type': 'application/json'},
              body: JSON.stringify({
                "id":profile_id,
              })}),
            fetch('http://169.254.3.246:3000/getReportTypes'),
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
              }else if(index===1){
                setReviewUser(item)
              }else if(index===2){
                setReportTypes(item)
              }
            });
          }).catch(function (error) {
            // if there's an error, log it
            console.log(error);
          }).finally(()=> setLoading(false));
        }
      }, [retreive]);
      
      socketRef.current = io("http://169.254.3.246:3000");
      
      socketRef.current.on('message', (message)=>{
        console.log("You received a notification")
      })
      socketRef.current.emit('userId',(userId))

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
              <ScrollView style={{marginBottom: '40%'}}>
                <View style={{paddingTop: 40,justifyContent: "center",alignItems: "center"}}>
                
                <Image
                  source={{ uri: (userInfo.photo)? userInfo.photo : 'https://cdn-icons-png.flaticon.com/128/1946/1946429.png'}}
                  style={styles.profilImage}/>
                </View>
  
                <View style= {styles.content_info_name}>
                    <Text style={[styles.text_footer]}>
                    {userInfo.name} {userInfo.surname}
                    </Text>
                    <Text style={[styles.subtext_footer]}>
                    {userInfo.mail}
                    </Text>
                    <Text style={[styles.subtext_footer]}>
                    {userInfo.phone}
                    </Text>
                </View>            
  
                <View style= {styles.content_info}>  
                    <View style={styles.events}>
                      <View style={[{flexDirection: "row"}]}>
                        <Text style={styles.text_body}><Text style={{fontWeight: "bold"}}>Birthdate :  </Text> {formatageDate(userInfo.date_birth)}</Text>
                      </View>
                      <View style={[{flexDirection: "row"}]}>
                        <Text style={styles.text_body}><Text style={{fontWeight: "bold"}}>School :  </Text> {userInfo.school_name}</Text>
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
                        <MyCarousel data={review} type={{ event: "review" }} />
                      </View>
                    </View>

                    <View style= {[styles.content_report,{ display: (!isRported)? "flex" : "none"}]}>
                          <TouchableOpacity style={styles.button_report} onPress={()=>{setCauseVisible(true)}}>
                           <Text style={styles.text_report}>Report {userInfo.name} {userInfo.surname}</Text>
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
    }
  });
  