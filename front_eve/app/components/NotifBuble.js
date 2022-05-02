
import React from 'react'
import { View, StyleSheet} from "react-native"
import {COLORS} from '../config/colors.js';
import { Ionicons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';





const NotifBuble= ({navigation}) => {

  const styles = StyleSheet.create({
    container_icon: {
      backgroundColor: COLORS.red,
      width:40,
      height:40,
      borderRadius:20,
      borderColor: COLORS.black,
      borderWidth:2,
      alignItems:'center',
      justifyContent:'center'
    },
    
  })

  
  
    return (
      <TouchableOpacity style={styles.container_icon} onPress={()=>{navigation.navigate("Notifications"); setNotifVisible(false)}}>
            <Ionicons
              name="notifications"
              size={30}
              color={COLORS.white}
            />
      </TouchableOpacity>      
    )
  
  

  
}


export default NotifBuble
