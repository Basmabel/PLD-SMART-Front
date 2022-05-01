
import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, Platform,TouchableOpacity } from "react-native"
import {COLORS} from '../config/colors.js';



const AddressComponent= ({city,address,latitude,longitude,font}) => {

  const styles = StyleSheet.create({
    container: {
      flex:1,
      width: '100%',
      marginTop: 10
    },
    text:{
        color: COLORS.lightBlue,
        fontSize: 15,
        fontFamily:  font
    }
  })


    return (
      <View style={styles.container} >
          <Text style={styles.text}>{address}</Text>   
          <Text style={styles.text}>{city}</Text>    
      </View>
    )
  
  

  
}


export default AddressComponent
