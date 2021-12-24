import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from "react-native";

const CategorieComponent = () => {
  return (
    <TouchableHighlight style={styles.container} onPress={(e) => console.log("Hello, world")}>
      <View style={styles.subContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/fruit.jpg")}
        />
        <Text style={styles.text}>Fruit</Text>
      </View>
    </TouchableHighlight>
  );
};

export default CategorieComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginTop: 15,
    marginHorizontal:4,
    width: 130,
    borderRadius: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    shadowColor: "#000",
    backgroundColor: "#ffe",
    paddingBottom: 10,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.41,

    elevation: 2,
  },
  subContainer:{
    alignItems:'center'
  },
  image: {
    resizeMode: "contain",
    width: 110,
    height: 80,
  },
  text: {
    fontSize: 20,
    fontWeight: "700",
  },
});