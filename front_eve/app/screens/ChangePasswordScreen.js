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

const ChangePasswordScreen = ({ navigation, route }) => {
  const [email, onChangeEmail] = React.useState("");
  const { idUser } = route.params;
  const [password, onChangePassword] = React.useState("");
  const [data, setData] = React.useState({
    password: "",
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  var status = 0;
  const loginData = async () => {
    if (data.isValidPassword && data.password != "") {
      fetch("https://eve-back.herokuapp.com/newPassword", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id: idUser, newpassword: data.password }),
      })
        .then((response) => {
          return response.json();
        })
        .then(function (data) {
          navigation.navigate("SignInScreen");
        })
        .catch((error) => console.error(error));
    } else {
      if (!data.isValidPassword) {
        alert("Your password is not valid");
      } else if (data.password === "") {
        alert("Please fill in every field");
      }
    }

    //const response = await fetch("http://169.254.3.246:3000/login"
  };

  const { colors } = useTheme();

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

  const handlePasswordConfirm = (val) => {
    if (val.trim() === { password }) {
      setData({
        ...data,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.beige} barStyle="light-content" />
      <View style={styles.header}>
        <Image
          style={styles.imageLogo}
          source={require("../assets/images/e-mail.png")}
        />
        <Text style={styles.text_header}>Change your password</Text>
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
              marginTop: 35,
            },
          ]}
        >
          New Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={COLORS.lightBlue} size={20} />
          <TextInput
            placeholder="Please enter your new password"
            placeholderTextColor={COLORS.lightBlue}
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: COLORS.lightBlue,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
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
              Password must be 8 characters long.
            </Text>
          </Animatable.View>
        )}

        <Text
          style={[
            styles.text_footer,
            {
              color: COLORS.lightBlue,
              marginTop: 35,
            },
          ]}
        >
          Confirm New Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={COLORS.lightBlue} size={20} />
          <TextInput
            placeholder="Please confirm your new password"
            placeholderTextColor={COLORS.lightBlue}
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: COLORS.lightBlue,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordConfirm(val)}
          />
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
            <Text style={styles.errorMsg}>The Two Passwords don't match</Text>
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
                Change Password
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default ChangePasswordScreen;

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
  imageLogo: {
    width: 150,
    marginLeft: "30%",
    height: 150,
    marginBottom: 40,
    justifyContent: "center",
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
