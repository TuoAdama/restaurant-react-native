import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import Dialog from "react-native-dialog";

const CommandeDialogComponent = (props) => {
  const [qte, setQte] = useState(1);

  return (
    <Dialog.Container visible={props.visible}>
      <View>
        <View>
          <View style={styles.container}>
            <Pressable
              onPress={() => {
                if (qte > 1) {
                  setQte(qte - 1);
                }
              }}
            >
              <Ionicons
                name="ios-remove-circle-outline"
                size={40}
                color="red"
              />
            </Pressable>
            <Text style={styles.qte}>{qte}</Text>
            <Pressable onPress={() => setQte(qte + 1)}>
              <Ionicons name="ios-add-circle-outline" size={40} color="black" />
            </Pressable>
          </View>
        </View>
        <View styles={styles.btn}>
          <Button
            title="Valider"
            onPress={() => {
              props.onSubmit(qte);
            }}
          />
          <View style={{ marginBottom: 12 }}></View>
          <Button title="Annuler" onPress={props.onClose} color="#e63946" />
        </View>
      </View>
    </Dialog.Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 30,
  },
  qte: {
    fontSize: 20,
  },
  btn: {
    padding: 3,
  },
});

export default CommandeDialogComponent;
