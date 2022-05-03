import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from "../config/colors.js";
import Feather from "react-native-vector-icons/Feather";

import * as ImagePicker from 'expo-image-picker';


export default function UploadImage( {imgProfil,id}) {

  const [img, setImg] = React.useState(imgProfil)
const uploadImg = (img)=>{
  fetch('http://10.43.8.247:3000/editImageProfil',{
      method: "POST",
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        "photo":img,
        "id":id}
      )}).then((response)=>{
    }).catch((error)=>console.error(error))
}
 //Image
 const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });
    console.log(JSON.stringify(_image));

   if (!_image.cancelled) {
     setImg(_image.uri);
     uploadImg(_image.uri)
   }
  };
//Gallery permissions
/*const  checkForCameraRollPermission=async()=>{
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert("Please grant camera roll permissions inside your system's settings");
    }else{
      console.log('Media Permissions are granted')
    }

}

useEffect(() => {
    checkForCameraRollPermission()
  }, []);*/

 return (
<View style={imageUploaderStyles.container}>
               {
                  <Image source={{ uri: (img!=undefined) ? img : "https://cdn-icons-png.flaticon.com/128/1946/1946429.png"}} style={{ width: 120, height: 120 }} />
               }

<View style={imageUploaderStyles.uploadBtnContainer}>
<TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
<Text>{img ? 'Edit' : 'Upload'} Image</Text>
<Feather name="edit-2" color={COLORS.midnightBlue} size={20}/>
</TouchableOpacity>
</View>


</View>

 );
}

const imageUploaderStyles=StyleSheet.create({
   container:{
       elevation:2,
       height:120,
       width:120,
       backgroundColor:'#efefef',
       position:'relative',
       borderRadius:999,
       overflow:'hidden',
   },
   uploadBtnContainer:{
       opacity:0.7,
       position:'absolute',
       right:0,
       bottom:0,
       backgroundColor:'lightgrey',
       width:'100%',
       height:'30%',
   },
   uploadBtn:{
       display:'flex',
       alignItems:"center",
       justifyContent:'center'
   }
})