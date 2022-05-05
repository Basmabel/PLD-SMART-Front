import React, {useEffect, useRef} from "react";
import{ StyleSheet, Dimensions, Text, View, Image,SafeAreaView, Alert,ScrollView, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from '../config/colors.js';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import MyCarousel from '../components/MyCarousel';
import {useFonts} from "@expo-google-fonts/dev";
import AppLoading from "expo-app-loading";
import formatageDate from '../utils/date_formatage.js' ;
import { 
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold
} from '@expo-google-fonts/dev'
import { TextInput } from "react-native-paper";
import NotifBuble from "../components/NotifBuble.js";
import {io} from "socket.io-client"
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import AddressComponent from "../components/AddressComponent.js";
import { Ionicons } from '@expo/vector-icons'; 
import Spinner from 'react-native-loading-spinner-overlay';
import Feather from "react-native-vector-icons/Feather";
import UploadImageEvent from '../config/uploadImageEvent.js';
import DatePicker from "react-native-datepicker";
import CheckBox from "expo-checkbox";





const tmp = [
  { label: "Sports", value: 1 },
  { label: "Cinema", value: 2 },
  { label: "Culture", value: 3 },
  { label: "Activities", value: 4 },
  { label: "Party", value: 5 },
  { label: "Events", value: 6 },
];

//Retreive Data of the Event

export default function EventScreen({route, navigation}) {

  const [isLoading, setLoading] = React.useState(true);
  const [retreive, setRetreive] = React.useState(false);
  const [userId, setUserId] = React.useState("")
  const [userToken, setUserToken] = React.useState("")
  const [userInfo, setUserInfo] = React.useState(null);
  const [notifParticipant, setNotifParticipant] = React.useState(null)
  const [infoEvent, setInfoEvent] = React.useState([])
  const [participation, setParticipation] = React.useState(null);
  const [reviewedParticipation, setReviewedParticipation] = React.useState(null);
  const [review, setReviewEvent] = React.useState(null);
  const [new_review, setNew_Review] = React.useState("");
  const [defaultRating, setDefaultRating] = React.useState(0)
  const [maxRating, setMaxRating] = React.useState([1, 2, 3, 4, 5])
  const [like, setLike] = React.useState(0)
  const [reviewedParticipant, setReviewedParticipant] = React.useState("hello")
  const [reviewedParticipantID, setReviewedParticipantID] = React.useState(-1)
  const [reviewIdParti,setReviewIdParti] = React.useState(false)
  const eventId = route.params.eventId
  const [notifVisible, setNotifVisible] = React.useState(false)
  const socketRef = useRef();
  const isFocused = useIsFocused();
  const [textIn, setTextIn] = React.useState(false) 
  const [reportTypes, setReportTypes] = React.useState(null);
  const [reportType, setReportType] = React.useState(null)
  //console.log(reportType)
  const [isFocus, setIsFocus] = React.useState(false);
  const [causeVisible, setCauseVisible] = React.useState(false);
  const [causeId, setCauseId] =  React.useState(1);
  const [isRported, setReported] =  React.useState(false);
  const [nbParticipant, setnbParticipant] = React.useState(false)
  const [nb_registered, setnbRegistered] = React.useState(0)
  const [categories, setCategories] = React.useState(tmp);
  const [isSelected, setSelection] = React.useState(false);
  const [selectedActivity, setSelectedActivity] = React.useState("Select a Category");


  const starImgFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png'
  const starImgEmpty = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png'

  const heartImgFilled =''
  const heartImgEmpty = ''

  var edit=[];
  var editFetch = (i,val)=>{
    const keys = Object.keys(infoEvent);
    console.log(infoEvent);
    keys.map((index)=>{
      //if(index>=3){
        if(index!=i){
          edit.push(null);
        }else{
          edit.push(val)
        }
      //}
    })
    console.log(edit)
  }
    var validateModif = ()=>{
      fetch("https://eve-back.herokuapp.com/modifyEvent",{
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        "categorie_image":edit[0],
        "categorie_name":edit[0],
        /*"date":edit[6],
        "event_image":edit[9],
        "event_name":edit[9],
        "paying":edit[7],
        "place":edit[8],
        "street_number":edit[9],
        "street":edit[9],
        "zip_code":edit[9],
        "id":infoEvent.id*/
      }
      )}).then((response)=>{
    }).catch((error)=>console.error(error))
  
  }

  var [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold
  });

  
  useFocusEffect(
    React.useCallback(() => {
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
    
    
  },[userId])

  useEffect(()=>{
    if(userId!=''){
      socketRef.current?.emit('userId',(userId))
    }
        
  },[socketRef.current])

  useEffect(()=>{

    socketRef.current?.on('message', (message)=>{
      setNotifVisible(true)
    })

  },[socketRef.current])

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
        fetch('https://eve-back.herokuapp.com/getUserInfo',{
          method: "POST",
          headers: {'content-type': 'application/json',Authorization: 'bearer '+ userToken},
          body: JSON.stringify({
            "id":userId
          })}),
        fetch('https://eve-back.herokuapp.com/getInfoEvent',{
          method: "POST",
          headers: {'content-type': 'application/json'},
          body: JSON.stringify({"event_id":eventId , "user_id": userId})
        }),
        fetch('https://eve-back.herokuapp.com/getEventParticipants',{
          method: "POST",
          headers: {'content-type': 'application/json'},
          body: JSON.stringify({"event_id": eventId})
        }),
        fetch("https://eve-back.herokuapp.com/getCategories"),

      ]).then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(responses.map(function (response) {
          return response.json();
        }));
      }).then(function (data) {
        // Log the data to the console
        // You would do something with both sets of data here
        //console.log(data)
        data.map((item,index)=>{
          //console.log(item)
          //console.log(index)
          if(index==0){
            setUserInfo(item[0])
            //console.log(item[0])
          }else if(index==1){
            console.log(item[0]);
            setInfoEvent(item[0])
            //console.log(item)
            fetch('https://eve-back.herokuapp.com/getReviewId',{
              method: "POST",
              headers: {'content-type': 'application/json'},
              body: JSON.stringify({"writer_id":userId, "target_id":item[0].creator_id,"event_id": eventId})
            }).then((response) => {
              return response.json()
            }).then(async (json) => {
              //console.log(json)
              if(json[0].id!=-1){
                setReviewIdParti(true)
              }
            }).catch((error)=>console.error(error));

            if(item[0].liked_id!=0){
             setLike(1);
            }else{
              setLike(0)
            }

            if(item[0].reported!=-1){
              setReported(true)
            }else{
              setReported(false)
            }

            if(item[0].nb_registered===item[0].maxcapacity){
              setnbParticipant(true)
            }

            setnbRegistered(item[0].nb_registered)
            //console.log(item)
          }else if(index==2){
            setParticipation(item.participants)
            //console.log(item.participants)
            //console.log(item.reviews)
          }else if(index==3){
            setCategories(item);
          }              
        });
      }).catch(function (error) {
        // if there's an error, log it
        console.log(error);
      }).finally(()=> setLoading(false));
    }
  }, [retreive,isFocused]);


  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  



  var paying_line = "currency-eur-off"
  if (infoEvent.paying){
    paying_line = "currency-eur"
  }


  if(!fontsLoaded){
    return(<AppLoading/>)
  }else{
    return(
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
          ( <View>
              <View style={styles.header}>
                    <Text style={styles.title_header}>Edit Event</Text>
                    <View style={styles.infoView}>
                        <Image style={styles.profilImage} source={{uri: userInfo.photo}}/>
                    </View>
              </View>
              <View style={styles.body}>
                <ScrollView  style={{marginBottom: tabBarHeight*3}}>
                <View style={[styles.notif_buble, {display: notifVisible? "flex": "none"}]}>
                  <TouchableOpacity style={styles.container_icon} onPress={()=>{navigation.navigate("Notifications"); setNotifVisible(false)}}>
                          <Ionicons
                            name="notifications"
                            size={30}
                            color={COLORS.white}
                          />
                    </TouchableOpacity>
                </View>
                  <View style = {{flexDirection : 'row',justifyContent: "space-between", alignItems : 'center', width:'100%'}}>
                    <View style={styles.container_categorie}>
                    <View style={styles.drop}>
          </View>
          <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={categories}
              maxHeight={250}
              labelField="description"
              valueField="id"
              placeholder={infoEvent.categorie_name}
              //value={"test"}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                //setSelectedActivity(item.id);
                setInfoEvent({ ...infoEvent,categorie_image: item.categorie_image,categorie_name: item.categorie_name});
                editFetch(0,item.categorie_image);
                editFetch(1,item.categorie_image);

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
                      <View style={styles.locationView}>
                            <Text style={styles.text_header}> Lyon </Text>
                            <MaterialCommunityIcons name="map-marker" color={COLORS.lightBlue} size={24}/>
                      </View>
                    </View>
                        <View style={styles.contentContainer}>
                              <View style={styles.info_event}>                                
                                  <View style={styles.action}>
                                  <UploadImageEvent imgEvent={infoEvent.event_image} id={infoEvent.id}/>
                                  </View>
                                  
                                  <View style={styles.action}>
                                  <TextInput style={styles.textInput}
                                  defaultValue={infoEvent.event_name}
                                  placeholder="event name"
                                  />
                                  </View>

                                  
                                  <View style={styles.action}>
                                  <Feather name="calendar" color={COLORS.lightBlue} size={30} />
                                  <DatePicker
                                    style={{ width: "90%" }}
                                    date={infoEvent.date}
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
                                    /*onDateChange={(date) => {
                                      setDate(date);
                                    }}*/
                                  />
                                </View>
                                <View style={styles.action}>
                                <TextInput style={styles.textInput}
                                placeholder="place"
                                placeholderTextColor={COLORS.lightBlue}
                                defaultValue={infoEvent.place}
                                />
                                </View>
                                
                                <View style={styles.action}>
                                <TextInput style={styles.textInput}
                                placeholder="description"
                                placeholderTextColor={COLORS.lightBlue}
                                defaultValue={infoEvent.description}
                                />
                                </View>
                                  
                                  
                                  <View style={{flexDirection: 'row'}}>
                                  <CheckBox
                                  disabled={false}
                                  value={isSelected}
                                  onValueChange={setSelection}
                                  style={styles.checkbox}
                                  />
                                  <Text style={styles.label}>Paid admission</Text></View>
                              </View> 
                              
                              <View style= {{marginHorizontal:25}}>
                                <Text style={[styles.title_address, styles.titleTextInput]}>
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
                                    defaultValue={infoEvent.street_number.toString()}
                                    placeholder="n°"
                                    placeholderTextColor={COLORS.lightBlue}
                                    //onChangeText={onChangeEmail}
                                    />                                 
                                </View>
                            </View>

                            <View style= {styles.content_info}>
                                <Text style={[styles.text_footer, styles.titleTextInput,{marginHorizontal:-50}]}>
                                    Street
                                </Text>

                                <View style={[styles.action,{width: (windowWidth/2), marginHorizontal:-50}]}>
                                    <TextInput style={styles.textInput}
                                    defaultValue={infoEvent.street}
                                    placeholder="Enter your street"
                                    placeholderTextColor={COLORS.lightBlue}
                                    />
                                  
                                    
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
                                    defaultValue={infoEvent.city}
                                    placeholder="city"
                                    placeholderTextColor={COLORS.lightBlue}
                                    //onChangeText={onChangeEmail}
                                    />
                                </View>
                            </View>
                            <View style= {styles.content_info}>
                                <Text style={[styles.text_footer, styles.titleTextInput, {marginHorizontal:-40}]}>
                                    Region
                                </Text>

                                <View style={[styles.action,{width: (windowWidth/2.5), marginHorizontal:-40}]}>
                                    <TextInput style={styles.textInput}
                                    defaultValue={infoEvent.region}
                                    placeholder="region"
                                    placeholderTextColor={COLORS.lightBlue}
                                    //onChangeText={onChangeEmail}
                                    />
                                </View>
                            </View>
                            </View>
                            <View>
                            <View style= {styles.content_info}>
                                <Text style={[styles.text_footer, styles.titleTextInput]}>
                                    Zip Code
                                </Text>

                                <View style={[styles.action,{width: (windowWidth/4)}]}>
                                    <TextInput style={styles.textInput}
                                    defaultValue={infoEvent.zip_code}
                                    placeholder="code"
                                    placeholderTextColor={COLORS.lightBlue}
                                    />
                                </View>
                            </View>  
                            </View>
                            <Text style={[styles.text_footer,
                              {color: COLORS.lightBlue,marginTop: 35,},]}
                            >
                              Number of participants
                            </Text>
                            <View style={styles.action}>
                              <TextInput
                                style={styles.textInput}
                                defaultValue={infoEvent.maxcapacity.toString()}
                                placeholder="number"
                                keyboardType = 'numeric'
                                placeholderTextColor={COLORS.lightBlue}
                                //onChangeText={onChangeParticipants}
                              />
                            </View>      
                              
                              <TouchableOpacity activeOpacity={0.7} 
                                    style={[styles.button, 
                                            {backgroundColor: COLORS.green, 
                                            marginLeft:10,alignSelf:"center", marginTop:20                                          }]} 
                                    onPress={()=>{
                                      //validateModif();
                                      console.log(infoEvent);
                                      navigation.navigate("Event", {event_id:eventId})}}>
                              <Text style={[styles.text_button, {color: COLORS.white}]}>Validate</Text>
                              </TouchableOpacity>
                      </View>

                </ScrollView>
              </View>
            </View>)
        }
      </SafeAreaView>
    )


      }

}

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.purple
  },
  desc: {
    color: COLORS.lightBlue,
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
    top: -30,
    marginTop:50
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
  input:{
    borderColor: COLORS.greyBlue,
    borderRadius: 10,
    padding: 8,
    //margin: 10, 
    width: 300,
    height: 30,
  },
  CustomRatingBarStyle:{
    justifyContent:'center',
    //position: 'relative',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10
  },
  text_footer: {
    marginTop: Platform.OS === "ios" ? 5 : 6,
    marginHorizontal : 10,
    color: "#05375a",
    fontSize: 18,
  },
    checkbox: {
    alignSelf: "center",
    height: 22,
    width: 22,
  },
  titleTextInput : {
    color: COLORS.lightBlue,
  },
  star:{
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
  photo_event:{
    width:'100%',
    height: 0.6*Dimensions.get("window").width,
    marginBottom:10,
    borderRadius: 10
  },
  title_info_event: {
    color: COLORS.lightBlue,
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 15,
    padding:1,
    
  },
  text_info_event:{
    color: COLORS.lightBlue,
    fontFamily: "Montserrat_400Regular",
    fontSize: 19,
    marginBottom: 5
  },
  infoView: {
    flexDirection: "column",
    alignItems: "center",
  },
  content_info:{
    marginHorizontal:30,
    marginTop:20
  },
  locationView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 10
  },
  text_header: {
    fontSize: 20,
    fontFamily: 'Montserrat_400Regular',
    color: COLORS.lightBlue
  },
  body: {
    backgroundColor: COLORS.greyBlue,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
    
  },
  drop: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "transparent",
    paddingBottom: 5,
  },
  contentContainer:{
    flex: 1,
    //flexDirection: "column",
    //height: "100%",
  },
  title_address: {
    marginTop: Platform.OS === "ios" ? 5 : 6,
    marginHorizontal : 10,
    color: "#05375a",
    fontSize: 20,
  },
  title_body: {
    color: COLORS.lightBlue,
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 23
  },
  events: {
    flexDirection: "column",
    marginBottom: 20
  },
  categorieEvents: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  content :{
    backgroundColor: COLORS.beige,
    borderRadius : 20,
  },
  title_header: {
    color: COLORS.greyBlue,
    fontSize:36,
    fontFamily: 'Montserrat_600SemiBold'
  },
  title_section: {
    paddingTop : 30,
    color: COLORS.white,
    fontSize: 25,
    fontFamily: 'Montserrat_600SemiBold'
  },
  regular_text: {
    color: COLORS.greyBlue,
    fontSize: 15,
    fontFamily: 'Montserrat_600SemiBold'
  },
  image : {
    paddingTop : 20,
    paddingBottom : 20
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightBlue,
    paddingBottom: 5,
    width: (windowWidth - 60),
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 5: -12,
    paddingLeft: 10,
    color: COLORS.lightBlue,
    marginHorizontal: 1,
    backgroundColor:COLORS.greyBlue,
    height: 40,
  },
  profilImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
    top: -80,
    right: -320,
    position : 'relative'
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
  },
  info_event:{
    marginTop: 15
  },
  photo_event:{
    width:'100%',
    height: 0.6*Dimensions.get("window").width,
    marginBottom:10,
    borderRadius: 10
  },
  container_categorie: {
    backgroundColor: COLORS.white,
    height: 40,
    width: 150,
    ...Platform.select({
      ios:{
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
      },
      android:{
        elevation: 5
      }
    }),
    shadowColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    margin:5
  },
  
  containerIcon:{
    width: "25%",
    height: "90%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  image_cat: {
    width: "75%",
    height: "75%",
  },
  name_cat:{
    color: COLORS.black,
    fontSize:15,
    fontWeight:'bold',
    paddingLeft: 5
  },
  otherInfos:{
  },
  notif_buble:{
    width:'100%', 
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    marginBottom: -40, 
    zIndex: 100
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    //color:COLORS.black
  },
  reportCause:{
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical:20,
    marginVertical: 30,
   
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
  text_cause:{
    color:COLORS.black,
    fontFamily: "Montserrat_500Medium",
    fontSize: 18,
    paddingBottom: 20
  }, 
  reviewContent:{
    paddingHorizontal: 10,
    paddingVertical:20,
    marginVertical: 30
  },
  text_intro_review:{
    color:COLORS.lightBlue,
    fontFamily: "Montserrat_500Medium",
    fontSize: 18,
    paddingBottom: 20
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
  dropdown: {
    height: 50,
    backgroundColor: "transparent",
    borderBottomColor: COLORS.beige,
    borderBottomWidth: 0.5,
    width: "100%",
    marginBottom: 15,
  },
  label: {
    margin: 8,
    color: COLORS.lightBlue,
    fontSize: 23,
  },
});