import React from 'react'
import { ImageBackground, TextInput, StyleSheet, Text, Pressable } from 'react-native'
import {COLORS} from '../config/colors'



export default function SignInScreen() {

    /*this.state = {
        email : '',
        password: '',
      };*/
    
  return (
   <ImageBackground 
        source={require("../assets/images/background.jpg")}
        blurRadius={5}
        style={styles.background}
    >
        <Text style={styles.titleText}> Connexion</Text>
        <TextInput
            style={styles.textinput}
            placeholder="email"
            //onChangeText={(text) => this.setState({ email: text })}
        />
        <TextInput 
            secureTextEntry={true} 
            style={styles.textinput}
            placeholder="password"
            //onChangeText={(text) => this.setState({ email: text })} 
        />
        <Pressable onPress={checkTextInput} style={styles.button}>
            <Text style={styles.textButton}>Connexion</Text>
        </Pressable>
    </ImageBackground>
    
  );
}
 const styles = StyleSheet.create({
     
    background: {
        flex: 1,
        
        justifyContent: 'center',
        opacity: 0.7,
        
    },
    
    textinput: {
        backgroundColor : COLORS.white,
        height: 40,
        width: "90%",
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },

    titleText: {
        alignItems: 'center',
        textAlign: 'left',
        fontSize: 40,
        padding: 20,
        fontWeight: "bold",
    },

    button: {
        width : '38%',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: COLORS.mauve,
        marginTop: 60,
        marginLeft: '31%',
        alignContent: 'center'
    },

    textButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        alignItems : 'center'
    },
 })

 const checkTextInput = () => {
    /*if (this.state.email==='' && this.state.password===''){
        alert ('Veuillez entrer votre mot de passe et votre email!');
        return;
    }
    //Check for the Email TextInput
    if (this.state.email=== '') {
      alert('Veuillez entrer votre email!');
      return;
    }
    //Check for the Password TextInput
    if (this.state.password=== '') {
      alert('Veuillez entrer votre mot de passe!');
      return;
    }*/
    //Checked Successfully
    //Do whatever you want
    alert('Success');
  };


/**
 * Define the state for a sign in operation 
 
this.state = {
    email : '',
    password: '',
  };
 */


/*const loginData = async () =>  
{
  fetch(url,
    {
      method: 'POST',
      body: JSON.stringify({"email": this.state.email,
                            "password": this.state.password})
              
    }).then(function (response) {
          return response.json();
    }).then(function (result) { 
          // console.log(result);
          if(!result.error)
          {
              that.setState({ 
                status: result.error, // why result.error ? 
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