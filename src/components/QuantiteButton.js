import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const QuantiteButton = (props) => {
  const { type, size, color } = props;

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={props.style || styles.default}
    >
      <Ionicons
        name={
          type == "increment"
            ? "ios-add-circle-outline"
            : "ios-remove-circle-outline"
        }
        size={size || 35}
        color={color || 'black'}
      />
    </TouchableOpacity>
  );
};

export default QuantiteButton;

const styles = StyleSheet.create({
  default: {},
});
