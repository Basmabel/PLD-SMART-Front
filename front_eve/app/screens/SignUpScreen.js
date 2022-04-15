import { StatusBar } from 'expo-status-bar';
import React from 'react';
//import { useDimensions, useDeviceOrientation } from '@react-native-community/hooks';
import {COLORS} from '../config/colors'
import { StyleSheet,
         Text, 
         View,
         Alert, 
         Platform, 
         TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight, TouchableNativeFeedback,
         Image,
         SafeAreaView, 
         Button,
         Dimensions,
         TextInput,
         title, 
         ImageBackground, 
         Pressable,
         ScrollView,
        } 
from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import { useTheme } from "react-native-paper";


export default function SignUpScreen() {
  const [name, onChangeName] = React.useState("");
  const [surname, onChangeSurName] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [confirmedPassword, onChangeConfirmedPassword] = React.useState("");
  const [phone, onChangePhone] = React.useState("");
  const [city, onChangeCity] = React.useState("");
  const [street, onChangeStreet] = React.useState("");
  const [street_number, onChangeStreetNumber] = React.useState("");
  const [region, onChangeRegion] = React.useState("");
  const [zip_code, onChangeZipCode] = React.useState("");
  const [address_complement, onChangeAddressComplement] = React.useState("");
  const [gender, onChangeGender] = React.useState("");
  const [birthDate, onChangeBirthDate] = React.useState("");
  const [description, onChangeDescription] = React.useState("");
  const [data, setData] = React.useState({
    password: "",
    secureTextEntry: true,
    isValidPassword: true,
    isCompatiblePassword: true,
  });

  const fetchSignUpVal = async () =>{
    try{
         const response = await  fetch('https://eve-back.herokuapp.com/signup',
         {method: 'POST',
         headers: { 'content-type': 'application/json' },
         body: JSON.stringify({"name": name,
                               "surname":surname, 
                               "email":email, 
                               "city":city,
                               "street":street,
                               "streetNb":street_number,
                               "region":region,
                               "zipCode":zip_code,
                               "addressComplement":address_complement,
                               "password":password, 
                               "phone":phone, 
                               "address":address_complement, 
                               "gender":gender,
                               "birthDate":birthDate,
                               "description":description
             })
         });
         const d = await response.text();
         alert(d);
   } catch (error) {
     console.error(error);
   }
 }

 //(in)visible password
 const updateSecureTextEntry = () => {
  setData({
    ...data,
    secureTextEntry: !data.secureTextEntry,
  });
};

//(in)valid password
const handlePasswordChange = (val) => {
  if (val.trim().length >= 8) {
    setData({
      ...data,
      password: val,
      isValidPassword: true,
    });
  } else {
    setData({
      ...data,
      password: val,
      isValidPassword: false,
    });
  }
};

//(in)compatible passwords
const confirmPasswordChange = (val,pswd) => {
  if (val.trim() !=  pswd) {
    setData({
      ...data,
      confirmedPassword: val,
      isCompatiblePassword: true,
    });
  } else {
    setData({
      ...data,
      confirmedPassword: val,
      isCompatiblePassword: false,
    });
  }
};

  return (
    <ScrollView>
    <View style={styles.container}>
    <StatusBar backgroundColor={COLORS.beige} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Inscription</Text>
      </View>

      <Animatable.View animation="fadeInUpBig"
        style={[
          styles.footer,{backgroundColor: COLORS.greyBlue,},
        ]}>  

      <Text style={[
          styles.text_footer,{color: COLORS.lightBlue,},
          ]}>
          Nom
      </Text> 
      
        <View style={styles.action}>
        <FontAwesome name="user-o" color={COLORS.lightBlue} size={20} />
          <TextInput style={[
            styles.textInput,{color: COLORS.lightBlue,},
            ]}
              placeholder="Veuillez entrer votre nom"
              placeholderTextColor={COLORS.lightBlue}
              onChangeText={onChangeName}
              //onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
        </View>

        <Text style={[styles.text_footer,
            {
              color: COLORS.lightBlue,
              marginTop: 35,
            },
          ]}>
          Prénom
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={COLORS.lightBlue} size={20} />
            <TextInput style={styles.textInput}
                  placeholder="Veuillez entrer votre prénom"
                  placeholderTextColor={COLORS.lightBlue}
                  onChangeText={onChangeSurName}
              />  
        </View>

        <Text style={[styles.text_footer,
            {
              color: COLORS.lightBlue,
              marginTop: 35,
            },
          ]}>
          Email
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={COLORS.lightBlue} size={20} />
            <TextInput style={styles.textInput}
                  placeholder="Veuillez entrer votre email"
                  placeholderTextColor={COLORS.lightBlue}
                  onChangeText={onChangeEmail}
              />  
        </View>

        <Text style={[styles.text_footer,
            {
              color: COLORS.lightBlue,
              marginTop: 35,
            },
          ]}>
          Mot de passe
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={COLORS.lightBlue} size={20} />
            <TextInput style={styles.textInput}
                  placeholder="Veuillez entrer votre mot de passe"
                  placeholderTextColor={COLORS.lightBlue}
                  secureTextEntry={data.secureTextEntry ? true : false}
                  autoCapitalize="none"
                  onChangeText={(val) => handlePasswordChange(val)}              />
            <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color={COLORS.lightBlue} size={20} />
            ) : (
              <Feather name="eye" color={COLORS.lightBlue} size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Le mot de passe doit contenir au moins 8 caractères.
            </Text>
          </Animatable.View>
        )}

        <Text style={[styles.text_footer,
            {
              color: COLORS.lightBlue,
              marginTop: 35,
            },
          ]}>
          Confirmation Mot de passe
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={COLORS.lightBlue} size={20} />
            <TextInput style={styles.textInput}
                  placeholder="Veuillez entrer à nouveau votre mot de passe"
                  placeholderTextColor={COLORS.lightBlue}
                  secureTextEntry={data.secureTextEntry ? true : false}
                  autoCapitalize="none"
                  onChangeText={(val) => confirmPasswordChange(val,data.password)}
              />  
              
        </View>
        {data.isCompatiblePassword ? (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
            Ces mots de passe ne correspondent pas.
            </Text>
          </Animatable.View>
        ) : null}

        <Text style={[styles.text_footer,
            {
              color: COLORS.lightBlue,
              marginTop: 35,
            },
          ]}>
          Numéro de téléphone
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={COLORS.lightBlue} size={20} />
            <TextInput style={styles.textInput}
                  placeholder="Veuillez entrer votre n° de téléphone"
                  placeholderTextColor={COLORS.lightBlue}
                  onChangeText={onChangePhone}
              />  
        </View>

        <Text style={[styles.text_footer,
            {
              color: COLORS.lightBlue,
              marginTop: 35,
            },
          ]}>
          Genre
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={COLORS.lightBlue} size={20} />
            <TextInput style={styles.textInput}
                  placeholder="Veuillez entrer votre genre"
                  placeholderTextColor={COLORS.lightBlue}
                  onChangeText={onChangeGender}
              />  
        </View>

        <Text style={[styles.text_footer,
            {
              color: COLORS.lightBlue,
              marginTop: 35,
            },
          ]}>
          N° de rue
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={COLORS.lightBlue} size={20} />
            <TextInput style={styles.textInput}
                  placeholder="Veuillez entrer votre n° de rue"
                  placeholderTextColor={COLORS.lightBlue}
                  onChangeText={onChangeStreetNumber}
              />  
        </View>

        <Text style={[styles.text_footer,
            {
              color: COLORS.lightBlue,
              marginTop: 35,
            },
          ]}>
          Rue
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={COLORS.lightBlue} size={20} />
            <TextInput style={styles.textInput}
                  placeholder="Veuillez entrer votre rue"
                  placeholderTextColor={COLORS.lightBlue}
                  onChangeText={onChangeStreet}
              />  
        </View>

        <Text style={[styles.text_footer,
            {
              color: COLORS.lightBlue,
              marginTop: 35,
            },
          ]}>
          Région
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={COLORS.lightBlue} size={20} />
            <TextInput style={styles.textInput}
                  placeholder="Veuillez entrer votre région"
                  placeholderTextColor={COLORS.lightBlue}
                  onChangeText={onChangeRegion}
              />  
        </View>

        <Text style={[styles.text_footer,
            {
              color: COLORS.lightBlue,
              marginTop: 35,
            },
          ]}>
          Ville
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={COLORS.lightBlue} size={20} />
            <TextInput style={styles.textInput}
                  placeholder="Veuillez entrer votre ville"
                  placeholderTextColor={COLORS.lightBlue}
                  onChangeText={onChangeCity}
              />  
        </View>

        <Text style={[styles.text_footer,
            {
              color: COLORS.lightBlue,
              marginTop: 35,
            },
          ]}>
          Adresse complément
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={COLORS.lightBlue} size={20} />
            <TextInput style={styles.textInput}
                  placeholder="Veuillez compléter votre adresse si besoin"
                  placeholderTextColor={COLORS.lightBlue}
                  onChangeText={onChangeAddressComplement}
              />  
        </View>

        <Text style={[styles.text_footer,
            {
              color: COLORS.lightBlue,
              marginTop: 35,
            },
          ]}>
          Code Postale
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={COLORS.lightBlue} size={20} />
            <TextInput style={styles.textInput}
                  placeholder="Veuillez compléter votre adresse si besoin"
                  placeholderTextColor={COLORS.lightBlue}
                  onChangeText={onChangeZipCode}
              />  
        </View>

        <Text style={[styles.text_footer,
            {
              color: COLORS.lightBlue,
              marginTop: 35,
            },
          ]}>
          Date de naissance
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={COLORS.lightBlue} size={20} />
            <TextInput style={styles.textInput}
                  placeholder="Veuillez compléter votre adresse si besoin"
                  placeholderTextColor={COLORS.lightBlue}
                  onChangeText={onChangeBirthDate}
              />  
        </View>


        <View style={styles.button}>
          <TouchableOpacity style={styles.validate} onPress={fetchSignUpVal}>
            <View style={styles.validate}>
              <Text style={[
                  styles.textSign,{color: COLORS.greyBlue,},
                ]}>
                Valider
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text style={{ color: COLORS.beige, marginTop: 15, borderRadius: 10, }}>
            Vous avez déjà un compte?
          </Text>
        </TouchableOpacity>
        
      <StatusBar style="auto" />
      </Animatable.View>
    </View>
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.beige,
    //alignItems: 'center',
    //justifyContent: 'center',
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
});





