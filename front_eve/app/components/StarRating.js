import React from "react";
import { StyleSheet, View, Text } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS } from "../config/colors";

const StarRating = (props) => {

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
    },
    star: {
      color: props.color,
    },
    text: {
      fontSize: 20,
      marginLeft: 5,
      color: props.color,
    },
  });

  // This array will contain our star tags. We will include this
  // array between the view tag.
  let stars = [];
  // Loop 5 times
  for (var i = 1; i <= 5; i++) {
    // set the path to filled stars
    let name = "ios-star";
    // If ratings is lower, set the path to unfilled stars
    if (i > props.ratings) {
      name = "ios-star-outline";
    }

    stars.push(<Ionicons name={name} size={20} style={styles.star} key={i} />);
  }

  return (
    <View style={styles.container}>
      {stars}
      <Text style={styles.text}>({props.reviews})</Text>
    </View>
  );
};

export default StarRating;


