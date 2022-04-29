import { StatusBar } from 'expo-status-bar';
import React, {useState} from "react";
import{ StyleSheet, Text, TextInput, View, Image, Platform, TouchableOpacity, ScrollView, CheckBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from '../config/colors.js';
import {useFonts} from "@expo-google-fonts/dev";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Foundation from "react-native-vector-icons/Foundation";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Feather from "react-native-vector-icons/Feather";
import Fontisto from "react-native-vector-icons/Fontisto";
import * as Animatable from "react-native-animatable";
import {Picker} from '@react-native-picker/picker';

const CreateEventScreenTest = ({ navigation }) => {
    //TODO : put a link with the admin view event page
    //const goToEvent = () => navigation.navigate("Create");
    const [title, onChangeTitle] = React.useState("");
    const [date, onChangeDate] = React.useState("");
    const [participants, onChangeParticipants] = React.useState("");
    const [address, onChangeAddress] = React.useState("");
    const [activity, onChangeActivity] = React.useState("");
    const [description, onChangeDescription] = React.useState("");
    const [data, setData] = React.useState({
        check_textInputChange:false,
        isValidTitle: true,
        isValidDate:true
    });
    const [selectedActivity, setSelectedActivity] = useState();
    const [isSelected, setSelection] = useState(false);

    const valuesNotNul = () =>{
        if(title!="" && date!="" && participants!="" && address!=""){
          return true;
        }else{
          return false;
        }
    }

    const fetchCreateEventVal = async () =>{
        var status=0
        if(data.isValidTitle && data.isValidDate && valuesNotNul()){
          fetch('https://eve-back.herokuapp.com/createevent',
            {method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({"title":title,
                                  "date":date,
                                  "participants":participants,
                                  "address":address,
                                  "activity":activity,
                                  "description":description
                      })
              }).then((response)=>{
                  status = response.status;
                  return response.text()
              }).then(async (json)=>{
                if(status===401 || status===400){
                  alert(json)
                }else{
                  navigation.navigate("SignInScreen");
                }
              }).catch((error)=>console.error(error))
        }else{
          if(!data.isValidTitle){
            alert("The title of yor event is not valid");
          }else if(!data.isValidDate){
            alert("The date when your event will occur is not valid")
          }else if(!valuesNotNul()){
            alert("You didn't fill every mandatory field")
          }
        }

    }

    const textInputChange = (val) => {
        //TODO
};

const handleValidTitle = (val) => {
    if (val.trim().length >= 2) {
      setData({
        ...data,
        isValidTitle: true,
      });
    } else {
      setData({
        ...data,
        isValidTitle: false,
      });
    }
};

const handleValidDate = (val) => {
    //TODO : no need if we place a date picker
};

    return (
        <ScrollView>
            <View style={styles.container}>
                <StatusBar backgroundColor={COLORS.beige} barStyle="light-content" />
                <View style={styles.header}>
                    <Text style={styles.text_header}>Create Event</Text>
                </View>

                <Animatable.View>
                    animation="fadeInUpBig"
                    style={[styles.footer, { backgroundColor: COLORS.greyBlue }]}
                    <Text style={[styles.text_footer, { color: COLORS.lightBlue }]}>
                        Title *
                    </Text>

                    <View style={styles.action}>
                        <Foundation name="ticket" color={COLORS.lightBlue} size={20} />
                        <TextInput style={styles.textInput}
                        placeholder="The name of your event"
                        placeholderTextColor={COLORS.lightBlue}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e) => handleValidTitle(e.nativeEvent.text)}
                        />
                        {data.check_textInputChange ? (
                            <Animatable.View animation="bounceIn">
                                <Feather name="check-circle" color="green" size={20} />
                            </Animatable.View>
                        ) : null}
                    </View>
                    {data.isValidTitle ? null : (
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>
                                Invalid title
                            </Text>
                        </Animatable.View>
                    )}

                    <Text style={[styles.text_footer,
                        {
                            color: COLORS.lightBlue,
                            marginTop: 35,
                        },
                        ]}>
                        Date *
                    </Text>

                    <View style={styles.action}>
                        <Feather name="calendar" color={COLORS.lightBlue} size={20} />
                            <TextInput style={styles.textInput}
                                    placeholder="dd/mm/yyyy"
                                    placeholderTextColor={COLORS.lightBlue}
                                    onChangeText={onChangeDate}
                            />
                    </View>

                    <Text style={[styles.text_footer,
                        {
                            color: COLORS.lightBlue,
                            marginTop: 35,
                        },
                        ]}>
                        Number of participants *
                    </Text>

                    <View style={styles.action}>
                        <Fontisto name="persons" color={COLORS.lightBlue} size={20} />
                            <TextInput style={styles.textInput}
                                    placeholder="Number"
                                    placeholderTextColor={COLORS.lightBlue}
                                    onChangeText={onChangeParticipants}
                            />
                    </View>

                    <Text style={[styles.text_footer,
                        {
                            color: COLORS.lightBlue,
                            marginTop: 35,
                        },
                        ]}>
                        Address *
                    </Text>

                    <View style={styles.action}>
                        <EvilIcons name="location" color={COLORS.lightBlue} size={20} />
                            <TextInput style={styles.textInput}
                                    placeholder="Your event's location"
                                    placeholderTextColor={COLORS.lightBlue}
                                    onChangeText={onChangeAddress}
                            />
                    </View>

                    <Text style={[styles.text_footer,
                        {
                            color: COLORS.lightBlue,
                            marginTop: 35,
                        },
                        ]}>
                        Type of activity
                    </Text>

                    <View style={styles.action}>
                        <Fontisto name="day-sunny" color={COLORS.lightBlue} size={20} />
                        <Picker style={styles.pickerStyle}
                            selectedValue={selectedActivity}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedActivity(itemValue)
                            }
                            placeholder= "Select a type"
                            placeholderTextColor={COLORS.lightBlue}
                            >

                            <Picker.Item label="First Activity" value="First Activity" />
                            <Picker.Item label="Second Activity" value="Second Activity" />
                            <Picker.Item label="Third Activity" value="Third Activity" />
                        </Picker>
                    </View>

                    <View style={styles.checkboxContainer}>
                      <CheckBox
                        value={isSelected}
                        onValueChange={setSelection}
                        style={styles.checkbox}
                      />
                      <Text style={styles.label}>Paid admission</Text>
                    </View>

                    <Text style={[styles.text_footer,
                        {
                            color: COLORS.lightBlue,
                            marginTop: 35,
                        },
                        ]}>
                        Project Description
                    </Text>

                    <View style={styles.action}>
                        <Fontisto name="info" color={COLORS.lightBlue} size={20} />
                            <TextInput style={styles.textInput}
                                    placeholder="Write a description of your event"
                                    placeholderTextColor={COLORS.lightBlue}
                                    onChangeText={onChangeDescription}
                            />
                    </View>

                    <View style={styles.button}>
                        <TouchableOpacity style={styles.validate} onPress={fetchCreateEventVal}>
                            <View style={styles.validate}>
                                <Text style={[styles.textSign, { color: COLORS.greyBlue }]}>
                                    Create !
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            </View>
        </ScrollView>
    );
};

export default CreateEventScreenTest;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.beige
    },
    header: {
      flex: 2.25,
      justifyContent: "flex-end",
      paddingHorizontal: 20,
      paddingBottom: 50,
    },
    footer: {
      flex: 4,
      backgroundColor: "#fff",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30,
    },
    text_header: {
      color: COLORS.greyBlue,
      fontWeight: "bold",
      fontSize: 30,
      paddingTop: 50,
    },
    text_footer: {
      color: "#05375a",
      fontSize: 18,
    },
    action: {
      flexDirection: "row",
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.beige,
      paddingBottom: 5,
    },
    actionError: {
      flexDirection: "row",
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#FF0000",
      paddingBottom: 5,
    },
    textInput: {
      flex: 1,
      marginTop: Platform.OS === "ios" ? 0 : -12,
      paddingLeft: 10,
      color: COLORS.beige,
    },
    errorMsg: {
      color: "#FF0000",
      fontSize: 14,
    },
    button: {
      alignItems: "center",
      marginTop: 50,
    },
    validate: {
      width: "100%",
      backgroundColor: COLORS.lightBlue,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
    },
    textSign: {
      fontSize: 18,
      fontWeight: "bold",
    },
    datePickerStyle: {
      width: 200,
      marginTop: 20,
    },
    pickerStyle: {
      flex: 1,
      marginTop: Platform.OS === "ios" ? 0 : -12,
      paddingLeft: 10,
      color: COLORS.lightBlue,
    },
    checkboxContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: "center",
    },
    label: {
      margin: 8,
    },
});