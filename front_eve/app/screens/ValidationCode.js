import React, {useEffect} from "react";
import{ StyleSheet, Dimensions, Text, View, Image,TouchableNativeFeedback,SafeAreaView, Button, Alert, Platform, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {COLORS} from '../config/colors.js';
import {useFonts} from "@expo-google-fonts/dev";
import AppLoading from "expo-app-loading";
import * as Animatable from "react-native-animatable";
import { 
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold
} from '@expo-google-fonts/dev'

export default function ValidationCode() {
  
  const [code,setCode] = React.useState([-1,-1,-1,-1]);
  const [pinReady,setPinReady] = React.useState(false);
  const [isValidCode, setValidCode] = React.useState(false);

  var [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold
  });

  const codeInspection = (num, index) =>{
    var array = [...code]
    if(!isNaN(num) && num.length===1){
      array[index]=num;
    }else{
      setValidCode(false)
    }
    setCode(array)

    if(array.every((item)=>(Number(item)>=0 && Number(item)<10))){
      setValidCode(true)
    }else{
      setValidCode(false)
    }
  }

  const sendNum= ()=>{
    if(isValidCode){
      alert("the code is valid")
    }else{
      alert("The code is invalid")
    }
  }

  if(!fontsLoaded){
    return(<AppLoading/>)
  }else{
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false} style={styles.keyboard}>
          <View style={styles.header}>
            <Text style={styles.title_header}>Account Validation</Text>
            </View>
            <View style={styles.body}>
              <View style={styles.logoContainer}>
                  <Image style={styles.imageLogo} source={require('../assets/images/e-mail.png')}/>
                  <Text style={styles.titles}>Account Verification</Text>
                  <Text style={styles.text}>Please enter the 4-digit code sent to your@email</Text>
              </View>
              <View style={styles.digitContainer}>
                  <TextInput style={styles.digitsInput} onChangeText={ (val)=>codeInspection(val,0)}/>
                  <TextInput style={styles.digitsInput} onChangeText={ (val)=>codeInspection(val,1)}/>
                  <TextInput style={styles.digitsInput} onChangeText={ (val)=>codeInspection(val,2)}/>
                  <TextInput style={styles.digitsInput} onChangeText={ (val)=>codeInspection(val,3)}/>
              </View>
              {isValidCode ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                      <Text style={styles.errorMsg}>
                        Invalid code: numbers has to be between 0 and 9
                      </Text>
                    </Animatable.View>
                )}
              <View style={styles.ValidationContainer}>
                  <TouchableOpacity style ={styles.verifyButton} onPress={sendNum}>
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
    flex: 1
  },
  keyboard:{
      backgroundColor: COLORS.greyBlue
  },
  titles:{
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.lightBlue,
    fontFamily: 'Montserrat_600SemiBold',
    marginBottom: 20
  },
  text:{
    fontSize:15,
    color: COLORS.white,
    fontFamily: 'Montserrat_400Regular'
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios"? 10 : 40,
    paddingBottom: Platform.OS === "ios"? 10 : 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.beige,
  },
  title_header: {
    color: COLORS.greyBlue,
    fontSize:25,
    fontFamily: 'Montserrat_600SemiBold'
  },
  body: {
    backgroundColor: COLORS.greyBlue,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 20,
    height: '100%',
  },
  logoContainer:{
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical:60
  },
  ValidationContainer:{
    alignItems: 'center'
  },
  verifyButton:{
    marginTop:40,
    backgroundColor: COLORS.lightBlue,
    borderRadius: 10,
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textVerify:{
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  imageLogo:{
      width: 150,
      height:150,
      marginBottom: 40
  },
  digitContainer:{
    flexDirection: 'row',
    justifyContent: "center",
  },
  digitsInput:{
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: COLORS.beige,
    fontFamily: 'Montserrat_400Regular',
    fontSize: 15,
    textAlign: 'center'
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
    width: '100%',
    textAlign:'center'
  },
});