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

  const [userInfo, setUserInfo] = React.useState(null);
  const [isLoading, setLoading] = React.useState(true);
  const [retreive, setRetreive] = React.useState(false);
  const [userId, setUserId] = React.useState("")
  const [userToken, setUserToken] = React.useState("")
  const [eventTitle, setEventTitle] = React.useState("");
  const [eventImage, setEventImage] = React.useState("");
  const [creatorImage, setcreatorImage] = React.useState("");
  const [creatorName, setcreatorName] = React.useState("");
  const [date, setDate] = React.useState("");
  const [nb_participants, setNbParticipants] = React.useState("");
  const [city, setCity] = React.useState("");
  const [listRules, setListRules] = React.useState([]);
  const [description, setDescription] = React.useState("");
  const [adress, setAdress] = React.useState("");

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
  //Retrieve Data of the User to check wich page to load

  //Retrieve Data of the Event takes the id of Event
  //Data Contains EventTitle, Eventimage, CreatorName, CreatorPic, Date
    // nb_max_people, City, list of rules, Description, Adress
      Promise.all([
        fetch('https://eve-back.herokuapp.com/getEventInfo',{
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
            setEventTitle(item)
          }else if(index==1){
            setEventImage(item)
          }else if(index==2){
            setcreatorName(item)
          } else if(index==3){
            setcreatorImage(item)
          }else if(index==4){
            setDate(item)
          }else if(index==5){
            setNbParticipants(item)
          } else if(index==6){
            setCity(item)
          }else if(index==7){
            setListRules(item)
          }else if(index==8){
            setDescription(item)
          } else if(index==9){
            setAdress(item)
          }                  
        });
      }).catch(function (error) {
        // if there's an error, log it
        console.log(error);
      }).finally(()=> setLoading(false));
    }
      
      

  }, [retreive]);
    }
  
  //Create a Participant Page that is participating

  //Create a Participant Page that is not participating DONE

  //Create a Participant Page that is waiting to be accepted to participate

  //Create an Organizer Page

  const generate_non_participant_page = () =>{

  }

  const generate_participant_page = () =>{

  }

  const generate_organizer_page = () =>{

  }


  return (
    <SafeAreaView style={StyleSheet.container}>
        <View >
            <Image style = {styles.image} source={{uri: "https://picsum.photos/id/11/200/300"}}/>
        </View>
        <View>
            <Text style = {styles.title_header}> Event Title </Text>
            <Text style = {styles.regular_text}> nb personnes </Text>
            <Image style = {styles.profilImage} source={{uri: "https://i.pinimg.com/564x/37/03/e4/3703e4c18098c3fb6c62f452cd5f8412.jpg"}}/>
        </View>            
        <View style = {styles.content}>
          <FlatList
            data = {[{key:'gratuit'}, {key:'pets allowed'}, {key:'no party poopers'}]}
            renderItem={({item})=><Text style = {styles.regular_text}>item.key</Text>}
          />
          <Text style = {styles.title_section}>Description</Text>
          <Text style = {styles.regular_text}>Un texte est une série orale ou écrite de mots 
                                              perçus comme constituant un ensemble cohérent, porteur 
                                              de sens et utilisant les structures propres à une langue 
                                              (conjugaisons, construction et association des phrases…).</Text>
          
          <View style = {styles.button}>
            <Button title="Participate" onPress={()=>console.log("lemme participate")}/>
          </View>
        </View>
    </SafeAreaView>

  )
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