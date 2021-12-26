import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import {updateQuantite, removeCartItem} from '../redux/actions'
import {connect} from 'react-redux'

const CartItem = (props) => {

  const incrementQte = () => {
    // updateQte(props.item, props.item.quantite)
  }

  const decrementQte = () => {
    // if (props.item.quantite > 1) {
    //   updateQte(props.item, props.item.quantite)
    // }
  }

  const updateQte = (qte) => {
    // console.log(props.updateQuantite(props.item, qte))
  }

  const remove = () => {
    props.removeCartItem(props.item.id)
  }

  return (
    <View style={[styles.container, styles.border]}>
      <View style={styles.cartImage}>
        <Image
          source={require("../assets/images/coca.jpg")}
          resizeMode="contain"
          style={styles.image}
        />
        <Text>{props.item.libelle}</Text>
      </View>
      <View style={[styles.quantite]}>
        <TouchableHighlight onPress={decrementQte}>
          <Ionicons name="ios-remove-circle-outline" size={30} color="black" />
        </TouchableHighlight>
        <Text>{props.item.quantite}</Text>
        <TouchableHighlight onPress={incrementQte}>
          <Ionicons name="ios-add-circle-outline" size={30} color="black" />
        </TouchableHighlight>
      </View>
      <TouchableHighlight onPress={remove}>
        <FontAwesome5 name="trash" size={24} color="red" />
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 5,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.41,
    elevation: 2,
  },
  cartImage: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantite: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "27%",
  },
  image: {
    height: 70,
    width: 70,
  },
});

export default connect(null,{removeCartItem})(CartItem);
