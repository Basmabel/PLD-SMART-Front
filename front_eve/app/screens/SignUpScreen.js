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
        } 
from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';



export default function SignUpScreen() {
  const handlePress = () => console.log("pressed");

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
        const data = await response.text();
        alert(data);
  } catch (error) {
    console.error(error);
  }
}
  return (
        <ImageBackground 
            source={require("../assets/images/background.jpg")}
            blurRadius={5}
            style={styles.background}
        >
      
      
        <Text style={styles.title}>Inscription</Text> 
      
        <View style={{ flexDirection: 'row'}}>
          <TextInput style={styles.txtinputRow}
              placeholder="Nom"
              onChangeText={onChangeName}
          />

          <TextInput style={styles.txtinputRow}
              placeholder="Prénom"
              onChangeText={onChangeSurName}
          />  
        </View>

        <TextInput style={styles.txtinput}
            placeholder="Email"
            onChangeText={onChangeEmail}
        />
        
        <TextInput style={styles.txtinput}
            placeholder="Mot de passe"
            secureTextEntry={true}
            onChangeText={onChangePassword}
        />

        <TextInput style={styles.txtinput}
            placeholder="Confirmation mot de passe"
            secureTextEntry={true}
            onChangeText={onChangeConfirmedPassword}
        />

      <View style={{ flexDirection: 'row'}}>
        <TextInput style={styles.txtinputRow}
            placeholder="Numéro de téléphone"
            onChangeText={onChangePhone}
        />
        <TextInput style={styles.txtinputRow}
            placeholder="Genre"
            onChangeText={onChangeGender}
        />
      </View>

      <View style={{ flexDirection: 'row'}}>
        <TextInput style={ {backgroundColor: '#fff',
                            height: 40,
                            width: "12%",
                            margin: 12,
                            borderWidth: 1,
                            padding: 10}
                          }
            placeholder="N°"
            type="number"
            onChangeText={onChangeStreetNumber}
        />
        <TextInput style={ {backgroundColor: '#fff',
                            height: 40,
                            width: "72%",
                            margin: 12,
                            borderWidth: 1,
                            padding: 10}
                          }
            placeholder="Rue"
            onChangeText={onChangeStreet}
        />
      </View>

      <View style={{ flexDirection: 'row'}}>
        <TextInput style={styles.txtinputRow}
              placeholder="Région"
              onChangeText={onChangeRegion}
          />
        <TextInput style={styles.txtinputRow}
            placeholder="Ville"
            onChangeText={onChangeCity}
        />
      </View>



      <View style={{ flexDirection: 'row'}}>
        <TextInput style={ {backgroundColor: '#fff',
                            height: 40,
                            width: "52%",
                            margin: 12,
                            borderWidth: 1,
                            padding: 10}
                          }
          placeholder="Adresse complément"
          onChangeText={onChangeAddressComplement}
      />
        <TextInput style={ {backgroundColor: '#fff',
                            height: 40,
                            width: "32%",
                            margin: 12,
                            borderWidth: 1,
                            padding: 10}
                          }
            placeholder="Code postale"
            onChangeText={onChangeZipCode}
      />
      </View>



        <TextInput style={styles.txtinput}
            placeholder="Date de naissance"
            onChangeText={onChangeBirthDate}
        />

        <Pressable  style={styles.button} onPress={fetchSignUpVal}>
            <Text style={styles.txtButton}>Valider</Text>
        </Pressable>



      <StatusBar style="auto" />
    
    </ImageBackground>
  );

 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
  },
  txtinput: {
    backgroundColor: '#fff',
    height: 40,
    width: "90%",
    margin: 12,
    borderWidth: 1,
    //borderColor: "black",
    //borderRadius: 10,
    padding: 10, 
  },
  txtinputRow: {
    backgroundColor: '#fff',
    height: 40,
    width: "42%",
    margin: 12,
    borderWidth: 1,
    //borderColor: "black",
    //borderRadius: 10,
    padding: 10, 
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    textAlign: 'center',
    width : '50%',
    height : '5%',
    backgroundColor: "#000",
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  txtButton: {
    color : "#fff",
    
  }
});








