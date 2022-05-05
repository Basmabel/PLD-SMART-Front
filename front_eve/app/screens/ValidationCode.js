import React, { useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  TouchableNativeFeedback,
  SafeAreaView,
  Button,
  Alert,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { COLORS } from "../config/colors.js";
import { useFonts } from "@expo-google-fonts/dev";
import AppLoading from "expo-app-loading";
import * as Animatable from "react-native-animatable";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/dev";
import API_URL from "../config.js";

export default function ValidationCode({ navigation, route }) {
  const { idUser, email, isReset } = route.params;
  const [code, setCode] = React.useState("000000");
  const [isValidCode, setValidCode] = React.useState(false);

  var [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
  });

  const codeInspection = (num) => {
    if (num.length === 6) {
      setValidCode(true);
      setCode(num);
    } else {
      setValidCode(false);
    }
  };

  const sendNum = () => {
    if (isValidCode) {
      if (isReset) {
        alert("the code is valid");
        const payload = { id: idUser, token: code };
        console.log("USer id:", idUser);
        fetch(API_URL + "/resetPasswordVerifyToken", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ id: idUser, token: code }),
        })
          .then((response) => {
            navigation.navigate("ChangePasswordScreen", { idUser: idUser });
          })

          .catch((error) => console.error(error));
      } else {
        alert("the code is valid");
        fetch(API_URL + "/verifyAccount", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ userId: idUser, verificationToken: code }),
        })
          .then((response) => {
            navigation.navigate("SignInScreen");
          })

          .catch((error) => console.error(error));
      }
    } else {
      alert("The code is invalid");
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false}
          style={styles.keyboard}
        >
          <View style={styles.header}>
            <Text style={styles.title_header}>Account Validation</Text>
          </View>
          <View style={styles.body}>
            <View style={styles.logoContainer}>
              <Image
                style={styles.imageLogo}
                source={require("../assets/images/e-mail.png")}
              />
              <Text style={styles.titles}>Account Verification</Text>
              <Text style={styles.text}>
                Please enter the 6-digit code sent to your@email
              </Text>
            </View>
            <View style={styles.digitContainer}>
              <TextInput
                style={styles.digitsInput}
                onChangeText={(val) => codeInspection(val)}
              />
            </View>
            {isValidCode ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  Invalid code: Code must be 6 characters long
                </Text>
              </Animatable.View>
            )}
            <View style={styles.ValidationContainer}>
              <TouchableOpacity style={styles.verifyButton} onPress={sendNum}>
                <Text style={styles.textVerify}>Verify</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboard: {
    backgroundColor: COLORS.greyBlue,
  },
  titles: {
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.lightBlue,
    fontFamily: "Montserrat_600SemiBold",
    marginBottom: 20,
  },
  text: {
    fontSize: 15,
    color: COLORS.white,
    fontFamily: "Montserrat_400Regular",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 10 : 40,
    paddingBottom: Platform.OS === "ios" ? 10 : 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.beige,
  },
  title_header: {
    color: COLORS.greyBlue,
    fontSize: 25,
    fontFamily: "Montserrat_600SemiBold",
  },
  body: {
    backgroundColor: COLORS.greyBlue,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 20,
    height: "100%",
  },
  logoContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  ValidationContainer: {
    alignItems: "center",
  },
  verifyButton: {
    marginTop: 40,
    backgroundColor: COLORS.lightBlue,
    borderRadius: 10,
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textVerify: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  imageLogo: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  digitContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  digitsInput: {
    height: 40,
    width: "100%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: COLORS.lightBlue,
    color: COLORS.lightBlue,
    fontFamily: "Montserrat_400Regular",
    fontSize: 15,
    textAlign: "center",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
    width: "100%",
    textAlign: "center",
  },
});
