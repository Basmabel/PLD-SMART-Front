import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"
import { Colors } from 'react-native-paper';
import {COLORS} from '../config/colors.js';

export const SLIDER_WIDTH = Dimensions.get('window').width
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.75)
export const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 0.75)

const CarouselCard= ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <Image
        source={{ uri: item.imgUrl }}
        style={styles.image}
      />
       <View style={styles.body}>
         <Text style={styles.name}>{item.name}</Text>
         <Image source={{uri: item.imgProfil}} style={styles.profil}/>
       </View>
      <View style={styles.body}>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.place}>{item.place}</Text>
        
      </View>
      
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65
  },
  image: {
    width: ITEM_WIDTH,
    height: '75%',
  }, 
  body:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft:20,
    paddingRight:20,
    paddingTop:10
  },
  name: {
    color: COLORS.greyBlue,
    fontSize: 20,
    fontWeight: "bold"
  }, 
  profil:{
    width:34,
    height:34,
    borderRadius:17
  },
  date:{
    color: COLORS.mauve,
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  place: {
    color: COLORS.mauve,
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default CarouselCard 
