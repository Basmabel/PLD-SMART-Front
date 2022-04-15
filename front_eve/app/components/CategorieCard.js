import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"
import {COLORS} from '../config/colors.js';

export const SLIDER_W = Dimensions.get('window').width
export const ITEM_W = Math.round(SLIDER_W * 0.3)
export const ITEM_H= Math.round(ITEM_W*1.2)

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
      width: ITEM_W,
      height: ITEM_H,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      alignItems: 'center'
    },
    containerIcon:{
      backgroundColor: colorBack,
      borderRadius: 10,
      width: ITEM_W,
      height:ITEM_W,
      justifyContent: 'center',
      alignItems: 'center'
    },
    image: {
      width: "75%",
      height: "75%",
    },
    name:{
      fontSize:18,
      fontWeight:'bold',
      color:COLORS.greyBlue,
      textTransform: 'uppercase'
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
