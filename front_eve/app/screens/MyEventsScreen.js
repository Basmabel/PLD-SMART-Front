import React, {useEffect, useRef} from "react";
import{ StyleSheet, Dimensions, Text, View, Image,SafeAreaView, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from '../config/colors.js';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MyCarousel from '../components/MyCarousel';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {useFonts} from "@expo-google-fonts/dev";
import AppLoading from "expo-app-loading";
import { 
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold
} from '@expo-google-fonts/dev'
import Spinner from 'react-native-loading-spinner-overlay';
import NotifBuble from "../components/NotifBuble.js";
import {io} from "socket.io-client"
import { useFocusEffect } from "@react-navigation/native";
import { Entypo } from '@expo/vector-icons'; 
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons'; 

var light = "dark"
var colorBack= COLORS.greyBlue
var colorText=COLORS.lightBlue

if(light==="light"){
  colorBack=COLORS.white
  colorText=COLORS.greyBlue
}

export default function MyEventsScreen({navigation,route}) {
  const tabBarHeight = useBottomTabBarHeight() * 2;
  console.log(route)
  var state = ""
  if(route.params!=undefined){
    state=route.params.state
  }
  

   const [userInfo, setUserInfo] = React.useState(null);
   const [isLoading, setLoading] = React.useState(true);
   const [retreive, setRetreive] = React.useState(false);
   const [userId, setUserId] = React.useState("")
   const [userToken, setUserToken] = React.useState("")
   const [comingEvents, setComingEvents] = React.useState([]);
   const [historic, setHistoric] = React.useState([]);
   const [favorites, setFavorites] = React.useState([]);
   const [comingCreatEve, setComingCreatEve] = React.useState([]);
   const [historicCreatEve, setHistoricCreatEve] =React.useState([]);
   const [notifVisible, setNotifVisible] = React.useState(false)
   const socketRef = useRef();
   const [message, setMessage] = React.useState("")
  

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
    console.log("eeee")
    socketRef.current?.on('message', (message)=>{
      console.log("You received a notification")
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
    //'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTY1MDA1MDU1NiwiZXhwIjoxNjUwMDYxMzU2fQ.WGMvctVy10fkxjI74xpTGil7DPH52pSHmmcNWuqj-dU'
    retreiveData();
    
    if(state==="create") {
      setLoading(true)
    }

    if(retreive){      
      Promise.all([
        fetch('https://eve-back.herokuapp.com/getComingEvents',{
          method: "POST",
          headers: {'content-type': 'application/json'},
          body: JSON.stringify({
            "id":userId
          })
        }),
        fetch('https://eve-back.herokuapp.com/getUserInfo',{
          method: "POST",
          headers: {'content-type': 'application/json',Authorization: 'bearer '+ userToken},
          body: JSON.stringify({
            "id":userId
          })}),
          fetch('https://eve-back.herokuapp.com/getMyHistoric',{
          method: "POST",
          headers: {'content-type': 'application/json'},
          body: JSON.stringify({
            "id":userId
          })
        }),
        fetch('https://eve-back.herokuapp.com/getMyFavorite',{
          method: "POST",
          headers: {'content-type': 'application/json'},
          body: JSON.stringify({
            "id":userId
          })
        }),
        fetch('https://eve-back.herokuapp.com/getUpcomingEvent',{
          method: "POST",
          headers: {'content-type': 'application/json'},
          body: JSON.stringify({
            "id":userId
          })
        }),
        fetch('https://eve-back.herokuapp.com/getHistoric',{
          method: "POST",
          headers: {'content-type': 'application/json'},
          body: JSON.stringify({
            "id":userId
          })
        }),
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
            setComingEvents(item)
          }else if(index==1){
            setUserInfo(item)
          }else if(index==2){
            setHistoric(item)
          } else if(index==3){
            setFavorites(item)
          } else if(index==4){
            setComingCreatEve(item)
          } else if(index==5){
            setHistoricCreatEve(item)
          }    
          console.log(item)    
        });
        
      }).catch(function (error) {
        // if there's an error, log it
        console.log(error);
      }).finally(()=> setLoading(false));
    }
      
      

  }, [retreive,state]);

    
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
                  <Text style={styles.title_header}>My events</Text>
                  <View style={styles.infoView}>
                  <Image style={styles.profilImage} source={{uri: userInfo[0].photo ? userInfo[0].photo : "https://cdn-icons-png.flaticon.com/128/1946/1946429.png"}}/>
                  </View>
            </View>
            <View style={styles.body}>
              <ScrollView style={[{marginBottom:tabBarHeight*2}]}>
                <View style={[styles.notif_buble, {display: notifVisible? "flex": "none"}]}>
                <TouchableOpacity style={styles.container_icon} onPress={()=>{navigation.navigate("Notifications"); setNotifVisible(false)}}>
                          <Ionicons
                            name="notifications"
                            size={30}
                            color={COLORS.white}
                          />
                    </TouchableOpacity>
                </View>
                  <View style={styles.locationView}>
                        <Text style={styles.text_header}> Lyon </Text>
                        <MaterialCommunityIcons name="map-marker" color={colorText} size={24}/>
                  </View>
                    <View style={styles.contentContainer}>
                            <View style={styles.events}>
                                <View style={[styles.categorieEvents,{flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', marginTop:10}]}>
                                    <Text style={[styles.title_body]}>Upcoming Events</Text>
                                    <TouchableOpacity style={{marginRight: 20, marginTop:5}} onPress={()=>{navigation.navigate("Create event", {navigation: navigation})}}>
                                      <Entypo name="circle-with-plus" size={30} color={COLORS.lightBlue}/>
                                    </TouchableOpacity>
                                </View> 
                                <Text style={[styles.text_body]}>Participation</Text>
                                <MyCarousel data={comingEvents} type={{"event":"oui"}} navigation={navigation}/>   
                                <Text style={[styles.text_body]}>Organisation</Text>
                                <MyCarousel data={comingCreatEve} type={{"event":"oui"}} navigation={navigation}/>            
                            </View>
                            <View style={styles.events}>
                                <View style={styles.categorieEvents}>
                                    <Text style={[styles.title_body]}>Historic</Text>
                                </View>  
                                <Text style={[styles.text_body]}>Participation</Text>
                                <MyCarousel data={historic} type={{"event":"oui"}} navigation={navigation}/>   
                                <Text style={[styles.text_body]}>Organisation</Text>
                                <MyCarousel data={historicCreatEve} type={{"event":"oui"}} navigation={navigation}/> 

                            </View>
                            <View style={styles.events}>
                                <View style={styles.categorieEvents}>
                                    <Text style={[styles.title_body]}>Favorites Events</Text>
                                </View>  
                                <MyCarousel data={favorites} type={{"event":"oui"}} navigation={navigation}/>             
                            </View>
                    </View>
                    
              </ScrollView>
            </View>
            
            </View>)}           
        </SafeAreaView>
    );}

    
}

/*

<View style={styles.events}>
                            <View style={styles.categorieEvents}>
                                <Text style={styles.title_header}>Popular</Text>
                                <MaterialCommunityIcons name="fire" color={COLORS.greyBlue} size={26}/>
                            </View>  
                            <MyCarousel data={popularEvents} type={{"event":"oui"}}/>                  
                        </View>
*/
const windowHeight = Dimensions.get("window").height;


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
  title_header: {
    color: COLORS.greyBlue,
    fontSize:25,
    fontFamily: 'Montserrat_600SemiBold'
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
    width:'100%',
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 10
  },
  text_header: {
    fontSize: 20,
    fontFamily: 'Montserrat_400Regular',
    color: colorText
  },
  body: {
    backgroundColor: colorBack,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
    
  },
  contentContainer:{
    flexDirection: "column",
    paddingTop:5,
    height: "100%",
  },
  title_body: {
    color: colorText,
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 23
  },
  text_body:{
    color: colorText,
    fontFamily: "Montserrat_400Regular",
    fontSize: 19,
    marginBottom: 5
  },
  events: {
    flexDirection: "column",
    marginBottom: 20,
  },
  categorieEvents: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
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

 