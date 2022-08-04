import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import "intl";
import "intl/locale-data/jsonp/fr";
import {capitalize, formPrix} from '../utils/StringHelper'

const PanierItem = (props) => {
  return (
    <View style={[styles.container, styles.border]}>
      <View style={styles.cartImage}>
        <Image
          source={{ uri: props.item.images[0] }}
          resizeMode="contain"
          style={styles.image}
        />
        <View style={{marginLeft:5}}>
          <Text style={styles.title}>{capitalize(props.item.libelle)}</Text>
          <Text>{formPrix(props.item.prix)} FCFA</Text>
        </View>
      </View>
      <View style={[styles.quantite]}>
        <TouchableOpacity onPress={props.decrementQuantite}>
          <Ionicons name="ios-remove-circle-outline" size={40} color="black" />
        </TouchableOpacity>
        <Text>{props.item.quantite}</Text>
        <TouchableOpacity onPress={props.incrementQuantite}>
          <Ionicons name="ios-add-circle-outline" size={40} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={props.onRemove}>
        <FontAwesome5 name="trash" size={24} color="red" />
      </TouchableOpacity>
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PanierItem;
