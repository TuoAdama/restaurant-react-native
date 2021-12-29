import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from "react-native";

const CategorieComponent = (props) => {
  return (
    <TouchableHighlight style={styles.container} onPress={(e) => console.log("Hello, world")}>
      <Text style={styles.text}>{props.item.libelle}</Text>
    </TouchableHighlight>
  );
};

export default CategorieComponent;

const styles = StyleSheet.create({
  container: {
    marginBottom:10,
    marginHorizontal:4,
    width: 120,
    borderRadius: 20,
    justifyContent: "center",
    alignItems:'center',
    backgroundColor: "#ffffff",
    borderWidth:1,
    borderColor:'#dbdbdb'
  },
  text: {
    fontSize: 20,
    fontWeight:'500'
  },
});