import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions
} from "react-native";

import "intl";
import "intl/locale-data/jsonp/fr";

import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get('window');

const PlatItem = (props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.onTap(props.item)}
    >
      <View style={styles.section}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{ uri: props.item.images[0] }}
        />
        <View style={styles.description}>
          <View>
            <Text>{props.item.libelle}</Text>
            <Text>{new Intl.NumberFormat().format(props.item.prix)} FCFA</Text>
          </View>
          <TouchableHighlight onPress={props.onAdd}>
            <Ionicons name="ios-add-circle-outline" size={30} color="black" />
          </TouchableHighlight>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: (width - 50) / 2,
    height: 150,
    margin:5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation:2,
    borderRadius:10,
  },
  image: {
    height: 70,
    width: "80%",
  },
  description: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width:'70%'
  },
  section:{
    width:'100%',
    justifyContent: "center",
    alignItems: "center",
  }
});

export default PlatItem;
