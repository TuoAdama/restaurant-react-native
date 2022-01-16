import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";

import { firebase } from "../../firebase/config";
import appColors from "../assets/colors";

export default function LoginScreen({ navigation }) {
  const [username, onChangeUsername] = React.useState("tuoadama17@gmail.com");
  const [password, onChangePassword] = React.useState("tuoadama123456");
  const [disableButton, setDisableButton] = React.useState(false);

  const onSubmitHandler = () => {
    setDisableButton(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then((credential) => {
        firebase
          .firestore()
          .collection("personnels")
          .doc(credential.user.uid)
          .get()
          .then((firestoreDoc) => {
            if (!firestoreDoc.exists) {
              alert("Personnel n'existe pas");
              return;
            }
            navigation.replace("Index", { personnel: firestoreDoc.data() });
          });
      })
      .catch((error) => {
        alert(error);
        setDisableButton(false)
      });
  };

  const onRegisterHandler = () => {
    navigation.navigate("RegisterScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.titles}>
        <Text style={styles.title}>Mon </Text>
        <Text style={styles.title}>compte</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="nom d'utilisateur"
          value={username}
          onChangeText={onChangeUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="mot de passe"
          value={password}
          onChangeText={onChangePassword}
          secureTextEntry={true}
        />
        <TouchableHighlight
          style={[
            styles.btn,
            { backgroundColor: disableButton ? "#dddddd" : "#557FF1" },
          ]}
          onPress={onSubmitHandler}
          disabled={disableButton}
        >
          {disableButton ? (
            <ActivityIndicator size="large" color="black" />
          ) : (
            <Text style={styles.btnText}>Se connecter</Text>
          )}
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.btn, { backgroundColor: appColors.primary }]}
          onPress={onRegisterHandler}
        >
          <Text style={styles.btnText}>S'enregistrer</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  titles: {
    position: "relative",
    bottom: 60,
  },

  title: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    height: 50,
    marginVertical: 10,
    padding: 15,
    backgroundColor: "#EBEBEB",
    borderRadius: 10,
    fontSize: 15,
    fontWeight: "400",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#557FF1",
    borderRadius: 15,
    height: 50,
    marginTop: 12,
  },
  btnText: {
    color: "white",
    fontSize: 20,
  },
  form: {
    width: "80%",
  },
  error: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
    color: "red",
  },
});
