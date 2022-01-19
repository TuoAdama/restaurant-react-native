import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BackButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <Ionicons
        name="ios-chevron-back-outline"
        size={props.size}
        color={props.color || "black"}
      />
    </TouchableOpacity>
  );
};

export default BackButton;
