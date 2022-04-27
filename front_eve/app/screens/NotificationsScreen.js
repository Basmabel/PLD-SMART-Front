import React, {useEffect} from "react";
import{ StyleSheet, Dimensions, Text, View, Image,SafeAreaView, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from '../config/colors.js';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {useFonts} from "@expo-google-fonts/dev";
import AppLoading from "expo-app-loading";
import { 
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold
} from '@expo-google-fonts/dev';
import Spinner from 'react-native-loading-spinner-overlay';

var light = "dark"
var colorBack= COLORS.greyBlue
var colorText=COLORS.lightBlue

if(light==="light"){
  colorBack=COLORS.white
  colorText=COLORS.greyBlue
}

export default function HomePageScreen() {

   const [userInfo, setUserInfo] = React.useState(null);
   const [isLoading, setLoading] = React.useState(true);
   const [categories,setCategories] = React.useState(null)
   const [retreive, setRetreive] = React.useState(false);
   const [userId, setUserId] = React.useState("")
   const [userToken, setUserToken] = React.useState("")
   const [image,setImage] = React.useState("")
   const [notifContent, setNotifContent] =React.useState(null)

  

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

   const returnImg = (type, photoUser, photoEvent) =>{
    if(type===1 || type===5 || type===8 || type===9 || type===11){
        if(photoUser==="0"){
            return "https://cdn-icons-png.flaticon.com/128/1946/1946429.png"
        }else{
            return photoUser
        }
    }else if(type===6 || type===7){
        return "https://thumbs.dreamstime.com/b/generic-warning-20896820.jpg"
    }else{
        if(photoEvent==="0"){
            return "data:image/png;base64,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"
        }else{
            return photoEvent
        }
    }
   }

   const returnText = (type, userName, eventName, content,review)=>{
        if(type===1 || type===8 || type===9){
            return userName+" "+content+ " "+eventName
        }else if(type===2 || type===3 || type===4){
            return content +" "+eventName
        }else if(type===5){
            return content + " " + userName
        }else if(type===6 || type===7){
            return content
        }else if(type===10 || type===12){
            return eventName + " "+content
        }else if(type===11){
            return userName + " " + content
        }
   }

   const ReturnReview = ({review})=>{
       if(review!="0"){
           return (<View style={{flexDirection:"row", width:"90%"}}>
                        <Text style={[styles.text_notif , {flex:1}]} numberOfLines={1} ellipsizeMode='tail'> {review}</Text>
                    </View>)
       }else{
           return(<View></View>)
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
    //'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTY1MDA1MDU1NiwiZXhwIjoxNjUwMDYxMzU2fQ.WGMvctVy10fkxjI74xpTGil7DPH52pSHmmcNWuqj-dU'
    retreiveData();
    if(retreive){      
      Promise.all([
        fetch('https://eve-back.herokuapp.com/getUserInfo',{
          method: "POST",
          headers: {'content-type': 'application/json',Authorization: 'bearer '+ userToken},
          body: JSON.stringify({
            "id":userId
          })}),
          fetch('http://169.254.3.246:3000/getNotifications',{
          method: "POST",
          headers: {'content-type': 'application/json'},
          body: JSON.stringify({
            "id":userId
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
          if(index==0){
            setUserInfo(item)
          }else if(index==1){
            setNotifContent(item)
            
            console.log(item)
          }
            
        });
      }).catch(function (error) {
        // if there's an error, log it
        console.log(error);
      }).finally(()=> setLoading(false));
    }
      

  }, [retreive]);

  const DisplayNotif=()=>{
    const listNotif = notifContent.map((item)=>
        
        <View style={styles.notification}>
                <Image source={{uri: returnImg(item.type_id,item.userPhoto,item.event_photo)}} style={styles.profil}/>
                <View style={styles.contentNotif}>
                    <View style={{flexDirection:"row", width:"90%"}}>
                        <Text style={[styles.text_notif]} numberOfLines={2} ellipsizeMode="middle">{returnText(item.type_id, item.surname, item.event_name, item.type)}</Text>
                    </View>
                    <ReturnReview review={item.review  }/>                
                    
                    <Text style={styles.date}>25 Apr 2022</Text>
                </View>
        </View>
    );
    if(!fontsLoaded){
      return(<AppLoading/>)
    }else{
      return(
        <View>{listNotif}</View>
      );
    }
    
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
                  <Text style={styles.title_header}>Home</Text>
                  <View style={styles.infoView}>
                  <Image style={styles.profilImage} source={{uri: userInfo[0].photo ? userInfo[0].photo : "https://cdn-icons-png.flaticon.com/128/1946/1946429.png"}}/>
                  </View>
            </View>
            <View style={styles.body}>
              <ScrollView style={[{marginBottom:200}]}>
                  <View style={styles.locationView}>
                        <Text style={styles.text_header}> Lyon </Text>
                        <MaterialCommunityIcons name="map-marker" color={colorText} size={24}/>
                  </View>
                    <View style={styles.contentContainer}>

                        <DisplayNotif/>
                           
                    </View>
              </ScrollView>
            </View>
            
            </View>)}           
        </SafeAreaView>
    );}

    
}


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
  notification:{
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius:10,
    padding: 10,
    marginTop: 10,
    height:75,
    alignItems: 'center'
  },
  profil:{
    width:40,
    height:40,
    borderRadius:20,
    marginRight: 20
  },
  contentNotif:{
      flexDirection: "column"
  },
  text_notif:{
      fontFamily: "Montserrat_600SemiBold",
      fontSize: 14,
      width:'100%'
  },
  date:{
      fontFamily: "Montserrat_600SemiBold",
      fontSize: 13,
      color: COLORS.grey
  }
});

 