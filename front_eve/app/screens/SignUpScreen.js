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
  //const {landscape} = useDeviceOrientation();

  /*this.state = {
    name: '', 
    surname : '',
    email: '',
    password: '',
    confirmedPassword: '',
    phone: '',
    city: '',
    street: '',
    street_number: '',
    region: '',
    zip_code: '',
    address_complement: '',
    gender: '',
    birthDate: '',
    description: ''
  };*/

  
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
              //onChangeText={(text) => this.setState({ name: text })}
          />

          <TextInput style={styles.txtinputRow}
              placeholder="Prénom"
              //onChangeText={(text) => this.setState({ surname: text })}
          />  
        </View>

        <TextInput style={styles.txtinput}
            placeholder="Email"
            //onChangeText={(text) => this.setState({ email: text })}
        />
        
        <TextInput style={styles.txtinput}
            placeholder="Mot de passe"
            secureTextEntry={true}
            //onChangeText={(text) => this.setState({ password: text })}
        />

        <TextInput style={styles.txtinput}
            placeholder="Confirmation mot de passe"
            secureTextEntry={true}
            //onChangeText={(text) => this.setState({ confirmedPassword: text })}
        />

      <View style={{ flexDirection: 'row'}}>
        <TextInput style={styles.txtinputRow}
            placeholder="Numéro de téléphone"
            //onChangeText={(text) => this.setState({ phone: text })}
        />
        <TextInput style={styles.txtinputRow}
            placeholder="Genre"
            //onChangeText={(text) => this.setState({ gender: text })}
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
            //onChangeText={(text) => this.setState({ gender: text })}
        />
        <TextInput style={ {backgroundColor: '#fff',
                            height: 40,
                            width: "72%",
                            margin: 12,
                            borderWidth: 1,
                            padding: 10}
                          }
            placeholder="Rue"
            //onChangeText={(text) => this.setState({ gender: text })}
        />
      </View>

      <View style={{ flexDirection: 'row'}}>
        <TextInput style={styles.txtinputRow}
              placeholder="Région"
              //onChangeText={(text) => this.setState({ phone: text })}
          />
        <TextInput style={styles.txtinputRow}
            placeholder="Ville"
            //onChangeText={(text) => this.setState({ gender: text })}
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
          //onChangeText={(text) => this.setState({ _complement: text })}
      />
        <TextInput style={ {backgroundColor: '#fff',
                            height: 40,
                            width: "32%",
                            margin: 12,
                            borderWidth: 1,
                            padding: 10}
                          }
            placeholder="Code postale"
            //onChangeText={(text) => this.setState({ gender: text })}
      />
      </View>



        <TextInput style={styles.txtinput}
            placeholder="Date de naissance"
            //onChangeText={(text) => this.setState({ birthDate: text })}
        />

        <Pressable  style={styles.button} onPress={() => Alert.alert('Inscription réussie')}>
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





/*
const fetchSignUpVal = async () =>{
    fetch(url,
                    {method: 'POST',
                    body: JSON.stringify({"name": this.state.name, 
                           "surname": this.state.surname,
                           "email": this.state.email,
                           "password": this.state.password,
                            "confirmedPassword": this.state.confirmedPassword,
                            "phone" : this.state.phone,
                            "city" : this.state.city,
                            "street" : this.state.street,
                            "street_number" : this.state.street_number,
                            "region" : this.state.region,
                            "zip_code" : this.state.zip_code,
                            "address_complement" : this.state.address_complement,
                            "address" : this.state.address,
                            "gender" : this.state.gender,
                            "birthDate" : this.state.birthDate,
                            "description" : this.state.description
                        })
                    }).then(function(response){
                        return response.json();
                    }).then(function(result){
                        // console.log(result);
                        if(!result.error){
                            that.setState({ 
                            status: result.error,
                            wholeResult: result,
                            });
                        Alert.alert("User register successfully \n userId: "+that.state.wholeResult.user.uid);
                        console.log(that.state.wholeResult.user.uid);
                        }else{
                            Alert.alert(result.error_msg);
                            console.log(result);
                        }
                    }).catch(function (error) {
                        console.log("-------- error ------- "+error);
                        alert("result:"+error)
                    });
}

*/