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
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { TextInput } from "react-native-paper";
import NotifBuble from "../components/NotifBuble.js";
import {io} from "socket.io-client"
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import AddressComponent from "../components/AddressComponent.js";


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
  const [reviewedParticipant, setReviewedParticipant] = React.useState(null)
  const [reviewedParticipantID, setReviewedParticipantID] = React.useState(-1)
  const [freshValueParticipant, setFreshValueParticipant] = React.useState(false)
  const [reviewIdParti,setReviewIdParti] = React.useState(false)
  const [review, setReviewEvent] = React.useState(null);
  const [new_review, setNew_Review] = React.useState("");
  const [defaultRating, setDefaultRating] = React.useState(0)
  const [maxRating, setMaxRating] = React.useState([1, 2, 3, 4, 5])
  const [like, setLike] = React.useState(0)
  const eventId = route.params.eventId
  const [notifVisible, setNotifVisible] = React.useState(false)
  const socketRef = useRef();
  const isFocused = useIsFocused();
  const [textIn, setTextIn] = React.useState(false) 
  const [reportTypes, setReportTypes] = React.useState(null);
  const [reportType, setReportType] = React.useState(null)
  console.log(reportType)
  const [isFocus, setIsFocus] = React.useState(false);
  const [causeVisible, setCauseVisible] = React.useState(false);
  const [causeId, setCauseId] =  React.useState(1);
  const [isRported, setReported] =  React.useState(false);
  const [nbParticipant, setnbParticipant] = React.useState(false)
  const [nb_registered, setnbRegistered] = React.useState(0)


  const starImgFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png'
  const starImgEmpty = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png'

  const heartImgFilled =''
  const heartImgEmpty = ''

  const demandParticipation = async ()=>{
    Alert.alert(
      "Do you really want to participate to this event?",
      ``,
      [
        {
          text: "Yes",
          onPress: () => {participateFetch()}
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

  const participateFetch = async()=>{

    fetch("http://10.43.11.197:3000/demandParticipation",{
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({user_id: userId, event_id: eventId}),
    }).then((response) => {
      return response.json()
    }).then(async (json) => {
      const message = ""
      const type = 1
      const event_id = null
      const user_id = infoEvent.creator_id
      const review_id = null
      const user_targeted_id = null
      const participation_demand_id = json[0].id
      socketRef.current.emit('message',{message,type,event_id,user_id,review_id,user_targeted_id,participation_demand_id})
      alertRedirection("A participation demand has been sent to organizer")
    }).catch((error)=>console.error(error));

    
  }

  const LikeFetch = async(like)=>{

    fetch("http://10.43.11.197:3000/setLiked",{
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({user_id: userId, event_id: eventId, liked: like}),
    }).catch((error)=>console.error(error));

     const message = ""
      const type = 9
      const event_id = eventId
      const user_id = infoEvent.creator_id
      const review_id = null
      const user_targeted_id = userId
      const participation_demand_id = null
      socketRef.current.emit('message',{message,type,event_id,user_id,review_id,user_targeted_id,participation_demand_id})
      
  }


  const cancelEvent = async (participants)=>{
    Alert.alert(
      "Do you really want to cancel this event?",
      ``,
      [
        {
          text: "Yes",
          onPress: () => {cancelFetch(participants)}
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

  const cancelFetch = async(participants)=>{

    fetch("http://10.43.11.197:3000/cancelEvent",{
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({event_id: eventId}),
    }).catch((error)=>console.error(error));
    //console.log(participants)
    const message = ""
      const type = 12
      const event_id = eventId
      const user_id = infoEvent.creator_id
      const review_id = null
      const user_targeted_id = null
      const participation_demand_id = null
      socketRef.current.emit('message',{message,type,event_id,user_id,review_id,user_targeted_id,participation_demand_id,participants})
      alertRedirection("Your event has been canceled, participants have been warned")
  }

  const deleteEvent = async ()=>{
    Alert.alert(
      "Do you really want to delete this event?",
      ``,
      [
        {
          text: "Yes",
          onPress: () => {deleteFetch()}
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

  const deleteFetch = async()=>{

    fetch("http://10.43.11.197:3000/cancelEvent",{
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({event_id: eventId}),
    }).catch((error)=>console.error(error));
    //console.log(participants)
    const message = ""
      const type = 12
      const event_id = eventId
      const user_id = infoEvent.creator_id
      const review_id = null
      const user_targeted_id = null
      const participation_demand_id = null
      socketRef.current.emit('message',{message,type,event_id,user_id,review_id,user_targeted_id,participation_demand_id,participants})
      alertRedirection("Your event has been erased completely!")
  }

  const withdrawEvent = async ()=>{
    Alert.alert(
      "Do you really want to withdraw from this event?",
      ``,
      [
        {
          text: "Yes",
          onPress: () => {withdrawFetch()}
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

  const withdrawFetch = async()=>{

    fetch("http://10.43.11.197:3000/removeParticipant",{
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({user_id:userId, event_id: eventId}),
    }).catch((error)=>console.error(error));

    const message = ""
      const type = 8
      const event_id = eventId
      const user_id = infoEvent.creator_id
      const review_id = null
      const user_targeted_id = userId
      const participation_demand_id = null
      socketRef.current.emit('message',{message,type,event_id,user_id,review_id,user_targeted_id,participation_demand_id})
      alertRedirection("You are no longer a participant")
  }

  const reviewEvent = async (id)=>{
    Alert.alert(
      "Do you really want to send the review?",
      ``,
      [
        {
          text: "Yes",
          onPress: () => {reviewFetch(id)}
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

  const reviewFetch = async(id)=>{
    //console.log(id)
    fetch("http://10.43.11.197:3000/addReview",{
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({score:defaultRating, review: new_review, creator:infoEvent.user_is_creator, writer_id:userId, target_id:id, event_id: eventId}),
    }).then((response) => {
      return response.json()
    }).then(async (json) => {
      const message = ""
      const type = 5
      const event_id = null
      const user_id = id
      const review_id = json[0].id
      const user_targeted_id = null
      const participation_demand_id = null
      socketRef.current.emit('message',{message,type,event_id,user_id,review_id,user_targeted_id,participation_demand_id})
      
      if(infoEvent.creator_id===userId){
        setFreshValueParticipant(true)
        fetchReviewParticipant()
      }else{
        alertRedirection("Your review has been posted")
      }
      
    }).catch((error)=>console.error(error));

    
  }

  const alertRedirection = (message)=>{
    Alert.alert(
      message,
      ``,
      [
        {
          text: "Ok",
          onPress: () => {navigation.navigate("Home")}
        }
      ],
      { cancelable: false }
    );
  }

  const fetchReport = async ()=>{
    setCauseVisible(false)
    fetch("http://10.43.11.197:3000/createReportEvent",{
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ event_id: eventId, type_id: causeId}),
    }).catch((error)=>console.error(error));
    var message = "hello"
    var type = 13
    var event_id = eventId
    var user_id = infoEvent.creator_id
    var review_id = null
    var user_targeted_id = null
    var participation_demand_id = null
    socketRef.current.emit('message',{message,type,event_id,user_id,review_id,user_targeted_id,participation_demand_id})

    type = 10
    event_id = eventId
    user_id = 1
    review_id = null
    user_targeted_id = null
    participation_demand_id = null
    socketRef.current.emit('message',{message,type,event_id,user_id,review_id,user_targeted_id,participation_demand_id})
    alert("Event has been reported")
    setReported(true)


  }



  const CustomRatingBar = () => {
    return(
      <View style={styles.CustomRatingBarStyle}>
        {
          maxRating.map((item,key) => {
            return (
              <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={()=>setDefaultRating(item)}
              >
                  <Image
                  style={styles.star}
                  source={
                    item <= defaultRating
                      ? {uri : starImgFilled}
                      : {uri: starImgEmpty}
                  }
                  />
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }
  const CustomLike = () => {

    if(like===1){
      return(
        <View style={{justifyContent:'center', flexDirection: 'row', width:'100%', 
                      marginBottom: 10}}>
        <TouchableOpacity activeOpacity={0.7} onPress={()=>{setLike(0), LikeFetch(0)}} >
          <MaterialCommunityIcons name="heart" 
              color={COLORS.lightBlue} 
              size={30}
              />
        </TouchableOpacity>
        </View>
      )
    }else{
        return(
          <View style={{justifyContent:'center', flexDirection: 'row',width:'100%',
                marginBottom: 10}}>          
          <TouchableOpacity activeOpacity={0.7} onPress={()=>{setLike(1), LikeFetch(1)}} >
            <MaterialCommunityIcons name="heart-outline" color={COLORS.lightBlue} size={30} />
          </TouchableOpacity>
          </View>
        )
    }
  }

  var [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold
  });

  
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      if(!textIn){
        socketRef.current = io("http://10.43.11.197:3000");
        socketRef.current.emit('userId',(userId))
        return () => {
            socketRef.current.disconnect();
        };
      }
      
    }, [])
  );
  
  const fetchReviewParticipant = () => {
    console.log("IM INSIDE USE EFFECT")
    try{
      fetch('http://10.43.11.197:3000/getnonReviewedParticipants',{
        method: "POST",
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({"event_id": eventId})
      }).then((response) => {
        return response.json()
      }).then(data=>{setReviewedParticipation(data.participantstoReview)})
      console.log("List of New Non Reviewed Participants : ")
      console.log(reviewedParticipation)
    } catch (error) {
      console.log(error)
    }

  }

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
    
    console.log("////////////////////:FRESH START:///////////////////////////")
    

    retreiveData();

    
    socketRef.current.on('message', (message)=>{
      console.log("You received a notification")
      setNotifVisible(true)
    })
    
    if(isFocused && freshValueParticipant) {
      setLoading(true)
    }

    if(retreive){
      Promise.all([
        fetch('http://10.43.11.197:3000/getUserInfo',{
          method: "POST",
          headers: {'content-type': 'application/json',Authorization: 'bearer '+ userToken},
          body: JSON.stringify({
            "id":userId
          })}),
        fetch('http://10.43.11.197:3000/getInfoEvent',{
          method: "POST",
          headers: {'content-type': 'application/json'},
          body: JSON.stringify({"event_id":eventId , "user_id": userId})
        }),
        fetch('http://10.43.11.197:3000/getReviewEvent',{
          method: "POST",
          headers: {'content-type': 'application/json'},
          body: JSON.stringify({
            "event_id":eventId,
          })}),
        fetch('http://10.43.11.197:3000/getEventParticipants',{
          method: "POST",
          headers: {'content-type': 'application/json'},
          body: JSON.stringify({"event_id": eventId})
        }),
        fetch('http://10.43.11.197:3000/getReportTypesEvent'),
        fetch('http://10.43.11.197:3000/getnonReviewedParticipants',{
          method: "POST",
          headers: {'content-type': 'application/json'},
          body: JSON.stringify({"event_id": eventId})
        })
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
            setInfoEvent(item[0])
            //console.log(item)
            fetch('http://10.43.11.197:3000/getReviewId',{
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
             setReviewEvent(item.reviews)
             //console.log(item.reviews)
           }else if(index==3){
            setParticipation(item.participants)
            //console.log(item.participants)
            //console.log(item.reviews)
          }else if(index==4){
            //console.log(item)
            setReportTypes(item)
          }else if(index==5){
            setReviewedParticipation(item.participantstoReview)
            setReviewedParticipantID(item.participantstoReview[0].user_id)
          }              
        });
      }).catch(function (error) {
        // if there's an error, log it
        console.log(error);
      }).finally(()=> {setLoading(false);
                        setFreshValueParticipant(false);
                        setDefaultRating(0)});
    }
  }, [retreive,isFocused, freshValueParticipant]);

  const generate_cancelled_event = () =>{
      return(<View style={{alignItems:"center", marginBottom: 30,
      borderRadius: 10,
      borderWidth: 5,
      borderColor: COLORS.lightBlue }}>
        <Text style={[styles.text_header, 
          {borderColor: COLORS.lightBlue, 
          fontWeight:"bold",
          padding: 10}]}>THIS EVENT HAS BEEN CANCELLED</Text>
      </View>)
  }

  const gen_report = () => {}

  const generate_non_participant_page = () =>{
    console.log('generate non Participant Page')
    if(infoEvent.status_id==1){
      console.log('Event has not happened yet')
    return (
            <View style= {{alignItems: "center", position: 'relative', top: -10}}>
              <TouchableOpacity activeOpacity={0.7} style={[styles.button,{marginBottom: 20, display: (infoEvent.demand_id===0 && !nbParticipant)?"flex" : "none"}]} onPress={()=>{demandParticipation()}}>
                <Text style={styles.text_button}>Participate !</Text>
              </TouchableOpacity>
              <Text style = {{color : COLORS.red,
                              display: (infoEvent.demand_id!=0)? "flex" : "none",
                              marginBottom: 10
                            }}>
                              Waiting for organizer to accept your demand
              </Text>
              <Text style = {{color : COLORS.red,
                              display: (nbParticipant)? "flex" : "none",
                              marginBottom: 10
                            }}>
                              Number of participant reached
              </Text>
              <CustomLike/>
            </View>
    )
    }else if(infoEvent.status_id==3){
      console.log('Event has happened')
      return(     <View style={styles.events}>
                    <View style={[styles.categorieEvents, {marginBottom: 20}]}>
                      <Text style={styles.title_body}>Reviews</Text>
                      <MaterialIcons name="preview" color={COLORS.lightBlue} size={26}/>
                      <MyCarousel data={review} type={{ event: "review" }} navigation={navigation}/>
                    </View>
                    
                    <CustomLike/>
                  </View> 
      )
    }else if (infoEvent.status_id==2) {return generate_cancelled_event()}
  }

  const generate_participant_page = () =>{
    console.log('generate Participant Page')
    if(infoEvent.status_id===1){
      console.log('Event has not happened yet')
      return (
        <View>
          <View style={styles.events}>
                <Text style={styles.title_body}>Address</Text>
                <AddressComponent city={infoEvent.zip_code + " " + infoEvent.city } address={infoEvent.street_number +" " + infoEvent.street} latitude={infoEvent.latitude} longitude={infoEvent.longitude} font={"Montserrat_500Medium"}/>
            </View>
          <View style={styles.events}>
                <View style={styles.events}>
                  <View style={styles.categorieEvents}>
                    <Text style={styles.title_body}>Participant</Text>
                    <MaterialIcons name="verified-user" color={COLORS.lightBlue} size={26}/>
                  </View>
                  <MyCarousel data={participation} type={{ event: "participant" }} navigation={navigation} onPress={(item)=>console.log(item)}/>
              </View>
                <View style= {{alignItems: "center", position: 'relative', top: -10, marginBottom: 20}}>
                  <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={()=>{withdrawEvent()}}>
                    <Text style={styles.text_button}>Withdraw :(</Text>
                  </TouchableOpacity>
                </View>
                <CustomLike/>
          </View>
        </View>
      )
    }else if(infoEvent.status_id===3){
        console.log('Event has happened')
        return(     
        <View>
         <View style={styles.events}>
                <Text style={styles.title_body}>Address</Text>
                <AddressComponent city={infoEvent.zip_code + " " + infoEvent.city } address={infoEvent.street_number +" " + infoEvent.street} latitude={infoEvent.latitude} longitude={infoEvent.longitude} font={"Montserrat_500Medium"}/>
            </View>
          <View style={styles.events}>
              <View style={styles.categorieEvents}>
                <Text style={styles.title_body}>Reviews </Text>
                <MaterialIcons name="preview" color={COLORS.lightBlue} size={26}/>
              </View>
              <MyCarousel data={review} type={{ event: "review" }} navigation={navigation}/>
            </View> 
            <View style={styles.events}>
              <View style={styles.categorieEvents}>
                <Text style={styles.title_body}>Participants </Text>
                <MaterialIcons name="verified-user" color={COLORS.lightBlue} size={26}/>
              </View>
              <MyCarousel data={participation} type={{ event: "participant" }} navigation={navigation} />
            </View>
            <View style= {{justifyContent: "space-evenly", 
                                alignItems: "center", 
                                position: 'relative',
                                display: (!reviewIdParti)?"flex":"none",
                                marginBottom: 20}}>
                  <TextInput
                    style={[styles.input]}
                    placeholder="Post a review"
                    placeholderTextColor={COLORS.black}
                    onChangeText={(value) => {setNew_Review(value);setTextIn(true)}}
                    onEndEditing={() =>{setTextIn(false)}}
                  />
                  <CustomRatingBar/>
                  <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={()=>{reviewEvent(infoEvent.creator_id)}}>
                    <Text style={styles.text_button}>Post !</Text>
                  </TouchableOpacity>
            </View>
            <CustomLike/>
        </View>
        )
      }else if (infoEvent.status_id==2) {return generate_cancelled_event()}
    }

  const generate_organizer_page = () =>{
    console.log('generate Organizer Page')
    if(infoEvent.status_id==11){
      console.log('Event has not happened yet')
      return(
        <View>
          <View style={styles.events}>
                <Text style={styles.title_body}>Address</Text>
                <AddressComponent city={infoEvent.zip_code + " " + infoEvent.city } address={infoEvent.street_number +" " + infoEvent.street} latitude={infoEvent.latitude} longitude={infoEvent.longitude} font={"Montserrat_500Medium"}/>
            </View>
          
          <View style={styles.events}>
              <View style={styles.categorieEvents}>
                <Text style={styles.title_body}>Participant</Text>
                <MaterialIcons name="verified-user" color={COLORS.lightBlue} size={26}/>
              </View>
              <MyCarousel data={participation} type={{ event: "participant" }} navigation={navigation} onPress={(item)=>console.log(item)}/>
            </View>
            <View style={{justifyContent:"space-around",
                           flexDirection:'row', 
                           marginBottom: 20}}>
              <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={()=>{cancelEvent(participation)}}>
                      <Text style={styles.text_button}>Cancel Event</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={()=>console.log('navigate to edit event page on process')}>
                      <Text style={styles.text_button}>Edit</Text>
              </TouchableOpacity>
            </View>
            <CustomLike/>
        </View>
      )
    }else if(infoEvent.status_id==1){
      console.log('Event has happened')
      console.log('The value of reviewedParticipant is ', reviewedParticipant)
      return(
        <View>
          <View style={styles.events}>
                <Text style={styles.title_body}>Address</Text>
                <AddressComponent city={infoEvent.zip_code + " " + infoEvent.city } address={infoEvent.street_number +" " + infoEvent.street} latitude={infoEvent.latitude} longitude={infoEvent.longitude} font={"Montserrat_500Medium"}/>
            </View>
          <View style={styles.events}>
              <View style={styles.categorieEvents}>
                <Text style={styles.title_body}>Participant</Text>
                <MaterialIcons name="verified-user" color={COLORS.lightBlue} size={26}/>
              </View>
              <MyCarousel data={participation} type={{ event: "participant" }} navigation={navigation}/>
            </View>
          <View style={styles.events}>
              <View style={styles.categorieEvents}>
                <Text style={styles.title_body}>Reviews</Text>
                <MaterialIcons name="preview" color={COLORS.lightBlue} size={26}/>
              </View>
              <MyCarousel data={review} type={{ event: "review" }} navigation={navigation}/>
            </View>
            <View style = {styles.categorieEvents}>
              <Text style={styles.title_body}>Review A Participant</Text>
              <MaterialIcons name="person" color={COLORS.lightBlue} size={26}/>
            </View>
            
            <View style={[styles.reviewContent,{ display: "flex"}]}>
                                <Dropdown
                                  style={[styles.dropdown,{backgroundColor:COLORS.white}, isFocus && { borderColor: "blue" }]}
                                  placeholderStyle={styles.placeholderStyle}
                                  selectedTextStyle={styles.selectedTextStyle}
                                  inputSearchStyle={styles.inputSearchStyle}
                                  iconStyle={styles.iconStyle}
                                  data={reviewedParticipation}
                                  maxHeight={nb_registered*50}
                                  labelField="name"
                                  placeholder={(reviewedParticipant === null)? "Select a report type" : reviewedParticipant}
                                  onFocus={() => setIsFocus(true)}
                                  onBlur={() => setIsFocus(false)}
                                  onChange={(item) => {
                                    console.log(item)
                                    setReviewedParticipant(item.name);
                                    setReviewedParticipantID(item.user_id);
                                    console.log('The ID f the reviewed participant is :')
                                    console.log(reviewedParticipantID)

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
                  <TextInput
                    style={styles.input}
                    placeholder="Post a review"
                    placeholderTextColor={COLORS.black}
                    onChangeText={(value) => {setNew_Review(value);setTextIn(true)}}
                    onEndEditing={() =>{setTextIn(false)}}                    
                  />
                  <CustomRatingBar/>
                  <View style={{justifyContent:"space-around",
                           flexDirection:'row', marginTop : 10, 
                           marginBottom: 20}}>
                  <TouchableOpacity activeOpacity={0.7} 
                                    style={styles.button} 
                                    onPress={()=>{
                                      reviewEvent(reviewedParticipantID)
                                      
                                      }}>
                     <Text style={styles.text_button}> Post !</Text> 
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.7} 
                                    style={[styles.button, 
                                            {backgroundColor: COLORS.red, 
                                            marginLeft:10}]} 
                                    onPress={()=>{deleteFetch(); navigation.navigate("NavigatorBar")}}>
                      <Text style={[styles.text_button, {color: COLORS.white}]}>Delete Event</Text>
                  </TouchableOpacity>
                  </View>
            </View>
            <CustomLike/>
        </View>
      )
    }else if (infoEvent.status_id==2) { return generate_cancelled_event()}


  }

  
  const bodyGen = () =>{

    if (infoEvent.user_is_creator){
      //return Generate_organizer_page();
      return  generate_organizer_page();
    }else if(infoEvent.particip_id){
      return generate_participant_page();
    }else{
      //return generate_non_participant_page();
      return  generate_organizer_page();
    }

  }


  var paying_line = "currency-eur-off"
  if (infoEvent.paying){
    paying_line = "currency-eur"
  }
  //console.log('these are teh reviews :')
  //console.log(review)

  if(!fontsLoaded){
    return(<AppLoading/>)
  }else{
    return(
      
      <SafeAreaView style={StyleSheet.container}>

        {isLoading ? (<Text>Loading...</Text>) :
          ( <View>
              <View style={styles.header}>
                    <Text style={styles.title_header}>Home</Text>
                    <View style={styles.infoView}>
                        <Image style={styles.profilImage} source={{uri: userInfo.photo}}/>
                    </View>
              </View>
              <View style={styles.body}>
                <ScrollView style={[{marginBottom:200}]}>
                <View style={[styles.notif_buble, {display: notifVisible? "flex": "none"}]}>
                  <NotifBuble navigation={navigation}/>
                </View>
                  <View style = {{flexDirection : 'row',justifyContent: "space-between", alignItems : 'center', width:'100%'}}>
                    <View style={styles.container_categorie}>
                        <View style={styles.containerIcon}>
                            <Image
                                source={{uri: infoEvent.categorie_image}}
                                style={styles.image_cat}
                            />
                        </View>  
                        <Text style={styles.name_cat}>{infoEvent.categorie_name}</Text>    
                      </View>
                      <View style={styles.locationView}>
                            <Text style={styles.text_header}> Lyon </Text>
                            <MaterialCommunityIcons name="map-marker" color={COLORS.lightBlue} size={24}/>
                      </View>
                    </View>
                        <View style={styles.contentContainer}>
                              <View style={styles.info_event}>
                                  <Image style={styles.photo_event} source={{uri: infoEvent.event_image}}/>
                                  <Text style={styles.title_info_event}>{infoEvent.event_name}</Text>
                                  <Text style={styles.text_info_event}>{formatageDate(infoEvent.date)}</Text>
                                  <Text style={styles.text_info_event}>{infoEvent.place}</Text>
                                  <MaterialCommunityIcons name={paying_line} color={COLORS.lightBlue} size={24}/>
                                  <Image style = {styles.profilImage} source={{uri: infoEvent.creator_image}}/>
                                  <Text style={[styles.desc,{display: (infoEvent.description!=null)? "flex":"none"}]}>{infoEvent.description}</Text>
                              </View>
                              <View style={styles.otherInfos}>
                                  {bodyGen()}
                              </View>
                              <TouchableOpacity activeOpacity={0.7} style={{width:'100%', flexDirection:'row', justifyContent: 'flex-end'}} onPress={()=>setCauseVisible(true)}>
                                <Text style = {{color : COLORS.lightBlue, 
                                                textDecorationLine: "underline",
                                                display: (!isRported)? "flex" : "none"
                                                }}>
                                                  Click Here To Report
                                </Text>
                                <Text style = {{color : COLORS.red, 
                                                display: (isRported)? "flex" : "none"
                                                }}>
                                                  Event has been reported
                                </Text>
                              </TouchableOpacity>
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
                      </View>
                </ScrollView>
              </View>
            </View>)
        }
      </SafeAreaView>
    )


      }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.purple
  },
  desc: {
    color: COLORS.lightBlue,
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
    top: -30
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
    fontSize: 23
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
  contentContainer:{
    flexDirection: "column",
    height: "100%",
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
    color:COLORS.black
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
  dropdown: {
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
});