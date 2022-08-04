import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";

const CommandeItem = (props) => {
  const getHour = () => {
    const hours = /\d{2}:\d{2}/.exec(props.commande.createdAt).toString();
    return hours;
  };

  const status = props.commande.status;

  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <Text style={styles.textStyle}>{props.commande.table}</Text>
        <Text
          style={[styles.status, status == "EN COURS" || { color: "#20c997" }]}
        >
          {status}
        </Text>
      </View>
      <View style={styles.table}>
        <Text style={styles.textStyle}>
          Total:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {props.commande.total} FCFA
          </Text>
        </Text>
        <Text style={styles.textStyle}>{getHour()}</Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={props.showDetail}>
        <Text style={styles.text_btn}>Details</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommandeItem;

const styles = StyleSheet.create({
  container: {
    minHeight: 130,
    width: "95%",
    borderRadius: 25,
    padding: 30,
    paddingVertical: 10,
    margin: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    elevation: 4,
    shadowOpacity: 0.5,
  },
  table: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },

  textStyle: {
    fontSize: 18,
  },
  status: {
    color: "red",
    fontWeight: "bold",
  },
  text_btn: {
    color: "#0b8aad",
    fontSize: 18,
  },
  btn: {
    marginTop: 5,
  },
});
