import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

const PlatItem = (props) => {
  return (
    <View>
      <Pressable style={styles.container}>
        <View>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={require("../assets/images/coca.jpg")}
          />
          <View style={styles.description}>
            <View>
              <Text>{props.item.libelle}</Text>
              <Text>{props.item.prix} FCFA</Text>
            </View>
            <TouchableHighlight onPress={props.onAdd}>
              <Ionicons name="ios-add-circle-outline" size={30} color="black" />
            </TouchableHighlight>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
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

export default PlatItem;
