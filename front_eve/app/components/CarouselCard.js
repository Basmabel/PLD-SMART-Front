import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native"
import { Colors } from 'react-native-paper';
import { COLORS } from '../config/colors.js';
import { format } from "date-fns";
import { Montserrat_600SemiBold } from '@expo-google-fonts/dev';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import formatageDate from '../utils/date_formatage';
import { useNavigation } from '@react-navigation/native';

export const SLIDER_WIDTH = Dimensions.get('window').width
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.75)
export const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 1)

var light = "dark"
var colorShadow = COLORS.white

if (light === "light") {
  colorShadow = COLORS.black
}

const CarouselCard = ({ item, index, navigation, type }) => {

  if (type === undefined) {
    type = { "type": "nan" }
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.white,
      borderRadius: (type.type === "category") ? 0 : 10,
      width: (type.type === "category") ? '100%' : ITEM_WIDTH,
      height: ITEM_HEIGHT,
      paddingBottom: 40,
      ...Platform.select({
        ios: {
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
        },
        android: {
          elevation: 5
        }
      }),
      shadowColor: colorShadow,
      margin: 5
    },
    containerImage: {
      borderRadius: (type.type === "category") ? 0 : 10,
      width: (type.type === "category") ? '100%' : ITEM_WIDTH,
      height: '75%',
      marginBottom: 10
    },
    image: {
      width: '100%',
      height: '100%',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 10,
      paddingRight: 20,
      paddingBottom: 5
    },
    body: {
      flexDirection: 'column',
      paddingLeft: 10,
      paddingRight: 20,
    },
    name: {
      color: COLORS.greyBlue,
      fontSize: 20,
      fontWeight: "bold",
      fontFamily: 'Montserrat_600SemiBold'
    },
    profil: {
      width: 34,
      height: 34,
      borderRadius: 100
    },
    infos: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 5
    },
    date: {
      color: COLORS.lightGrey,
      fontSize: 15,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      paddingLeft: 5
    },
    place: {
      color: COLORS.mauve,
      fontSize: 18,
      fontWeight: 'bold'
    }
  })


  var formattedDate = formatageDate(item.date_timestamp);

  var isImage = true;
  if (item.ImageProfil == "") {
    isImage = false;
  }



  return (
    <View style={styles.container} key={index}>
      <TouchableOpacity style={styles.containerImage} onPress={() => { navigation.navigate("Event", { event_id: item.event_id }) }}>
        <Image
          source={{ uri: item.ImageEvent }}
          style={styles.image}
        />
      </TouchableOpacity>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.navigate("Event", { event_id: item.event_id }) }}>
          <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile user", { profile_id: item.CreatorId })}>
          <Image source={{ uri: isImage ? item.ImageProfil : "https://cdn-icons-png.flaticon.com/128/1946/1946429.png" }} style={styles.profil} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.body} onPress={() => { navigation.navigate("Event", { event_id: item.event_id }) }}>
        <View style={styles.infos}>
          <Entypo name="clock" size={15} color={COLORS.lightGrey} />
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
        <View style={styles.infos}>
          <MaterialCommunityIcons name="map-marker" size={15} color={COLORS.lightGrey} />
          <Text style={styles.date}>{item.place}</Text>
        </View>


      </TouchableOpacity>

    </View>
  )
}


export default CarouselCard 
