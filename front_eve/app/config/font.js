import {useFonts} from "@expo-google-fonts/dev";
import AppLoading from "expo-app-loading";
import { 
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold
} from '@expo-google-fonts/dev'

  var [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold
  });

  export const FONTS = ()=>{
    if(!fontsLoaded){
      return(<AppLoading/>)
    }
      regular = 'Montserrat_400Regular',
      semibold = 'Montserrat_600SemiBold'
    
  }