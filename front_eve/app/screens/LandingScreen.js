import React from "react";
import { COLORS } from "../config/colors";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";

import { useTheme } from "react-native-paper";

const LandingScreen = ({ navigation }) => {
  const goToInscription = () => navigation.navigate("Inscription");
  const goToConnexion = () => navigation.navigate("Connexion");
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [data, setData] = React.useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.lightWhite} barStyle="light-content" />

      <View style={styles.header}>
            <Image style={styles.logo} source={require("../assets/images/eVe.png")} />
      </View>
        <View style={styles.button}> 
        <TouchableOpacity
            onPress={goToInscription}
            style={[
              styles.signUp,
              {
                borderColor: COLORS.pink,
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: COLORS.lightWhite,
                },
              ]}
            >
              Inscription
            </Text>
          </TouchableOpacity>
              
          <TouchableOpacity
            onPress={goToConnexion}
            style={[
              styles.signIn,
              {
                borderColor: COLORS.nightBlue,
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: COLORS.lightWhite,
                },
              ]}
            >
              Connexion
            </Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  header: {
    flex: 2.25,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: 50,
    marginRight: 30,
    marginLeft: 30,
  },
  signIn: {
    width: "100%",
    backgroundColor: COLORS.nightBlue,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  signUp: {
    width: "100%",
    backgroundColor: COLORS.pink,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  logo: {
    width: 250,
    height: 100,
  },
});

/**
 * Define the state for a sign in operation 
 
this.state = {
    email : '',
    password: '',
  };
 */

/*const loginData = async () =>  
{
    try{
        const response = await fetch('http://192.168.52.1:3000/signin')
        {method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({"email":email, 
                              "password":password, 
            })
        });
        const data = await response.text();
        alert(data);


        }
    }catch (error) {
    console.error(error);
  }
}
/*
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
