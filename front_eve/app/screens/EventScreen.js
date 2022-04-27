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
import { Padding } from "@mui/icons-material";
import { FlatList } from "native-base";

//Retreive Data of the Event

export default function EventScreen() {

  const [isLoading, setLoading] = React.useState(true);
  const [retreive, setRetreive] = React.useState(false);
  const [userId, setUserId] = React.useState("")
  const [userToken, setUserToken] = React.useState("")
  const [notifParticipant, setNotifParticipant] = React.useState(null)
  const [infoEvent, setInfoEvent] = React.useState([])
  const [participation, setParticipation] = React.useState("");

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
        fetch('https://eve-back.herokuapp.com/getEventInfo',{
          method: "POST",
          headers: {'content-type': 'application/json'},
          body: JSON.stringify({"id":eventId })
        }),
        fetch('https://eve-back.herokuapp.com/getEventParticipants',{
          method: "POST",
          headers: {'content-type': 'application/json'},
          body: JSON.stringify({"id":eventId })
        })
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
            setInfoEvent(item)
          }else if(index==1){
            setParticipation(item)
          }             
        });
      }).catch(function (error) {
        // if there's an error, log it
        console.log(error);
      }).finally(()=> setLoading(false));
    }
  }, [retreive]);

  const generate_non_participant_page = () =>{

    const DATA = []
    infoEvent[5].forEach(element => {
      DATA.push({key:element})
    });

    const participation_demand = () => {}

    return (
      <SafeAreaView style={StyleSheet.container}>
          <View >
              <Image style = {styles.image} source={{uri: infoEvent[1]}}/>
          </View>
          <View>
              <Text style = {styles.title_header}> {infoEvent[0]} </Text>
              <Text style = {styles.regular_text}> {infoEvent[2]} </Text>
              <Image style = {styles.profilImage} source={{uri: infoEvent[3]}}/>
          </View>            
          <View style = {styles.content}>
            <FlatList
              data = {DATA}
              renderItem={({item})=><Text style = {styles.regular_text}>{item.key}</Text>}
            />
            <Text style = {styles.title_section}>Description</Text>
            <Text style = {styles.regular_text}>{infoEvent[1]}</Text>
            
            <View style = {styles.button}>
              {/* <Button title="Participate!" onPress={()=>console.log("lemme participate")}/> */}
              {/*the status id of a participant is 3, on press the request is sent and the button becomes unvalid
              ={()=>{
                  const sendInputPhoneNumber = (inputText) => {setuserInfo({ ...userInfo,phoneNumber: inputText,});
                  setVisiblePhoneNumber(false); } 
                  }
                }
              
              */}
              <Button title = "Participate!" onPress={()=>participation_demand()}/>
            </View>
          </View>
      </SafeAreaView>

    )
  }

  const generate_participant_page = () =>{
    const DATA = []
    infoEvent[5].forEach(element => {
      DATA.push({key:element})
    });

    const withdrawal_demand = () => {}

    return(      
      //add the full adress and place
      //add list of other paticipants
    <SafeAreaView style={StyleSheet.container}>
      <View >
          <Image style = {styles.image} source={{uri: infoEvent[1]}}/>
      </View>
      <View>
          <Text style = {styles.title_header}> {infoEvent[0]} </Text>
          <Text style = {styles.regular_text}> {infoEvent[2]} </Text>
          <Image style = {styles.profilImage} source={{uri: infoEvent[3]}}/>
      </View>            
      <View style = {styles.content}>
        <FlatList
          data = {DATA}
          renderItem={({item})=><Text style = {styles.regular_text}>{item.key}</Text>}
        />
        <Text style = {styles.title_section}>Description</Text>
        <Text style = {styles.regular_text}>{infoEvent[1]}</Text>
        
        <View style = {styles.button}>
          <Button title = "Withdraw" onPress={()=>withdrawal_demand()}/>
        </View>
      </View>
  </SafeAreaView>)
  }

  const generate_organizer_page = () =>{
        //Edit functions
    const editTitle= () => {setVisibleTitle(true);}
    const editImage= () => {setVisibleImage(true);}
    const editMaxCapacity= () => {setVisibleMaxCapacity(true);}
    const editCity= () => {setVisibleCity(true);}
    const editPlace= () => {setVisiblePlace(true);}
    const editAdress= () => {setVisibleAdress(true);}
    const editDescription= () => {setVisibleDescription(true);}

    //Dialog Visibility
    const [visibleTitle, setVisibleTitle] = useState(false);
    const [visibleImage, setVisibleImage] = useState(false);
    const [visibleMaxCapacity, setVisibleMaxCapacity] = useState(false);
    const [visibleCity, setVisibleCity] = useState(false);
    const [visiblePlace, setVisiblePlace] = useState(false);
    const [visibleAdress, setVisibleAdress] = useState(false);
    const [visibleDescription, setVisibleDescription] = useState(false);

    //Writing data

    const sendInputTitle = (inputText) => {setInfoEvent({ ...infoEvent,name: inputText,});
    setVisibleTitle(false);
    };
    const sendInputImage = (inputText) => {setInfoEvent({ ...infoEvent,image: inputText,});
    setVisibleImage(false);
    };
    const sendInputMaxCapacity = (inputText) => {setInfoEvent({ ...infoEvent,maxcap: inputText,});
    setVisibleMaxCapacity(false);
    };
    const sendInputCity = (inputText) => {setInfoEvent({ ...infoEvent,city: inputText,});
    setVisibleCity(false);
    };
    const sendInputPlace = (inputText) => {setInfoEvent({ ...infoEvent,place: inputText,});
    setVisiblePlace(false);
    };
    const sendInputAdress = (inputText) => {setInfoEvent({ ...infoEvent,adress: inputText,});
    setVisibleAdress(false);
    };
    const sendInputDescription = (inputText) => {setInfoEvent({ ...infoEvent,description: inputText,});
    setVisibleDescrition(false);
    };

    ////////////////////////////////
    const DATA = []
    infoEvent[5].forEach(element => {
      DATA.push({key:element})
    });

    const MEMBERS = []
    participation.forEach(element =>{
      MEMBERS.push({userid : element[0],
                    user_name : element[1],
                    user_surname : element[2]})
    });

    const delete_participant = () =>{}

    return(
      <SafeAreaView style={StyleSheet.container}>
          <View >
              <Image style = {styles.image} source={{uri: infoEvent[1]}}/>
          </View>
          <View>
              <Text style = {styles.title_header}> {infoEvent[0]} </Text>
              <Text style = {styles.regular_text}> {infoEvent[2]} </Text>
              <Image style = {styles.profilImage} source={{uri: infoEvent[3]}}/>
          </View>            
          <View style = {styles.content}>
            <FlatList
              data = {DATA}
              renderItem={({item})=><Text style = {styles.regular_text}>{item.key}</Text>}
            />
            <Text style = {styles.title_section}>Description</Text>
            <Text style = {styles.regular_text}>{infoEvent[1]}</Text>
            <FlatList
              members = {MEMBERS}
              renderItem={({item})=><View><Text style={styles.regular_text}>{item.user_name} {item.user_surname}</Text>
                                    <Button title="X" onPress={()=>{delete_participant()}}/></View>
                                  }
              />
            <View style = {styles.button}>
              <Button title = "Delete Event" onPress={()=>delete_event()}/>
            </View>
          </View>
      </SafeAreaView>
    )
  }

  if (userId == creatorId){
    return generate_organizer_page();
    //the condition is wrong to check 
  }else if(participation.includes(userId)){
    return  generate_participant_page();
  }else{
    return generate_non_participant_page();
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.purple
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
  infoView: {
    flexDirection: "column",
    alignItems: "center",
  },
  image : {
    paddingTop : 20,
    paddingBottom : 20,
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
  }
});