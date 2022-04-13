import { StatusBar } from 'expo-status-bar';
import{ StyleSheet, Dimensions, Text, View, Image,TouchableNativeFeedback,SafeAreaView, Button, Alert, Platform, TextInput, Pressable } from 'react-native';
import {COLORS} from '../config/colors.js';

export default function App() {
  
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
            <Image style={styles.imageLogo} source={require('../assets/images/e-mail.png')}/>
            <Text style={styles.titles}>Account Verification</Text>
            <Text>Please enter the 4-digit code sent to your@email</Text>
        </View>
        <View style={styles.digitContainer}>
            <TextInput style={styles.digitsInput}/>
            <TextInput style={styles.digitsInput}/>
            <TextInput style={styles.digitsInput}/>
            <TextInput style={styles.digitsInput}/>
        </View>
        <View style={styles.ValidationContainer}>
            <Pressable style ={styles.verifyButton}>
              <Text style={styles.textVerify}>Verify</Text>
            </Pressable>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titles:{
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.mauve,
    marginBottom: 20
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  logoContainer:{
    backgroundColor: COLORS.white,
    flex:0.75,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  ValidationContainer:{
    flex:0.5,
    alignItems: 'center'
  },
  verifyButton:{
    backgroundColor: COLORS.black,
    borderRadius: 4,
    width: 300,
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
    flex:0.25,
    flexDirection: 'row',
    justifyContent: "center",
  },
  digitsInput:{
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  
  }
});