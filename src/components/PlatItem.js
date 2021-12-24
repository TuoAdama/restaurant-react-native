import React from "react";
import { Pressable, StyleSheet, Text, View, Image, TouchableHighlight } from "react-native";
import {addToCart} from '../redux/actions'
import {connect} from 'react-redux'
import { Ionicons } from "@expo/vector-icons";

const PlatItem = (props) => {  
  
    const onAdd = () => {
        console.log(props.addToCart(props.item))
    }

    const onTap = () => {
        console.log('On tap');
    }
  
    return (
    <Pressable
      style={styles.container}
      onPress={onTap}
    >
      <View style={styles.cart}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={require("../assets/images/coca.jpg")}
        />
        <View style={styles.description}>
          <View style={styles.description_left}>
            <Text>{props.item.libelle}</Text>
            <Text>{props.item.prix} FCFA</Text>
          </View>
          <TouchableHighlight style={styles.description_right} onPress={onAdd}>
            <Ionicons name="ios-add-circle-outline" size={30} color="black" />
          </TouchableHighlight>
        </View>
      </View> 
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.41,
    elevation: 2,
  },
  image: {
    height: 150,
    width: 150,
  },
  description: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default connect(null, {addToCart})(PlatItem);