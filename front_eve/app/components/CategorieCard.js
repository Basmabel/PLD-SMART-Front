import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"
import {COLORS} from '../config/colors.js';

export const SLIDER_W = Dimensions.get('window').width
export const ITEM_W = Math.round(SLIDER_W * 0.3)
export const ITEM_H= Math.round(ITEM_W*0.3)

const CategorieCard= ({ item, index }) => {
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
      backgroundColor: colorBack,
      height: ITEM_H,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 10,
      padding: 5,
      marginHorizontal:5
    },
    containerIcon:{
      width: ITEM_H,
      height:ITEM_H,
      justifyContent: 'center',
      alignItems: 'center'
    },
    image: {
      width: "75%",
      height: "75%",
    },
    name:{
      
      color: COLORS.black,
      fontSize:15,
      paddingLeft: 10
    }
  })

  return (
    <View style={styles.container} key={index}>
        <View style={styles.containerIcon}>
            <Image
                source={{uri: item.img}}
                style={styles.image}
            />
        </View>  
        <Text style={styles.name}>{item.description}</Text>    
    </View>
  )

  
}


export default CategorieCard
