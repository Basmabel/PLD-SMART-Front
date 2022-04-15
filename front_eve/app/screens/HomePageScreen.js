import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { COLORS } from "../config/colors.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Column } from "native-base";
import MyCarousel from "../components/MyCarousel";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
const Swiper = require("react-native-swiper");

const popEvents = [
  {
    name: "Aenean leo",
    date: "5 march 2020",
    place: "Charpennes",
    imgUrl: "https://picsum.photos/id/11/200/300",
    imgProfil: "https://picsum.photos/id/11/200/300",
  },
  {
    name: "Aenean leo",
    date: "5 march 2020",
    place: "Charpennes",
    imgUrl: "https://picsum.photos/id/11/200/300",
    imgProfil: "https://picsum.photos/id/11/200/300",
  },
  {
    name: "Aenean leo",
    date: "5 march 2020",
    place: "Charpennes",
    imgUrl: "https://picsum.photos/id/11/200/300",
    imgProfil: "https://picsum.photos/id/11/200/300",
  },
];

const userInfo = {
  name: "Coco",
  imgProfil: "https://picsum.photos/200/300",
};

const categorie = [
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
];
export default function HomePageScreen() {
  const tabBarHeight = useBottomTabBarHeight() * 2;

  /*const [popularEvents,setPopularEvents] = React.useState(null);

  const getPopular = () =>{
    try{
      const response = await  fetch('https://eve-back.herokuapp.com/getPopular',
      {method: 'Get',
        headers: { 'content-type': 'application/json' }
      });
      setPopularEvents(await response.json());
      alert(popularEvents);
    } catch (error) {
      console.error(error);
    }
  }*/

  /* const [categories,setCategories] = React.useState(null);

  const getCategories = () =>{
      try{
        const response = await  fetch('https://eve-back.herokuapp.com/getCategories',
        {method: 'Get',
          headers: { 'content-type': 'application/json' }
        });
        setCategories(await response.json());
    } catch (error) {
        console.error(error);
    }
  }

  const [eventPerCat, setEventPerCat] = React.useState([]);

  const getEventPerCategories = () =>{
      categories.map((item)=>{
        try{
          const response = await  fetch('https://eve-back.herokuapp.com/getEvents?categorie='+item,
          {method: 'Get',
            headers: { 'content-type': 'application/json' }
          });
          var eventCat= await response.json();
          return(
            <View style={styles.events}>
                            <View style={styles.categorieEvents}>
                                <Text style={styles.title_header}>{item.name}</Text>
                            </View>  
                            <MyCarousel data={eventCat} type={{"event":"oui"}}/>                  
            </View>
          );
        } catch (error) {
            console.error(error);
        }
      });
  }*/

  /*const [userInfo, setUserInfo] = React.useState(null);

  const getUserInfo = () =>{
      try{
        const response = await  fetch('https://eve-back.herokuapp.com/getUserInfo?id=0',
        {method: 'Get',
          headers: { 'content-type': 'application/json' }
        });
        setUserInfo(await response.json());
      } catch (error) {
          console.error(error);
      }
  }*/

  return (
    <SafeAreaView style={StyleSheet.container}>
      <View style={styles.header}>
        <Text style={styles.title_header}>Hi {userInfo.name}!</Text>
        <View style={styles.infoView}>
          <Image
            style={styles.profilImage}
            source={{ uri: userInfo.imgProfil }}
          />
          <View style={styles.locationView}>
            <Text style={styles.text_header}> Lyon </Text>
            <MaterialCommunityIcons
              name="map-marker"
              color={COLORS.black}
              size={24}
            />
          </View>
        </View>
      </View>
      <ScrollView style={{ marginBottom: "15%" }}>
        <View style={styles.body}>
          <View style={styles.events}>
            <View style={styles.categorieEvents}>
              <Text style={styles.title_header}>Popular</Text>
              <MaterialCommunityIcons
                name="fire"
                color={COLORS.greyBlue}
                size={26}
              />
            </View>
            <MyCarousel data={popEvents} type={{ event: "oui" }} />
          </View>
          <View style={styles.events}>
            <View style={styles.categorieEvents}>
              <Text style={styles.title_header}>Catégories</Text>
              <MaterialCommunityIcons
                name="bookmark"
                color={COLORS.greyBlue}
                size={26}
              />
            </View>
            <MyCarousel data={categorie} type={{ event: "non" }} />
          </View>
          <View style={styles.events}>
            <View style={styles.categorieEvents}>
              <Text style={styles.title_header}>Popular</Text>
              <MaterialCommunityIcons
                name="fire"
                color={COLORS.greyBlue}
                size={26}
              />
            </View>
            <MyCarousel data={popEvents} type={{ event: "oui" }} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.beige,
  },
  title_header: {
    color: COLORS.greyBlue,
    fontSize: 25,
    fontWeight: "bold",
  },
  infoView: {
    flexDirection: "column",
    alignItems: "center",
  },
  profilImage: {
    width: 50,
    height: 50,
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
});
