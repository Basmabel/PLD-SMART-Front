import React, {useEffect} from "react";
import{ StyleSheet, Dimensions, Text, View, Image,SafeAreaView, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from '../config/colors.js';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Column } from 'native-base';
import MyCarousel from '../components/MyCarousel';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';


/*const popEvents = [
    {
      name: "Aenean leo",
      date: "5 march 2020",
      place: "Charpennes",
      imgUrl: "https://picsum.photos/id/11/200/300",
      imgProfil: "https://picsum.photos/id/11/200/300"
    },
    {
      name: "Aenean leo",
      date: "5 march 2020",
      place: "Charpennes",
      imgUrl: "https://picsum.photos/id/11/200/300",
      imgProfil: "https://picsum.photos/id/11/200/300"
    },
    {
      name: "Aenean leo",
      date: "5 march 2020",
      place: "Charpennes",
      imgUrl: "https://picsum.photos/id/11/200/300",
      imgProfil: "https://picsum.photos/id/11/200/300"
    }
  ];*/

const userInfo = {
  name: "Coco",
  imgProfil: "https://picsum.photos/200/300",
};

const categorie = [
  {
    name: "party",
    imgUrl: "https://cdn-icons-png.flaticon.com/128/3058/3058890.png",
  },
  {
    name: "party",
    imgUrl: "https://cdn-icons-png.flaticon.com/128/3058/3058890.png",
  },
  {
    name: "party",
    imgUrl: "https://cdn-icons-png.flaticon.com/128/3058/3058890.png",
  },
  {
    name: "party",
    imgUrl: "https://cdn-icons-png.flaticon.com/128/3058/3058890.png",
  },
  {
    name: "party",
    imgUrl: "https://cdn-icons-png.flaticon.com/128/3058/3058890.png",
  },
];
export default function HomePageScreen() {
  const tabBarHeight = useBottomTabBarHeight() * 2;

   const [popularEvents,setPopularEvents] = React.useState([]);
   const [userInfo, setUserInfo] = React.useState(null);
   const [isLoading, setLoading] = React.useState(true);
   const [categories,setCategories] = React.useState(null)
   const [eventPerCat, setEventPerCat] = React.useState([]);
   const [retreive, setRetreive] = React.useState(false);
   const [userId, setUserId] = React.useState("")
   const [userToken, setUserToken] = React.useState("")
   /*const getUserId = async() =>{
      try {
        if (value !== null) {
          setUser(value)
        }
      } catch (error) {
        console.log(error)
      }
   }

  const someHandler = async () =>{
    await getUserId();
    setRetreive(true);
  }
  */
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
      console.log(userId)
      console.log(userToken)
      Promise.all([
        fetch('http://169.254.3.246:3000/getPopular'),
        fetch('http://169.254.3.246:3000/getUserInfo',{
          method: "POST",
          headers: {'content-type': 'application/json',Authorization: 'bearer '+ userToken},
          body: JSON.stringify({
            "id":userId
          })}),
          fetch('http://169.254.3.246:3000/getCategories')
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
            setPopularEvents(item)
          }else if(index==1){
            setUserInfo(item)
          }else if(index==2){
            setCategories(item)
           /* item.map((cat)=>{
                fetch('https://eve-back.herokuapp.com/getEventsByCategory',
                  {method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({
                      "id": cat.id 
                    })
                  }).then((response)=>response.json())
                    .then((json)=>setEventPerCat(oldArray,[...oldArray,json]))
                    .catch((error)=>console.error(error))
            });*/
          }
        });
      }).catch(function (error) {
        // if there's an error, log it
        console.log(error);
      }).finally(()=> setLoading(false));
    }
      
      

  }, [retreive]);

   /* const displayEvents=()=>{
      eventPerCat.map((item,index)=>{
        return(
          <View style={styles.events}>
                          <View style={styles.categorieEvents}>
                              <Text style={styles.title_header}>{categories[index].description}</Text>
                          </View>  
                          <MyCarousel data={item} type={{"event":"oui"}}/>                  
          </View>
        );
      });
    }*/
    

    return(
      
       <SafeAreaView style={StyleSheet.container}>

         {isLoading ? (<Text>Loading...</Text>) :
           ( <View>
           <View style={styles.header}>
                <Text style={styles.title_header}>Hi {userInfo[0].name}!</Text>
                <View style={styles.infoView}>
                    <Image style={styles.profilImage} source={{uri: userInfo[0].photo}}/>
                    <View style={styles.locationView}>
                            <Text style={styles.text_header}> Lyon </Text>
                            <MaterialCommunityIcons name="map-marker" color={COLORS.black} size={24}/>
                    </View>
                </View>
           </View>
           <ScrollView style={{marginBottom:tabBarHeight}}>
                <View style={styles.body}>
                        <View style={styles.events}>
                            <View style={styles.categorieEvents}>
                                <Text style={styles.title_header}>Popular</Text>
                                <MaterialCommunityIcons name="fire" color={COLORS.greyBlue} size={26}/>
                            </View>  
                            <MyCarousel data={popularEvents} type={{"event":"oui"}}/>             
                        </View>
                        <View style={styles.events}>
                            <View style={styles.categorieEvents}>
                                <Text style={styles.title_header}>Catégories</Text>
                                <MaterialCommunityIcons name="bookmark" color={COLORS.greyBlue} size={26}/>
                            </View>  
                            <MyCarousel data={categories} type={{"event":"non"}}/>                  
                        </View>
                        <View style={styles.events}>
                            <View style={styles.categorieEvents}>
                                <Text style={styles.title_header}>Popular</Text>
                                <MaterialCommunityIcons name="fire" color={COLORS.greyBlue} size={26}/>
                            </View>  
                            <MyCarousel data={popularEvents} type={{"event":"oui"}}/>                  
                        </View>
                </View>
           </ScrollView>
           </View>)}           
       </SafeAreaView>
    );
}

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.beige,
  },
  title_header: {
    color: COLORS.greyBlue,
    fontSize: 25,
    fontWeight: "bold",
  },
  infoView: {
    flexDirection: "column",
    alignItems: "center",
  },
  profilImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  locationView: {
    flexDirection: "row",
  },
  text_header: {
    fontSize: 20,
  },
  body: {
    flexDirection: "column",
    padding: 20,
    backgroundColor: COLORS.beige,
    height: "100%",
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
});
