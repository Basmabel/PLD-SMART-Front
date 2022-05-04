import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
//import { useDimensions, useDeviceOrientation } from '@react-native-community/hooks';

import { COLORS } from "../config/colors";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  Image,
  SafeAreaView,
  Button,
  Dimensions,
  TextInput,
  title,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
//import RNPickerSelect from 'react-native-picker-select';
import { Picker } from "@react-native-picker/picker";

export default function SignUpScreen({ navigation }) {
  const [name, onChangeName] = React.useState("");
  const [userId, setUserId] = React.useState("");
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
    confirmedPassword: "",
    secureTextEntry: true,
    isValidPassword: true,
    isCompatiblePassword: true,
    check_textInputChange: false,
    isValidUser: true,
  });
  const [date, setDate] = useState("09-10-2020");
  const [selectedGender, setSelectedGender] = useState();

  const valuesNotNul = () => {
    if (
      name != "" &&
      surname != "" &&
      phone != "" &&
      birthDate != "" &&
      email != "" &&
      data.password != "" &&
      data.confirmedPassword != ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  const fetchSignUpVal = async () => {
    var status = 0;
    if (
      data.isValidUser &&
      data.isValidPassword &&
      !data.isCompatiblePassword &&
      valuesNotNul() &&
      validPhone() &&
      ((validZip() && zip_code != "") || zip_code === "")
    ) {
      fetch("http://eve-back.herokuapp.com/signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: name,
          surname: surname,
          email: email,
          password: data.password,
          confirmedPassword: "",
          phone: phone,
          gender: gender,
          birthDate: birthDate,
          description: description,
        }),
      })
        .then(function (data) {
          setUserId(userId);
        })
        .then(async (json) => {
          if (status === 401 || status === 400) {
            alert(json);
          } else {
            navigation.navigate("ValidationCode", {
              idUser: idUser,
              email: data.email,
              isReset: false,
            });
          }
        })
        .catch((error) => console.error(error));
    } else {
      if (!data.isValidUser) {
        alert("Your email is not valid");
      } else if (!data.isValidPassword) {
        alert("Your password is not valid");
      } else if (data.isCompatiblePassword) {
        alert("The two passwords do not match");
      } else if (!valuesNotNul()) {
        alert("You didn't fill every mandatory field");
      } else if (!validPhone()) {
        alert("Phone number has to contain 10 digits");
      } else if (!validZip() && zip_code != "") {
        alert("Zip code number has to contain 5 digits");
      }
    }
  };

  const textInputChange = (val) => {
    if (val.includes("@") && val.includes(".")) {
      setData({
        ...data,
        check_textInputChange: true,
        isValidUser: true,
      });
      onChangeEmail(val);
    } else {
      setData({
        ...data,
        check_textInputChange: false,
        isValidUser: false,
      });
      onChangePassword(val);
    }
  };

  //(in)visible password
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
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

  const validPhone = () => {
    if (phone.length != 10) {
      return false;
    }
    return true;
  };

  const validZip = () => {
    if (zip_code.length != 5) {
      return false;
    }
    return true;
  };

  //(in)compatible passwords
  const confirmPasswordChange = (val, pswd) => {
    if (val.trim() != pswd) {
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
          <Text style={styles.text_header}>Signup</Text>
        </View>

        <Animatable.View
          animation="fadeInUpBig"
          style={[styles.footer, { backgroundColor: COLORS.greyBlue }]}
        >
          <Text style={[styles.text_footer, { color: COLORS.lightBlue }]}>
            Lastname *
          </Text>

          <View style={styles.action}>
            <FontAwesome name="user-o" color={COLORS.lightBlue} size={20} />
            <TextInput
              style={[styles.textInput, { color: COLORS.lightBlue }]}
              placeholder="Please enter your lastname"
              placeholderTextColor={COLORS.lightBlue}
              onChangeText={onChangeName}
              //onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            />
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                color: COLORS.lightBlue,
                marginTop: 35,
              },
            ]}
          >
            Name *
          </Text>

          <View style={styles.action}>
            <FontAwesome name="user-o" color={COLORS.lightBlue} size={20} />
            <TextInput
              style={styles.textInput}
              placeholder="Please enter your name"
              placeholderTextColor={COLORS.lightBlue}
              onChangeText={onChangeSurName}
            />
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                color: COLORS.lightBlue,
                marginTop: 35,
              },
            ]}
          >
            Email *
          </Text>

          <View style={styles.action}>
            <FontAwesome name="envelope-o" color={COLORS.lightBlue} size={20} />
            <TextInput
              style={styles.textInput}
              placeholder="Veuillez entrer votre email"
              placeholderTextColor={COLORS.lightBlue}
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
              <Text style={styles.errorMsg}>Invalid email</Text>
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
            Password *
          </Text>

          <View style={styles.action}>
            <Feather name="lock" color={COLORS.lightBlue} size={20} />
            <TextInput
              placeholder="Please enter your password"
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
            Password Confirmation *
          </Text>

          <View style={styles.action}>
            <Feather name="lock" color={COLORS.lightBlue} size={20} />
            <TextInput
              style={styles.textInput}
              placeholder="Please enter your password again"
              placeholderTextColor={COLORS.lightBlue}
              secureTextEntry={data.secureTextEntry ? true : false}
              autoCapitalize="none"
              onChangeText={(val) => confirmPasswordChange(val, data.password)}
            />
          </View>
          {data.isCompatiblePassword && data.confirmedPassword != "" ? (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>These passwords do not match.</Text>
            </Animatable.View>
          ) : null}

          <Text
            style={[
              styles.text_footer,
              {
                color: COLORS.lightBlue,
                marginTop: 35,
              },
            ]}
          >
            Phone number *
          </Text>

          <View style={styles.action}>
            <FontAwesome name="mobile" color={COLORS.lightBlue} size={20} />
            <TextInput
              keyboardType="numeric"
              style={styles.textInput}
              placeholder="Please enter your phone number"
              placeholderTextColor={COLORS.lightBlue}
              onChangeText={onChangePhone}
              maxLength={10}
            />
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                color: COLORS.lightBlue,
                marginTop: 35,
              },
            ]}
          >
            Gender
          </Text>
          <View style={styles.action}>
            <FontAwesome
              name="transgender"
              color={COLORS.lightBlue}
              size={20}
            />
            <Picker
              style={styles.pickerStyle}
              selectedValue={selectedGender}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedGender(itemValue)
              }
              placeholder="Please enter your gender"
              placeholderTextColor={COLORS.lightBlue}
            >
              <Picker.Item label="Homme" value="Homme" />
              <Picker.Item label="Femme" value="Femme" />
              <Picker.Item label="Autre" value="Autre" />
            </Picker>
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                color: COLORS.lightBlue,
                marginTop: 35,
              },
            ]}
          >
            Birthdate *
          </Text>

          <View style={styles.action}>
            <Feather name="calendar" color={COLORS.lightBlue} size={20} />
            <TextInput
              style={styles.textInput}
              placeholder="dd/mm/yyyy"
              placeholderTextColor={COLORS.lightBlue}
              onChangeText={onChangeBirthDate}
            />
          </View>

          <View style={styles.button}>
            <TouchableOpacity style={styles.validate} onPress={fetchSignUpVal}>
              <View style={styles.validate}>
                <Text style={[styles.textSign, { color: COLORS.greyBlue }]}>
                  Confirm
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity>
            <Text
              style={{ color: COLORS.beige, marginTop: 15, borderRadius: 10 }}
            >
              Vous avez déjà un compte?
            </Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </ScrollView>
  );
}

/*
<DatePicker
          style={styles.textInput}
          date={date} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="Veuiller entrer votre date de naissance"
          placeholderTextColor={COLORS.lightBlue}
          format="DD-MM-YYYY"
          minDate="01-01-2016"
          confirmBtnText="Confirmer"
          cancelBtnText="Annuler"
          showIcon={null}
          onDateChange={onChangeBirthDate}
        />

*/
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
});
