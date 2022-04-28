import React, {useEffect} from "react";
import{ StyleSheet, Dimensions, Text, TextInput, View, Image, SafeAreaView, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from '../config/colors.js';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MyCarousel from '../components/MyCarousel';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {useFonts} from "@expo-google-fonts/dev";
import AppLoading from "expo-app-loading";
import { 
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold
} from '@expo-google-fonts/dev'

var light = "dark"
var colorBack= COLORS.greyBlue
var colorText=COLORS.lightBlue

if(light==="light"){
  colorBack=COLORS.white
  colorText=COLORS.greyBlue
}

const CreateEventScreen = ({ navigation }) => {
    //TODO : mettre un lien avec la page vue événement en mode admin
    //const goToEvent = () => navigation.navigate("Create");

    return (
        <View>
            <View style={styles.header}>
                  <Text style={styles.title_header}>Create Event</Text>
            </View>
            <View style={styles.body}>
              <ScrollView style={[{marginBottom:tabBarHeight*2}]}>
                    <View style={styles.contentContainer}>
                        <Text
                            style={[
                                styles.text_footer,
                                {
                                color: COLORS.lightBlue,
                                },
                            ]}
                            >
                            Title
                        </Text>
                        <View style={styles.action}>
                            <FontAwesome color={COLORS.lightBlue} size={20} />
                            <TextInput
                                placeholder="The name of your event"
                                placeholderTextColor={COLORS.lightBlue}
                                style={[
                                styles.textInput,
                                {
                                    color: COLORS.lightBlue,
                                },
                                ]}
                                autoCapitalize="none"
                            />
                        </View>
                        <Text
                            style={[
                                styles.text_footer,
                                {
                                color: COLORS.lightBlue,
                                marginTop: 35,
                                },
                            ]}
                            >
                            Date
                        </Text>
                        <View style={styles.action}>
                            <FontAwesome color={COLORS.lightBlue} size={20} />
                            <TextInput
                                placeholder="dd/mm/yyyy"
                                placeholderTextColor={COLORS.lightBlue}
                                style={[
                                styles.textInput,
                                {
                                    color: COLORS.lightBlue,
                                },
                                ]}
                                autoCapitalize="none"
                            />
                        </View>
                        <Text
                            style={[
                                styles.text_footer,
                                {
                                color: COLORS.lightBlue,
                                marginTop: 35,
                                },
                            ]}
                            >
                            Number of participants
                        </Text>
                        <View style={styles.action}>
                            <FontAwesome color={COLORS.lightBlue} size={20} />
                            <TextInput
                                placeholder="Number"
                                placeholderTextColor={COLORS.lightBlue}
                                style={[
                                styles.textInput,
                                {
                                    color: COLORS.lightBlue,
                                },
                                ]}
                                autoCapitalize="none"
                            />
                        </View>
                        <Text
                            style={[
                                styles.text_footer,
                                {
                                color: COLORS.lightBlue,
                                marginTop: 35,
                                },
                            ]}
                            >
                            Address
                        </Text>
                        <View style={styles.action}>
                            <FontAwesome color={COLORS.lightBlue} size={20} />
                            <TextInput
                                placeholder="Your event's location"
                                placeholderTextColor={COLORS.lightBlue}
                                style={[
                                styles.textInput,
                                {
                                    color: COLORS.lightBlue,
                                },
                                ]}
                                autoCapitalize="none"
                            />
                        </View>
                        <Text
                            style={[
                                styles.text_footer,
                                {
                                color: COLORS.lightBlue,
                                marginTop: 35,
                                },
                            ]}
                            >
                            Type of activity
                        </Text>
                        <View style={styles.action}>
                            <FontAwesome color={COLORS.lightBlue} size={20} />
                            <TextInput
                                placeholder="Enter a type"
                                placeholderTextColor={COLORS.lightBlue}
                                style={[
                                styles.textInput,
                                {
                                    color: COLORS.lightBlue,
                                },
                                ]}
                                autoCapitalize="none"
                            />
                        </View>
                        <Text
                            style={[
                                styles.text_footer,
                                {
                                color: COLORS.lightBlue,
                                marginTop: 35,
                                },
                            ]}
                            >
                            Project Description
                        </Text>
                        <View style={styles.action}>
                            <FontAwesome color={COLORS.lightBlue} size={20} />
                            <TextInput
                                placeholder="Write a description of your event"
                                placeholderTextColor={COLORS.lightBlue}
                                style={[
                                styles.textInput,
                                {
                                    color: COLORS.lightBlue,
                                },
                                ]}
                                autoCapitalize="none"
                            />
                        </View>
                    </View>
              </ScrollView>
            </View>      
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: COLORS.beige,
      shadowColor: "#000",
      shadowOpacity: 0.9,
      shadowRadius: 7,
      borderRadius: 10,
     // flex:1
    },
    title_header: {
      color: COLORS.greyBlue,
      fontSize:25,
      fontFamily: 'Montserrat_600SemiBold'
    },
    infoView: {
      flexDirection: "column",
      alignItems: "center",
    },
    text_header: {
      fontSize: 20,
      fontFamily: 'Montserrat_400Regular',
      color: colorText
    },
    body: {
      backgroundColor: colorBack,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 20,
      
    },
    contentContainer:{
      flexDirection: "column",
      paddingTop:5,
      height: "100%",
    },
    title_body: {
      color: colorText,
      fontFamily: 'Montserrat_600SemiBold',
      fontSize: 23
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === "ios" ? 0 : -12,
        padding: 10,
        borderColor: COLORS.beige,
        borderRadius: 10,
        borderWidth: 1,
    },
    button: {
        alignItems: "center",
        marginTop: 50,
    },
  });