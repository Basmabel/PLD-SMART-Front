import{ StyleSheet, Dimensions, Text, View, Image,TouchableNativeFeedback,SafeAreaView, Button, Alert, Platform, TextInput, Pressable } from 'react-native';
import {COLORS} from '../config/colors.js';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const Swiper = require('react-native-swiper');


export default function HomePageScreen() {
    return(
       <SafeAreaView style={StyleSheet.container}>
           <View style={styles.header}>
                <Text style={styles.title}>Hi Salma!</Text>
                <View style={styles.infoView}>
                    <Image style={styles.profilImage} source={require('../assets/icons/profil-de-lutilisateur.png')}/>
                    <View style={styles.locationView}>
                            <Text style={styles.text}> Lyon </Text>
                            <MaterialCommunityIcons name="map-marker" color={COLORS.black} size={24}/>
                    </View>
                </View>
               
           </View>
           <View style={styles.body}>
                <View style={styles.events}>
                    <View style={styles.categorieEvents}>
                        <Text style={styles.title}>Popular</Text>
                        <MaterialCommunityIcons name="fire" color={COLORS.black} size={26}/>
                    </View>
                    <Swiper style={styles.swiper} showsPagination={false}>
                        <View style={styles.eventsContainer}>
                            <View style={styles.event}>
                                <Image style={styles.imageEvent} source={require('../assets/images/background.jpg')}/>
                            </View>
                            <View style={styles.event}>
                                <Image style={styles.imageEvent} source={require('../assets/images/background.jpg')}/>
                            </View>
                        </View>
                        <View style={styles.eventsContainer}>
                            <View style={styles.event}>
                                <Image style={styles.imageEvent} source={require('../assets/images/background.jpg')}/>
                            </View>
                            <View style={styles.event}>
                                <Image style={styles.imageEvent} source={require('../assets/images/background.jpg')}/>
                            </View>
                        </View>
                    </Swiper>
                </View>
           </View>
           
           
       </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.white
    },
    header:{
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title:{
        fontSize: 25,
        fontWeight: 'bold'
    },
    infoView:{
        flexDirection:'column',
        alignItems: 'center'
    },
    profilImage:{
        width:50,
        height:50
    },
    locationView:{
        flexDirection:'row',
    },
    text:{
        fontSize: 20
    },
    body:{
        flexDirection: 'column',
        margin: 20
    },
    events: {
        flexDirection:'column',
        height:200
    },
    categorieEvents:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom:10
    },
    swiper:{
    },
    eventsContainer:{
        flexDirection: 'row'
    },
    event:{
        marginHorizontal:10,
        flex: 1
    },
    imageEvent:{
        width:'100%',
        height:'100%',
        borderRadius: 10
    }
});