import React, {useEffect} from "react";
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
import { Button } from "react-native-paper";

//import { Navigation, Padding } from "@mui/icons-material";
import { FlatList } from "native-base";
//import { ColorLensRounded } from "@mui/icons-material";

//Retreive Data of the Event

export default function EventScreen({route}) {

  const [isLoading, setLoading] = React.useState(true);
  const [retreive, setRetreive] = React.useState(false);
  const [userId, setUserId] = React.useState("")
  const [userToken, setUserToken] = React.useState("")
  const [userInfo, setUserInfo] = React.useState(null);
  const [notifParticipant, setNotifParticipant] = React.useState(null)
  const [infoEvent, setInfoEvent] = React.useState([])
  const [participation, setParticipation] = React.useState("");
  const eventId = route.params.eventId
  //const eventId = 2

  var [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold
  });

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
        fetch('http://192.168.56.1:3000/getUserInfo',{
          method: "POST",
          headers: {'content-type': 'application/json',Authorization: 'bearer '+ userToken},
          body: JSON.stringify({
            "id":userId
          })}),
        fetch('http://192.168.56.1:3000/getInfoEvent',{
          method: "POST",
          headers: {'content-type': 'application/json'},
          body: JSON.stringify({"event_id":eventId , "user_id": userId})
        })
        // fetch('http://192.168.56.1:3000/getEventParticipants',{
        //   method: "POST",
        //   headers: {'content-type': 'application/json'},
        //   body: JSON.stringify({"event_id":eventId , "user_id": userId})
        // })
      ]).then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(responses.map(function (response) {
          return response.json();
        }));
      }).then(function (data) {
        // Log the data to the console
        // You would do something with both sets of data here
        data.map((item,index)=>{
          console.log(item)
          if(index==0){
            setUserInfo(item[0])
          }else if(index==1){
            setInfoEvent(item[0])}
          // }else if(index==2){
          //   setParticipation(item[])
          // }             
        });
      }).catch(function (error) {
        // if there's an error, log it
        console.log(error);
      }).finally(()=> setLoading(false));
    }
  }, [retreive]);

  const generate_body = () =>{

    if (userId == creatorId){
      return generate_organizer_page();
      //the condition is wrong to check 
    }else if(participation.includes(userId)){
      return  generate_participant_page();
    }else{
      return generate_non_participant_page();
    }

  }

  // const generate_non_participant_page = () =>{

  //   const DATA = []
  //   infoEvent[5].forEach(element => {
  //     DATA.push({key:element})
  //   });

  //   const participation_demand = () => {}

  //   return (
  //     <SafeAreaView style={StyleSheet.container}>
  //         <View >
  //             <Image style = {styles.image} source={{uri: infoEvent.event_image}}/>
  //         </View>
  //         <View>
  //             <Text style = {styles.title_header}> {infoEvent[0]} </Text>
  //             <Text style = {styles.regular_text}> {infoEvent[2]} </Text>
  //             <Image style = {styles.profilImage} source={{uri: infoEvent[3]}}/>
  //         </View>            
  //         <View style = {styles.content}>
  //           <FlatList
  //             data = {DATA}
  //             renderItem={({item})=><Text style = {styles.regular_text}>{item.key}</Text>}
  //           />
  //           <Text style = {styles.title_section}>Description</Text>
  //           <Text style = {styles.regular_text}>{infoEvent[1]}</Text>
            
  //           <View style = {styles.button}>
  //             {/* <Button title="Participate!" onPress={()=>console.log("lemme participate")}/> */}
  //             {/*the status id of a participant is 3, on press the request is sent and the button becomes unvalid
  //             ={()=>{
  //                 const sendInputPhoneNumber = (inputText) => {setuserInfo({ ...userInfo,phoneNumber: inputText,});
  //                 setVisiblePhoneNumber(false); } 
  //                 }
  //               }
              
  //             */}
  //             <Button title = "Participate!" onPress={()=>participation_demand()}/>
  //           </View>
  //         </View>
  //     </SafeAreaView>

  //   )
  // }

  // const generate_participant_page = () =>{
  //   const DATA = []
  //   infoEvent[5].forEach(element => {
  //     DATA.push({key:element})
  //   });

  //   const withdrawal_demand = () => {}

  //   return(      
  //     //add the full adress and place
  //     //add list of other paticipants
  //   <SafeAreaView style={StyleSheet.container}>
  //     <View >
  //         <Image style = {styles.image} source={{uri: infoEvent[1]}}/>
  //     </View>
  //     <View>
  //         <Text style = {styles.title_header}> {infoEvent[0]} </Text>
  //         <Text style = {styles.regular_text}> {infoEvent[2]} </Text>
  //         <Image style = {styles.profilImage} source={{uri: infoEvent[3]}}/>
  //     </View>            
  //     <View style = {styles.content}>
  //       <FlatList
  //         data = {DATA}
  //         renderItem={({item})=><Text style = {styles.regular_text}>{item.key}</Text>}
  //       />
  //       <Text style = {styles.title_section}>Description</Text>
  //       <Text style = {styles.regular_text}>{infoEvent[1]}</Text>
        
  //       <View style = {styles.button}>
  //         <Button title = "Withdraw" onPress={()=>withdrawal_demand()}/>
  //       </View>
  //     </View>
  // </SafeAreaView>)
  // }

  // const generate_organizer_page = () =>{

  //   const DATA = []
  //   infoEvent.requirements.forEach(element => {
  //     DATA.push({key:element})
  //   });

  //   const MEMBERS = []
  //   participation.forEach(element =>{
  //     MEMBERS.push({userid : element[0],
  //                   user_name : element[1],
  //                   user_surname : element[2]})
  //   });

  //   const delete_participant = () =>{}

  //   return(
  //     <SafeAreaView style={StyleSheet.container}>
  //         <View >
  //             <Image style = {styles.image} source={{uri: infoEvent.image}}/>
  //         </View>
  //         <View>
  //             <Text style = {styles.title_header}> {infoEvent.name} </Text>
  //             <Text style = {styles.regular_text}> {infoEvent.maxcap} </Text>
  //             <Image style = {styles.profilImage} source={{uri: infoEvent.profilImage}}/>
  //         </View>            
  //         <View style = {styles.content}>
  //           <FlatList
  //             data = {DATA}
  //             renderItem={({item})=><Text style = {styles.regular_text}>{item.key}</Text>}
  //           />
  //           <Text style = {styles.title_section}>Description</Text>
  //           <Text style = {styles.regular_text}>{infoEvent[1]}</Text>
  //           <FlatList
  //             members = {MEMBERS}
  //             renderItem={({item})=><View><Text style={styles.regular_text}>{item.user_name} {item.user_surname}</Text>
  //                                   <Button title="X" onPress={()=>{delete_participant()}}/></View>
  //                                 }
  //             />
  //           <View style = {styles.button}>
  //             <Button title = "Delete Event" onPress={()=>delete_event()}/>
  //             <Button title = "Edit Event" onPress={()=>navigation.navigate("EditEvent")}/>
  //           </View>
  //         </View>
  //     </SafeAreaView>
  //   )
  // }


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
                <ScrollView style={[{marginBottom:100}]}>
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
                                <Text style={styles.text_info_event}>{infoEvent.date}</Text>
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
    paddingTop:5,
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
    width: 60,
    height: 60,
    borderRadius: 40,
    right: 5,
    position : 'absolute'
  },
  button: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    borderRadius : 10,
    backgroundColor : '#660066'
  },
  info_event:{
    marginBottom: 10,
    marginTop: 10
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
  container_categorie: {
    backgroundColor: COLORS.white,
    height: 40,
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
    padding: 5,
    margin:5
  },
  containerIcon:{
    width: "25%",
    height: "75%",
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
  }
});