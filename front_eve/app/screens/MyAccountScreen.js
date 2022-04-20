import {
    StyleSheet,
    Dimensions,
    Text,
    View,
    Image,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity,
  } from "react-native";
  import React from 'react';
  import { COLORS } from "../config/colors.js";
  import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
  import { Button, Column } from "native-base";
  import MyCarousel from "../components/MyCarousel";
  import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
  import Feather from "react-native-vector-icons/Feather";
  import FontAwesome from "react-native-vector-icons/FontAwesome";
  import { NativeBaseProvider } from 'native-base';

  const Swiper = require("react-native-swiper");
  
  //Récup les infos d'inscription
  const userInfo = {
    name: "Meryem",
    surname: "Alami",
    email: "malami@gmail.com",
    phoneNumber: "0606060606",
    city: "Lyon",
    streetNb: "20",
    street: "Avenue Albert Einstein",
    region: "Rhone",
    zipCode: "69100",
    addressComplement: "Batiment M",
    password: "malamieve",
    gender: "Femme",
    birthDate: "19/12/2000",
    imgProfil: "https://picsum.photos/200/300",
  };
  
  //Recup les events
  const organizedEvents = [
    {
      name: "Pool party",
      date: "20 april 2022",
      place: "Ibiza",
      imgUrl: "https://picsum.photos/id/11/200/300",
      imgProfil: "https://picsum.photos/id/11/200/300",
    },
    {
      name: "Laser game",
      date: "5 february 2021",
      place: "Charpennes",
      imgUrl: "https://picsum.photos/id/11/200/300",
      imgProfil: "https://picsum.photos/id/11/200/300",
    },
    {
      name: "Aenean leo",
      date: "5 march 2020",
      place: "Charpennes",
      imgUrl: "https://picsum.photos/id/11/200/300",
      imgProfil: "https://picsum.photos/id/11/200/300",
    },
  ];
  



  export default function MyAccountScreen() {
    const tabBarHeight = useBottomTabBarHeight() * 2;

    const editName= () => {console.log("editName")}
    const editSurame= () => {console.log("editSurname")}
    const editMail= () => {console.log("editMail")}
    const editPhoneNumber= () => {console.log("editPhoneNumber")}
    const editCity= () => {console.log("editCity")}
    const editStreetNumber= () => {console.log("editStreetNumber")}
    const editStreet= () => {console.log("editStreet")}
    const editRegion= () => {console.log("editRegion")}
    const editZipCode= () => {console.log("editZipCode")}
    const editAddressComplement= () => {console.log("editAddressComplement")}
    const editPassword= () => {console.log("editPassword")}
    const editGender= () => {console.log("editGender")}
    const editBirthDate= () => {console.log("editBirthDate")}
    const editImgProfil= () => {console.log("editImgProfil")}

    return (
    <ScrollView>
      <SafeAreaView style={StyleSheet.container}>
        <View style={styles.header}>
            <Text style={styles.title_header}> Your profile </Text>
        </View>

        <View style={{paddingTop: 40,justifyContent: "center",alignItems: "center",}}>
            <Image
                style={styles.profilImage}
                source={{ uri: userInfo.imgProfil }}
            />
        </View>

        <View style= {{marginHorizontal:30}}>
            <Text style={[styles.text_footer, styles.titleTextInput]}>
                Name
            </Text>

            <View style={styles.action}>
                <Feather name="user" color={COLORS.midnightBlue} size={20} />
                <TextInput style={styles.textInput}
                defaultValue={userInfo.name}
                editable={false}
                //onChangeText={onChangeEmail}
                />
                <TouchableOpacity onPress={editName}>
                    <Feather name="edit-2" color={COLORS.midnightBlue} size={20}/>
                </TouchableOpacity>
            </View>
        </View>

        <View style= {{marginHorizontal:30}}>
            <Text style={[styles.text_footer, styles.titleTextInput]}>
                Surname
            </Text>

            <View style={styles.action}>
                <Feather name="user" color={COLORS.midnightBlue} size={20} />
                <TextInput style={styles.textInput}
                defaultValue={userInfo.surname}
                editable={false}
                //onChangeText={onChangeEmail}
                />
                <TouchableOpacity onPress={editSurame}>
                    <Feather name="edit-2" color={COLORS.midnightBlue} size={20}/>
                </TouchableOpacity>
            </View>
        </View>

        <View style= {{marginHorizontal:30}}>
            <Text style={[styles.text_footer, styles.titleTextInput]}>
                Password
            </Text>

            <View style={styles.action}>
                <Feather name="lock" color={COLORS.midnightBlue} size={20} />
                <TextInput style={styles.textInput}
                defaultValue={userInfo.password}
                //onChangeText={onChangeEmail}
                />
                <TouchableOpacity onPress={editPassword}>
                    <Feather name="edit-2" color={COLORS.midnightBlue} size={20}/>
                </TouchableOpacity>
            </View>
        </View>

        <View style= {{marginHorizontal:30}}>
            <Text style={[styles.text_footer, styles.titleTextInput]}>
                Email
            </Text>

            <View style={styles.action}>
                <Feather name="mail" color={COLORS.midnightBlue} size={20} />
                <TextInput style={styles.textInput}
                defaultValue={userInfo.email}
                placeholder="Veillez entrer votre adresse mail"
                placeholderTextColor={COLORS.greyBlue}
                //onChangeText={onChangeEmail}
                />
                <TouchableOpacity onPress={editMail}>
                    <Feather name="edit-2" color={COLORS.midnightBlue} size={20}/>
                </TouchableOpacity>
            </View>
        </View>

        <View style= {{marginHorizontal:30}}>
            <Text style={[styles.text_footer, styles.titleTextInput]}>
                Phone number
            </Text>

            <View style={styles.action}>
                <Feather name="phone" color={COLORS.midnightBlue} size={20} />
                <TextInput style={styles.textInput}
                defaultValue={userInfo.phoneNumber}
                placeholder="Enter your phone number"
                placeholderTextColor={COLORS.greyBlue}
                //onChangeText={onChangeEmail}
                />
                <TouchableOpacity onPress={editPhoneNumber}>
                    <Feather name="edit-2" color={COLORS.midnightBlue} size={20}/>
                </TouchableOpacity>
            </View>
        </View>

        <View style= {{marginHorizontal:30}}>
            <Text style={[styles.text_footer, styles.titleTextInput]}>
                Street number
            </Text>

            <View style={styles.action}>
                <Feather name="home" color={COLORS.midnightBlue} size={20} />
                <TextInput style={styles.textInput}
                defaultValue={userInfo.streetNb}
                placeholder="Enter your street number"
                placeholderTextColor={COLORS.greyBlue}
                //onChangeText={onChangeEmail}
                />
                <TouchableOpacity onPress={editStreetNumber}>
                    <Feather name="edit-2" color={COLORS.midnightBlue} size={20}/>
                </TouchableOpacity>
            </View>
        </View>

        <View style= {{marginHorizontal:30}}>
            <Text style={[styles.text_footer, styles.titleTextInput]}>
                Street
            </Text>

            <View style={styles.action}>
                <Feather name="home" color={COLORS.midnightBlue} size={20} />
                <TextInput style={styles.textInput}
                defaultValue={userInfo.street}
                placeholder="Enter your street"
                placeholderTextColor={COLORS.greyBlue}
                //onChangeText={onChangeEmail}
                />
                <TouchableOpacity onPress={editStreet}>
                    <Feather name="edit-2" color={COLORS.midnightBlue} size={20}/>
                </TouchableOpacity>
            </View>
        </View>

        <View style= {{marginHorizontal:30}}>
            <Text style={[styles.text_footer, styles.titleTextInput]}>
                Address complement
            </Text>

            <View style={styles.action}>
                <Feather name="home" color={COLORS.midnightBlue} size={20} />
                <TextInput style={styles.textInput}
                defaultValue={userInfo.addressComplement}
                placeholder="Enter your address complement"
                placeholderTextColor={COLORS.greyBlue}
                //onChangeText={onChangeEmail}
                />
                <TouchableOpacity onPress={editAddressComplement}>
                    <Feather name="edit-2" color={COLORS.midnightBlue} size={20}/>
                </TouchableOpacity>
            </View>
        </View>

        <View style= {{marginHorizontal:30}}>
            <Text style={[styles.text_footer, styles.titleTextInput]}>
                Zip Code
            </Text>

            <View style={styles.action}>
                <Feather name="home" color={COLORS.midnightBlue} size={20} />
                <TextInput style={styles.textInput}
                defaultValue={userInfo.zipCode}
                placeholder="Enter your zip code"
                placeholderTextColor={COLORS.greyBlue}
                //onChangeText={onChangeEmail}
                />
                <TouchableOpacity onPress={editZipCode}>
                    <Feather name="edit-2" color={COLORS.midnightBlue} size={20}/>
                </TouchableOpacity>
            </View>
        </View>

        <View style= {{marginHorizontal:30}}>
            <Text style={[styles.text_footer, styles.titleTextInput]}>
                City
            </Text>

            <View style={styles.action}>
                <Feather name="home" color={COLORS.midnightBlue} size={20} />
                <TextInput style={styles.textInput}
                defaultValue={userInfo.city}
                placeholder="Enter your city"
                placeholderTextColor={COLORS.greyBlue}
                //onChangeText={onChangeEmail}
                />
                <TouchableOpacity onPress={editCity}>
                    <Feather name="edit-2" color={COLORS.midnightBlue} size={20}/>
                </TouchableOpacity>
            </View>
        </View>

        <View style= {{marginHorizontal:30}}>
            <Text style={[styles.text_footer, styles.titleTextInput]}>
                Region
            </Text>

            <View style={styles.action}>
                <Feather name="home" color={COLORS.midnightBlue} size={20} />
                <TextInput style={styles.textInput}
                defaultValue={userInfo.region}
                placeholder="Enter your region"
                placeholderTextColor={COLORS.greyBlue}
                //onChangeText={onChangeEmail}
                />
                <TouchableOpacity onPress={editRegion}>
                    <Feather name="edit-2" color={COLORS.midnightBlue} size={20}/>
                </TouchableOpacity>
            </View>
        </View>
        
        <View style= {{marginHorizontal:30}}>
            <Text style={[styles.text_footer, styles.titleTextInput]}>
                Gender
            </Text>

            <View style={styles.action}>
                <Feather name="user" color={COLORS.midnightBlue} size={20} />
                <TextInput style={styles.textInput}
                defaultValue={userInfo.gender}
                placeholder="Enter your gender"
                placeholderTextColor={COLORS.greyBlue}
                //onChangeText={onChangeEmail}
                />
                <TouchableOpacity onPress={editGender}>
                    <Feather name="edit-2" color={COLORS.midnightBlue} size={20}/>
                </TouchableOpacity>
            </View>
        </View>

        <View style= {{marginHorizontal:30}}>
            <Text style={[styles.text_footer, styles.titleTextInput]}>
                Birth date
            </Text>

            <View style={styles.action}>
                <Feather name="calendar" color={COLORS.midnightBlue} size={20} />
                <TextInput style={styles.textInput}
                defaultValue={userInfo.birthDate}
                placeholder="Enter your birth date"
                placeholderTextColor={COLORS.greyBlue}
                //onChangeText={onChangeEmail}
                />
                <TouchableOpacity onPress={editBirthDate}>
                    <Feather name="edit-2" color={COLORS.midnightBlue} size={20}/>
                </TouchableOpacity>
            </View>

            <View style={styles.events}>
            <View style={styles.categorieEvents}>
              <Text style={styles.title_header}>Organized events</Text>
              <MaterialIcons name="event-available" color={COLORS.greyBlue} size={26}/>
            </View>
            <MyCarousel data={organizedEvents} type={{ event: "oui" }} />
          </View>

        </View>
        

      </SafeAreaView>
    </ScrollView>
    );
  }
  
  const windowHeight = Dimensions.get("window").height;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 30,
      flexDirection: "row",
      justifyContent: "space-evenly" ,
      //alignItems: "center",
      backgroundColor: COLORS.mauve,
      //textAlign : "center",
    },
    action: {
        flexDirection: "row",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.mauve,
        paddingBottom: 5,
      },
    title_header: {
      color: COLORS.greyBlue,
      fontSize: 25,
      fontWeight: "bold",
      justifyContent: "center",
      alignItems: "center",
    },
    profilImage: {
      width: 90,
      height: 90,
      borderRadius: 25,
    },
    locationView: {
      flexDirection: "row",
    },
    text_header: {
      fontSize: 20,
    },
    body: {
      flexDirection: "column",
      padding: 20,
      backgroundColor: COLORS.beige,
      height: "100%",
    },
    events: {
      flexDirection: "column",
      marginBottom: 20,
      marginTop : 50,
    },
    categorieEvents: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15,
    },
    titleTextInput : {
        color: COLORS.mauve,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === "ios" ? 0 : -12,
        paddingLeft: 10,
        color: COLORS.greyBlue,
        marginHorizontal: 10,
    },
    text_footer: {
        marginTop: Platform.OS === "ios" ? 5 : 6,
        marginHorizontal : 10,
        color: "#05375a",
        fontSize: 18,
    },
  });
  