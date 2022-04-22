import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"
import { Colors } from 'react-native-paper';
import {COLORS} from '../config/colors.js';
import { format } from "date-fns";
import { Montserrat_600SemiBold } from '@expo-google-fonts/dev';
import { Entypo } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const SLIDER_WIDTH = Dimensions.get('window').width
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.75)
export const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 1)

var light = "dark"
var colorShadow= COLORS.white

if(light==="light"){
  colorShadow=COLORS.black
}

const CarouselCard= ({ item, index }) => {
  var date = new Date(item.date_timestamp);
  if(date.getMonth()>9 || date.getMonth()<2 || (date.getMonth()==9 && date.getDay()>20) || (date.getMonth()==2 && date.getDay()<=20) ){
    date.setTime( date.getTime() + 60*60*1000+date.getTimezoneOffset()*60*1000);
  }else{
    date.setTime( date.getTime() + 2*60*60*1000+date.getTimezoneOffset()*60*1000);
  }
  
  var isImage = true;
  if(item.ImageProfil==""){
    isImage=false;
  }
  
  var  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  var formattedDate =date.getDate()+" "+months[(date.getMonth())]+". "+ date.getFullYear(); 
  
  return (
    <View style={styles.container} key={index}>
      <Image
        source={{ uri: item.ImageEvent }}
        style={styles.image}
      />
       <View style={styles.header}>
         <Text style={styles.name}>{item.name}</Text>
         <Image source={{uri: isImage? item.ImageProfil : "https://cdn-icons-png.flaticon.com/128/1946/1946429.png"}} style={styles.profil}/>
       </View>
      <View style={styles.body}>
        <View style={styles.infos}>
          <Entypo name="clock" size={15} color={COLORS.lightGrey} />
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
        <View style={styles.infos}>
          <MaterialCommunityIcons name="map-marker" size={15} color={COLORS.lightGrey} />
          <Text style={styles.date}>{item.place}</Text>
        </View>
        
        
      </View>
      
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    paddingBottom: 40,
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
    shadowColor: colorShadow,
    margin:5
  },
  image: {
    width: ITEM_WIDTH,
    height: '75%',
    marginBottom:10
  }, 
  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft:10,
    paddingRight:20,
    paddingBottom:5
  },
  body:{
    flexDirection: 'column',
    paddingLeft:10,
    paddingRight:20,
  },
  name: {
    color: COLORS.greyBlue,
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: 'Montserrat_600SemiBold'
  }, 
  profil:{
    width:34,
    height:34,
    borderRadius:17
  },
  infos:{
    flexDirection:'row',
    alignItems: 'center',
    paddingBottom:5
  },
  date:{
    color: COLORS.lightGrey,
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    paddingLeft:5
  },
  place: {
    color: COLORS.mauve,
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default CarouselCard 
