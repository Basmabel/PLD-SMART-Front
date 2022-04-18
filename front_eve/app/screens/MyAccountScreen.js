import {
    StyleSheet,
    Dimensions,
    Text,
    View,
    Image,
    SafeAreaView,
    ScrollView,
    TextInput,
  } from "react-native";
  import { COLORS } from "../config/colors.js";
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  import { Column } from "native-base";
  import MyCarousel from "../components/MyCarousel";
  import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
  import Feather from "react-native-vector-icons/Feather";

  const Swiper = require("react-native-swiper");
  
  //Récup les infos d'inscription
  const userInfo = {
    name: "Meryem",
    surname: "Alami",
    email: "malami@gmail.com",
    phoneNumber: "0606060606",
    city: "Lyon",
    streetNb: "20",
    street: "Avenue Albert Einstein",
    region: "Rhone",
    zipCode: "69100",
    addressComplement: "Batiment M",
    password: "malamieve",
    gender: "Femme",
    birthDate: "19/12/2000",
    imgProfil: "https://picsum.photos/200/300",
  };
  
  /*const categorie = [
    {
      name: "party",
      imgUrl: "https://cdn-icons-png.flaticon.com/128/3058/3058890.png",
    },
    {
      name: "party",
      imgUrl: "https://cdn-icons-png.flaticon.com/128/3058/3058890.png",
    },
    {
      name: "party",
      imgUrl: "https://cdn-icons-png.flaticon.com/128/3058/3058890.png",
    },
    {
      name: "party",
      imgUrl: "https://cdn-icons-png.flaticon.com/128/3058/3058890.png",
    },
    {
      name: "party",
      imgUrl: "https://cdn-icons-png.flaticon.com/128/3058/3058890.png",
    },
  ];*/



  export default function MyAccountScreen() {
    const tabBarHeight = useBottomTabBarHeight() * 2;
  
    return (
    <ScrollView>
      <SafeAreaView style={StyleSheet.container}>
        <View style={styles.header}>
            <Text style={styles.title_header}> Your profile </Text>
        </View>

        <View style={{paddingTop: 40,justifyContent: "center",alignItems: "center",}}>
            <Image
                style={styles.profilImage}
                source={{ uri: userInfo.imgProfil }}
            />
        </View>

        <View style= {{marginHorizontal:30}}>
            <Text style={[styles.text_footer, styles.titleTextInput]}>
                Name
            </Text>

            <View style={styles.action}>
                <Feather name="user" color={COLORS.midnightBlue} size={20} />
                <TextInput style={styles.textInput}
                defaultValue={userInfo.name}
                editable={false}
                //onChangeText={onChangeEmail}
                />
                <Feather name="edit" color={COLORS.midnightBlue} size={20} onPress={console.log("Modification...")}/>
            </View>
        </View>

        <View style= {{marginHorizontal:30}}>
            <Text style={[styles.text_footer, styles.titleTextInput]}>
                Surname
            </Text>

            <View style={styles.action}>
                <Feather name="user" color={COLORS.midnightBlue} size={20} />
                <TextInput style={styles.textInput}
                defaultValue={userInfo.surname}
                editable={false}
                //onChangeText={onChangeEmail}
                />
            </View>
        </View>

        <View style= {{marginHorizontal:30}}>
            <Text style={[styles.text_footer, styles.titleTextInput]}>
                Password
            </Text>

            <View style={styles.action}>
                <Feather name="lock" color={COLORS.midnightBlue} size={20} />
                <TextInput style={styles.textInput}
                defaultValue={userInfo.password}
                //onChangeText={onChangeEmail}
                />
            </View>
        </View>

        <View style= {{marginHorizontal:30}}>
            <Text style={[styles.text_footer, styles.titleTextInput]}>
                Email
            </Text>

            <View style={styles.action}>
                <Feather name="mail" color={COLORS.midnightBlue} size={20} />
                <TextInput style={styles.textInput}
                defaultValue={userInfo.email}
                placeholder="Veillez entrer votre adresse mail"
                placeholderTextColor={COLORS.greyBlue}
                //onChangeText={onChangeEmail}
                />
            </View>
        </View>

        <View style= {{marginHorizontal:30}}>
            <Text style={[styles.text_footer, styles.titleTextInput]}>
                Phone number
            </Text>

            <View style={styles.action}>
                <Feather name="phone" color={COLORS.midnightBlue} size={20} />
                <TextInput style={styles.textInput}
                defaultValue={userInfo.phoneNumber}
                placeholder="Enter your phone number"
                placeholderTextColor={COLORS.greyBlue}
                //onChangeText={onChangeEmail}
                />
            </View>
        </View>

        <View style= {{marginHorizontal:30}}>
            <Text style={[styles.text_footer, styles.titleTextInput]}>
                Street number
            </Text>

            <View style={styles.action}>
                <Feather name="home" color={COLORS.midnightBlue} size={20} />
                <TextInput style={styles.textInput}
                defaultValue={userInfo.streetNb}
                placeholder="Enter your street number"
                placeholderTextColor={COLORS.greyBlue}
                //onChangeText={onChangeEmail}
                />
            </View>
        </View>

        <View style= {{marginHorizontal:30}}>
            <Text style={[styles.text_footer, styles.titleTextInput]}>
                Street
            </Text>

            <View style={styles.action}>
                <Feather name="home" color={COLORS.midnightBlue} size={20} />
                <TextInput style={styles.textInput}
                defaultValue={userInfo.street}
                placeholder="Enter your street"
                placeholderTextColor={COLORS.greyBlue}
                //onChangeText={onChangeEmail}
                />
            </View>
        </View>

        <View style= {{marginHorizontal:30}}>
            <Text style={[styles.text_footer, styles.titleTextInput]}>
                Address complement
            </Text>

            <View style={styles.action}>
                <Feather name="home" color={COLORS.midnightBlue} size={20} />
                <TextInput style={styles.textInput}
                defaultValue={userInfo.addressComplement}
                placeholder="Enter your address complement"
                placeholderTextColor={COLORS.greyBlue}
                //onChangeText={onChangeEmail}
                />
            </View>
        </View>

        <View style= {{marginHorizontal:30}}>
            <Text style={[styles.text_footer, styles.titleTextInput]}>
                Zip Code
            </Text>

            <View style={styles.action}>
                <Feather name="home" color={COLORS.midnightBlue} size={20} />
                <TextInput style={styles.textInput}
                defaultValue={userInfo.zipCode}
                placeholder="Enter your zip code"
                placeholderTextColor={COLORS.greyBlue}
                //onChangeText={onChangeEmail}
                />
            </View>
        </View>

        <View style= {{marginHorizontal:30}}>
            <Text style={[styles.text_footer, styles.titleTextInput]}>
                City
            </Text>

            <View style={styles.action}>
                <Feather name="home" color={COLORS.midnightBlue} size={20} />
                <TextInput style={styles.textInput}
                defaultValue={userInfo.city}
                placeholder="Enter your city"
                placeholderTextColor={COLORS.greyBlue}
                //onChangeText={onChangeEmail}
                />
            </View>
        </View>

        <View style= {{marginHorizontal:30}}>
            <Text style={[styles.text_footer, styles.titleTextInput]}>
                Region
            </Text>

            <View style={styles.action}>
                <Feather name="home" color={COLORS.midnightBlue} size={20} />
                <TextInput style={styles.textInput}
                defaultValue={userInfo.region}
                placeholder="Enter your region"
                placeholderTextColor={COLORS.greyBlue}
                //onChangeText={onChangeEmail}
                />
            </View>
        </View>
        
        <View style= {{marginHorizontal:30}}>
            <Text style={[styles.text_footer, styles.titleTextInput]}>
                Gender
            </Text>

            <View style={styles.action}>
                <Feather name="user" color={COLORS.midnightBlue} size={20} />
                <TextInput style={styles.textInput}
                defaultValue={userInfo.gender}
                placeholder="Enter your gender"
                placeholderTextColor={COLORS.greyBlue}
                //onChangeText={onChangeEmail}
                />
            </View>
        </View>

        <View style= {{marginHorizontal:30}}>
            <Text style={[styles.text_footer, styles.titleTextInput]}>
                Birth date
            </Text>

            <View style={styles.action}>
                <Feather name="calendar" color={COLORS.midnightBlue} size={20} />
                <TextInput style={styles.textInput}
                defaultValue={userInfo.birthDate}
                placeholder="Enter your birth date"
                placeholderTextColor={COLORS.greyBlue}
                //onChangeText={onChangeEmail}
                />
            </View>
        </View>
        

      </SafeAreaView>
    </ScrollView>
    );
  }
  
  const windowHeight = Dimensions.get("window").height;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 20,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.pink,
      textAlign : "center",
    },
    action: {
        flexDirection: "row",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.pink,
        paddingBottom: 5,
      },
    title_header: {
      color: COLORS.greyBlue,
      fontSize: 25,
      fontWeight: "bold",
      justifyContent: "center",
      alignItems: "center",
    },
    profilImage: {
      width: 70,
      height: 70,
      borderRadius: 25,
    },
    locationView: {
      flexDirection: "row",
    },
    text_header: {
      fontSize: 20,
    },
    body: {
      flexDirection: "column",
      padding: 20,
      backgroundColor: COLORS.beige,
      height: "100%",
    },
    events: {
      flexDirection: "column",
      marginBottom: 20,
    },
    categorieEvents: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15,
    },
    titleTextInput : {
        color: COLORS.pink,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === "ios" ? 0 : -12,
        paddingLeft: 10,
        color: COLORS.greyBlue,
        marginHorizontal: 10,
    },
    text_footer: {
        marginTop: Platform.OS === "ios" ? 5 : 6,
        marginHorizontal : 10,
        color: "#05375a",
        fontSize: 18,
    },
  });
  