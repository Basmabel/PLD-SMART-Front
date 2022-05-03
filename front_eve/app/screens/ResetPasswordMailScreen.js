import React from "react";
import { COLORS } from "../config/colors";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "react-native-paper";

const ResetPasswordMailScreen = ({ navigation }) => {
  const [email, onChangeEmail] = React.useState("");
  const [data, setData] = React.useState({
    email: "",
    check_textInputChange: false,
    isValidUser: true,
  });

  var status = 0;
  const loginData = async () => {
    if (data.isValidUser && data.email != "") {
      fetch("http://eve-back.herokuapp.com/resetPassword", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      })
        .then((response) => {
          return response.json();
        })
        .then(function (data) {
          const idUser = data.id;
          navigation.navigate("ValidationCode", { idUser: idUser });
        })
        .catch((error) => console.error(error));
    } else {
      if (!data.isValidUser) {
        alert("Your email is not valid");
      }
    }

    //const response = await fetch("http://169.254.3.246:3000/login"
  };

  const { colors } = useTheme();

  const textInputChange = (val) => {
    if (val.includes("@") && val.includes(".")) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidUser: true,
      });
      onChangeEmail(val);
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isValidUser: false,
      });
      onChangeEmail(val);
    }
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.beige} barStyle="light-content" />
      <View style={styles.header}>
        <Image
          style={styles.imageLogo}
          source={require("../assets/images/e-mail.png")}
        />
        <Text style={styles.text_header}>Reset your password</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: COLORS.greyBlue,
          },
        ]}
      >
        <Text
          style={[
            styles.text_footer,
            {
              color: COLORS.lightBlue,
            },
          ]}
        >
          Email
        </Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={COLORS.lightBlue} size={20} />
          <TextInput
            placeholder="Please enter your email"
            placeholderTextColor={COLORS.lightBlue}
            style={[
              styles.textInput,
              {
                color: COLORS.lightBlue,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Invalid email.</Text>
          </Animatable.View>
        )}

        <View style={styles.button}>
          <TouchableOpacity style={styles.signIn} onPress={loginData}>
            <View style={styles.signIn}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: COLORS.greyBlue,
                  },
                ]}
              >
                Send Code
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default ResetPasswordMailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.beige,
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
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
    marginTop: 40,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 60,
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
  imageLogo: {
    width: 150,
    marginLeft: "30%",
    height: 150,
    marginBottom: 40,
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    backgroundColor: COLORS.lightBlue,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  signUp: {
    width: "100%",
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
