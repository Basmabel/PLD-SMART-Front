import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from "../config/colors.js";
import Feather from "react-native-vector-icons/Feather";

import * as ImagePicker from 'expo-image-picker';


export default function UploadImage( {imgProfil,id}) {

  const [img, setImg] = React.useState(imgProfil)

  const uploadImg = (img, imageName, image)=>{
    fetch('http://192.168.52.1:3000/editImageProfil',{
        method: "POST",
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
          "photo":img,
          "id":id}
        )}).then((response)=>{
            fetchImage(image,imageName)
      }).catch((error)=>console.error(error))
  }

  const createFormData = (photo,nameImg, body = {}) => {
    const data = new FormData();
    console.log(photo)
    data.append('photo', {
      name: nameImg,
      type: 'image/jpeg',
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });
  
    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    console.log(data)
  
    return data;
  };

const fetchImage = async (image,imageName) =>{

  fetch("http://192.168.52.1:3000/upload", {
   method: 'POST',
   headers: {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
   },
   body: createFormData(image,imageName,{userId : id}),
  })
   .then((checkStatusAndGetJSONResponse)=>{       
     console.log(checkStatusAndGetJSONResponse)        
   }).catch((err)=>{console.log(err)});
   
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
    var name = _image.uri.substring(_image.uri.lastIndexOf("/")+1)
    var imgNam = "http://192.168.52.1:3000/images/"+name
     uploadImg(imgNam,name,_image)
     setImg(imgNam)
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