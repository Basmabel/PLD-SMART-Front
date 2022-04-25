import React from 'react'
import{ StyleSheet, Dimensions, Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel'
import CarouselCard, { SLIDER_WIDTH, ITEM_WIDTH } from '../components/CarouselCard'
import CategorieCard, { SLIDER_W, ITEM_W } from '../components/CategorieCard'
import ReviewCard from '../components/ReviewCard'




const widthWind = Dimensions.get('window').width;
const MyCarousel = ({data, type,navigation}) => {
  const isCarousel = React.useRef(null);
  const [index, setIndex] = React.useState(0);

  var obj=null;
    
  if(type.event==="oui"){
       obj = {card:CarouselCard,sliderWidth:SLIDER_WIDTH, width:ITEM_WIDTH,margin:-50};
      
  }else if (type.event==="non"){
       obj = {card:CategorieCard,sliderWidth:SLIDER_W, width:ITEM_W,margin:-120};
  }else if(type.event==="review"){
      obj = {card:ReviewCard,sliderWidth:SLIDER_W, width:Dimensions.get("window").width*0.75,margin:0};
  }

  const Item = ({item,index})=>{
    // Now you can use it
    if(type.event==="non"){
      return (<CategorieCard item={item} index={index} navigation={navigation}/>);
    }else if (type.event==="oui"){
      return (<CarouselCard item={item} index={index} />);
    }else if(type.event==="review"){
      return (<ReviewCard item={item} index={index} width={Dimensions.get("window").width*0.75}/>);
    }
    
  }

  return (
    <View >
      <Carousel
        layout={'default'}
        ref={isCarousel}
        data={data}
        renderItem={Item}
        sliderWidth={widthWind}
        itemWidth={obj.width+20}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        activeSlideAlignment={'start'}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
      />
    </View>
  )
}

export default MyCarousel;
