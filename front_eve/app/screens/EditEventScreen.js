import { TouchableOpacity } from "react-native-gesture-handler";
//import Animated from "react-native-reanimated";
import BottomSheet from 'reanimated-bottom-sheet';

export default function EditEventScreen() {

    renderInner = () => (
        <View>
            <TouchableOpacity><Text>Take a photo</Text></TouchableOpacity>
            <TouchableOpacity><Text>Chose from Library</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>this.bs.current.snapTo(1)}><Text>Cancel</Text></TouchableOpacity>
        </View>
    );

    renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelheader}>
                <View style = {styles.panelHandle}/>
            </View>
        </View>
    );

    bs = React.createRef();
    //fall = new Animated.Value(1);

    //Edit functions
    const editTitle= () => {setVisibleTitle(true);}
    const editImage= () => {setVisibleImage(true);}
    const editMaxCapacity= () => {setVisibleMaxCapacity(true);}
    const editCity= () => {setVisibleCity(true);}
    const editPlace= () => {setVisiblePlace(true);}
    const editAdress= () => {setVisibleAdress(true);}
    const editDescription= () => {setVisibleDescription(true);}

    //Dialog Visibility
    const [visibleTitle, setVisibleTitle] = useState(false);
    const [visibleImage, setVisibleImage] = useState(false);
    const [visibleMaxCapacity, setVisibleMaxCapacity] = useState(false);
    const [visibleCity, setVisibleCity] = useState(false);
    const [visiblePlace, setVisiblePlace] = useState(false);
    const [visibleAdress, setVisibleAdress] = useState(false);
    const [visibleDescription, setVisibleDescription] = useState(false);

    //Writing data

    const sendInputTitle = (inputText) => {setInfoEvent({ ...infoEvent,name: inputText,});
    setVisibleTitle(false);
    };
    const sendInputImage = (inputText) => {setInfoEvent({ ...infoEvent,image: inputText,});
    setVisibleImage(false);
    };
    const sendInputMaxCapacity = (inputText) => {setInfoEvent({ ...infoEvent,maxcap: inputText,});
    setVisibleMaxCapacity(false);
    };
    const sendInputCity = (inputText) => {setInfoEvent({ ...infoEvent,city: inputText,});
    setVisibleCity(false);
    };
    const sendInputPlace = (inputText) => {setInfoEvent({ ...infoEvent,place: inputText,});
    setVisiblePlace(false);
    };
    const sendInputAdress = (inputText) => {setInfoEvent({ ...infoEvent,adress: inputText,});
    setVisibleAdress(false);
    };
    const sendInputDescription = (inputText) => {setInfoEvent({ ...infoEvent,description: inputText,});
    setVisibleDescrition(false);
    };

    return (
        <SafeAreaView style={StyleSheet.container}>
            {/* <BottomSheet
                ref = {this.bs}
                snapPoints = {[330, 0]}
                initalSnap = {1}
                //callbackNode = {this.fall}
                enableGestureInteraction = {true}
            />
        <TouchableOpacity onPress={()=>this.bs.current.snapTo(0)}>
            <View >
                <ImageBackground
                    style = {styles.image} 
                    source={{uri: infoEvent.Image}}>
                        <View>
                            <Icon name="camera" size={35} color="fff" style={{
                                opacity: 0.7,
                                alignItems: 'center',
                                borderWidth: 1,
                                borderRadius: 10
                            }}/>
                        </View>
                    </ImageBackground>
            </View>
        </TouchableOpacity>
        <View>
            <View>
              <Feather name="title" color={COLORS.white} size={20} />
              <TextInput style = {styles.title_header} 
              defaultValue={infoEvent.name}
              editable = {false}/> 
              <TouchableOpacity onPress={editTitle}>
                  <Feather name="edit-2" color={COLORS.white} size={20}/>
              </TouchableOpacity>
              <DialogInput style={styles.dialoginput}
                          isDialogVisible={visibleStreet}
                          title={"Enter a new Title"}
                          hintInput ={"title"}
                          submitInput={ (inputText) => {sendInputTitle(inputText)} }
                          closeDialog={ () => {showDialog(false)}}>
                </DialogInput>
            </View>
            <View>
              <Feather name="maxcap" color={COLORS.white} size={20} />
              <TextInput style = {styles.regular_text} 
              defaultValue={infoEvent.maxcapacity}
              editable = {false}/> 
              <TouchableOpacity onPress={editMaxCapacity}>
                  <Feather name="edit-2" color={COLORS.white} size={20}/>
              </TouchableOpacity>
              <DialogInput style={styles.dialoginput}
                          isDialogVisible={visibleStreet}
                          title={"Enter a new Maximum Capicity"}
                          hintInput ={"maximum capacity"}
                          submitInput={ (inputText) => {sendInputMaxCapacity(inputText)} }
                          closeDialog={ () => {showDialog(false)}}>
                </DialogInput>
            </View>
            <Image style = {styles.profilImage} source={{uri: infoEvent[3]}}/>
        </View>            
        <View style = {styles.content}>
          <FlatList
            data = {DATA}
            renderItem={({item})=><Text style = {styles.regular_text}>{item.key}</Text>}
          />
          <Text style = {styles.title_section}>Description</Text>
          <Text style = {styles.regular_text}>{infoEvent[1]}</Text>
          <View>
              <Feather name="description" color={COLORS.white} size={20} />
              <TextInput style = {styles.regular_text} 
              defaultValue={infoEvent.description}
              editable = {false}/> 
              <TouchableOpacity onPress={editDescription}>
                  <Feather name="edit-2" color={COLORS.white} size={20}/>
              </TouchableOpacity>
              <DialogInput style={styles.dialoginput}
                          isDialogVisible={visibleStreet}
                          title={"Enter a new description"}
                          hintInput ={"Description"}
                          submitInput={ (inputText) => {sendInputDescription(inputText)} }
                          closeDialog={ () => {showDialog(false)}}>
                </DialogInput>
            </View>
          <FlatList
            members = {MEMBERS}
            renderItem={({item})=><View><Text style={styles.regular_text}>{item.user_name} {item.user_surname}</Text>
                                  <Button title="X" onPress={()=>{delete_participant()}}/></View>
                                }
            />
          <View style = {styles.button}>
            <FormButton title = "Update" onPress={()=>ModifyEvent()}/>
          </View>
        </View> */}
    </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: COLORS.purple
    },
    content :{
      backgroundColor: COLORS.beige,
      borderRadius : 20,
    },
    panelheader:{
        alignItems : 'center',
    },
    panelHandle :{
        width : 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBotton: 10,
    },
    title_header: {
      color: COLORS.greyBlue,
      fontSize:36,
      fontFamily: 'Montserrat_600SemiBold'
    },
    title_section: {
      paddingTop : 30,
      color: COLORS.white,
      fontSize: 25,
      fontFamily: 'Montserrat_600SemiBold'
    },
    regular_text: {
      color: COLORS.greyBlue,
      fontSize: 15,
      fontFamily: 'Montserrat_600SemiBold'
    },
    infoView: {
      flexDirection: "column",
      alignItems: "center",
    },
    image : {
      paddingTop : 20,
      paddingBottom : 20,
    },
    profilImage: {
      width: 60,
      height: 60,
      borderRadius: 40,
      right: 5,
      position : 'absolute'
    },
    button: {
      flex: 1,
      justifyContent: "center",
      padding: 16,
      borderRadius : 10,
      backgroundColor : '#660066'
    }
  });