import React, {useEffect} from "react";
import{ StyleSheet, Dimensions, Text, View, Image,SafeAreaView, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from '../config/colors.js';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CarouselCard from '../components/CarouselCard';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {useFonts} from "@expo-google-fonts/dev";
import AppLoading from "expo-app-loading";
import { 
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold
} from '@expo-google-fonts/dev'
import Spinner from 'react-native-loading-spinner-overlay';



const windowHeight = Dimensions.get("window").height;

var light = "dark"
var colorBack= COLORS.greyBlue
var colorText=COLORS.lightBlue

if(light==="light"){
  colorBack=COLORS.white
  colorText=COLORS.greyBlue
}

export default function EventPerCategoryScreen({route}) {
   const [userInfo, setUserInfo] = React.useState(null);
   const [isLoading, setLoading] = React.useState(true);
   const [eventPerCat, setEventPerCat] = React.useState([]);
   const [retreive, setRetreive] = React.useState(false);
   const [userId, setUserId] = React.useState("")
   const [userToken, setUserToken] = React.useState("")
   const {cat_id}=route.params;

  

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
        fetch('http://192.168.1.107:3000/getUserInfo',{
          method: "POST",
          headers: {'content-type': 'application/json',Authorization: 'bearer '+ userToken},
          body: JSON.stringify({
            "id":userId
          })}),
        fetch('http://192.168.1.107:3000/getEventByCategory',{
            method: "POST",
            headers: {'content-type': 'application/json',userToken},
            body: JSON.stringify({
              "id":cat_id
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
            setEventPerCat(item);
          }
            
        });
      }).catch(function (error) {
        // if there's an error, log it
        console.log(error);
      }).finally(()=> setLoading(false));
    }
      
      

  }, [retreive]);      
    
  const DisplayEvents=()=>{
    
    const listEvents = eventPerCat.map((item)=>
    
        <View style={styles.events}>
                       <View style={styles.card}>
                                <CarouselCard item={item} type={{"type":"category"}}/>
                       </View>                 
        </View>
    );
    if(!fontsLoaded){
      return(<AppLoading/>)
    }else{
      return(
        <View>{listEvents}</View>
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
                  <Text style={styles.title_header}>{eventPerCat[0].description}</Text>
                  <View style={styles.infoView}>
                      <Image style={styles.profilImage} source={{uri: userInfo[0].photo ? userInfo[0].photo : "https://cdn-icons-png.flaticon.com/128/1946/1946429.png"}}/>
                  </View>
            </View>
            <View style={styles.body}>
              <ScrollView style={{marginBottom:110}}>
                
                  <View style={styles.locationView}>
                        <Text style={styles.text_header}> Lyon </Text>
                        <MaterialCommunityIcons name="map-marker" color={colorText} size={24}/>
                  </View>
                    <View style={styles.contentContainer}>
                            <DisplayEvents/>
                    </View>
                
              </ScrollView>
            </View>
            
            </View>)}           
        </SafeAreaView>
    );}

    
}



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
    height:Dimensions.get("window").height
    
  },
  contentContainer:{
    flexDirection: "column",
    paddingTop:10,
    height: "100%",
  },
  card:{
    alignItems: 'center',
    width:'100%',
    paddingBottom:20
  }
  
});

 