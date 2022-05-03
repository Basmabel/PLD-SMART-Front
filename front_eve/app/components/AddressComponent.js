
import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, Platform,TouchableOpacity,Animated } from "react-native"
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {COLORS} from '../config/colors.js';
import { mapLigthMode } from '../model/Map.js';



const AddressComponent= ({city,address,latitude,longitude,font}) => {

  const styles = StyleSheet.create({
    container: {
      flex:1,
      width: '100%',
      marginTop: 10
    },
    text:{
        color: COLORS.lightBlue,
        fontSize: 15,
        fontFamily:  font
    },
    map:{
      marginTop: 10,
      height: 300,
      width:'100%',
      marginHorizontal: 10
    },markerWrap: {
      alignItems: "center",
      justifyContent: "center",
      width: 50,
      height: 50,
    },
    marker: {
      width: 30,
      height: 30,
    },
  })

  const initialMapState = {
    region: {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };
  
 
  

  const [state, setState] = React.useState(initialMapState);
  const [hideMap, setHideMap]= React.useState(true);

  const _map = React.useRef(null);
  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  

  useEffect(()=>{
    mapAnimation.addListener(({ value }) => {

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        
          const { coordinate } = {latitude: latitude, longitude:longitude};
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350
          );
        
      }, 10);
    });
  })

  useEffect(()=>{

  },[hideMap])

  
    return (
      <View style={styles.container} >
          <Text style={styles.text}>{address}</Text>   
          <Text style={styles.text}>{city}</Text>
          <TouchableOpacity activeOpacity={0.7} style={{width:'100%', flexDirection:'row', justifyContent: 'flex-end'}} onPress={()=>setHideMap(!hideMap)}>
                                <Text style = {{color : COLORS.lightBlue, 
                                                textDecorationLine: "underline",
                                                display: (hideMap)? "flex" : "none"
                                                }}>
                                                  View on Map
                                </Text>
                                <Text style = {{color : COLORS.lightBlue, 
                                                textDecorationLine: "underline",
                                                display: (!hideMap)? "flex" : "none"
                                                }}>
                                                  Hide Map
                                </Text>
          </TouchableOpacity>
          {hideMap? null: 
          (<MapView
                ref={_map}
                initialRegion={state.region}
                style={[styles.map]}
                showsUserLocation={true}
                provider={PROVIDER_GOOGLE}
                customMapStyle={mapLigthMode}
              >
                <MapView.Marker
                      key={0}
                      coordinate={{
                        latitude: latitude,
                        longitude: longitude,
                      }}
                    >
                      <Animated.View style={[styles.markerWrap]}>
                        <Animated.Image
                          source={require("../assets/images/Map_pin.png")}
                          style={[styles.marker]}
                          resizeMode="cover"
                        />
                      </Animated.View>
                    </MapView.Marker>
              </MapView> )  
          } 
      </View>
    )
  
  

  
}


export default AddressComponent
