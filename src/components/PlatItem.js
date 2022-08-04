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

import { styles as monStyle } from "../assets/styles";

import "intl";
import "intl/locale-data/jsonp/fr";
import { capitalize, formPrix } from '../utils/StringHelper'

import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const PlatItem = (props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.onTap(props.item)}
    >
      <View style={[styles.imageContainer, monStyle.alignCenter]}>
        <Image
          style={styles.image}
          resizeMode="stretch"
          source={{ uri: props.item.images[0] }}
        />
      </View>
      <View style={monStyle.alignCenter}>
        <Text style={styles.title}>{capitalize(props.item.libelle)}</Text>
      </View>
      <View style={styles.description}>
        <Text>{formPrix(props.item.prix)} FCFA</Text>
        <TouchableHighlight onPress={props.onAdd}>
          <MaterialIcons name="add-box" size={28} color="black" />
        </TouchableHighlight>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: (width - 50) / 2,
    height: 200,
    margin: 5,
    justifyContent: "space-around",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 2,
    borderRadius: 10,
  },
  image: {
    height: 100,
    width: "80%",
  },
  description: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  section: {
    width: '100%',
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: 'bold',
  },
});

export default PlatItem;
