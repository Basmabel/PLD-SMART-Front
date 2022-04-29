
import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, Platform,TouchableOpacity } from "react-native"
import {COLORS} from '../config/colors.js';
import StarRating from '../components/StarRating';


var light = "dark"
var colorShadow= COLORS.white

if(light==="light"){
  colorShadow=COLORS.black
}



const ReviewCard= ({ item, index, width, navigation}) => {
  const height = width*0.5;

  var colorBack="";
  if(index%3===0){
      colorBack=COLORS.lightMauve;
  }else if(index%3===1){
      colorBack=COLORS.lightBlue;
  }else{
      colorBack=COLORS.lightYellow;
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: COLORS.white,
      height: height,
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
      borderRadius: 10,
      padding: 15,
      margin:10
    },
    header:{
        flex: 0.25,
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    profil:{
      width:34,
      height:34,
      borderRadius:17
    },
    infos:{
        paddingLeft: 10,
    },
    text_header:{
        fontSize:15
    },
    title_header:{
        fontSize:20,
        fontWeight: 'bold'
    },
    body:{
        flex: 0.75,
        marginTop: 15
    },
    text_body:{
        marginTop: 5
    }
   
  })

  
  var isImage = true;
  if(item.photo==""){
    isImage=false;
  }
    return (
      <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={()=> navigation.navigate("Profile user",{profile_id:item.creator_id})}>
                   <Image source={{uri: isImage? item.photo : "https://cdn-icons-png.flaticon.com/128/1946/1946429.png"}} style={styles.profil} />
                </TouchableOpacity>
                <View style={styles.infos}>
                    <Text style={styles.title_header}>{item.name} {item.surname}</Text>
                    <Text style={styles.text_header}>{item.event_name}</Text>
                </View>
                
            </View>
            <View style={styles.body}>
            <StarRating style={styles.ratings} ratings={item.score} reviews={item.score} color={COLORS.midnightBlue} />
            <Text style={styles.text_body}>{item.review}</Text>
            </View>
      </View>

      
    )
  
  

  
}


export default ReviewCard
