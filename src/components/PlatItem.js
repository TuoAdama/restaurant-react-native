import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import CommandeDialogComponent from "./CommandeDialogComponent";


const PlatItem = (props) => {
  const [visible, setVisible] = useState(false);

  const show = () => {
    console.log('showing...')
    setVisible(true);
  };

  const onTap = () => {
    console.log("On tap");
  };

  return (
    <View>
      <Pressable style={styles.container} onPress={onTap}>
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
            <TouchableHighlight
              style={styles.description_right}
              onPress={show}
            >
              <Ionicons name="ios-add-circle-outline" size={30} color="black" />
            </TouchableHighlight>
          </View>
        </View>
      </Pressable>
      <CommandeDialogComponent
        show={visible}
        setShow={setVisible}
        item={props.item}
      />
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