import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";

import { firebase } from "../../firebase/config";

const RegisterScreen = ({ navigation }) => {
  const [nom, setNom] = React.useState("");
  const [prenom, setPrenom] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmit = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email.trim().toLowerCase(), password)
      .then((credential) => {
        storePersonnel(credential.user);
      })
      .catch((error) => alert(error));
  };

  const onConnexion = () => {
    navigation.navigate("LoginScreen");
  };

  const storePersonnel = async (user) => {
    const personel = {
      uid: user.uid,
      pid: 1,
      nom: nom.trim().toLowerCase(),
      prenom: prenom.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
    };

    firebase
      .firestore()
      .collection("personnels")
      .doc(user.uid)
      .set(personel)
      .then((_) => navigation.replace("Index", { personnel: personel }))
      .catch((error) => {
        alert(error);
        alert('store personnel')
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> S'enregistrer</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={nom}
        onChangeText={(e) => setNom(e)}
      />
      <TextInput
        style={styles.input}
        placeholder="Prenom"
        value={prenom}
        onChangeText={(e) => setPrenom(e)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(e) => setEmail(e)}
      />
      <TextInput
        style={styles.input}
        placeholder="mot de passe"
        value={password}
        onChangeText={(e) => setPassword(e)}
        secureTextEntry={true}
      />
      <TouchableHighlight style={styles.btn} onPress={onSubmit}>
        <Text style={styles.btnText}>valider</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={[styles.btn, { backgroundColor: "red" }]}
        onPress={onConnexion}
      >
        <Text style={styles.btnText}>connection</Text>
      </TouchableHighlight>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 50,
    marginVertical: 10,
    padding: 15,
    backgroundColor: "#EBEBEB",
    borderRadius: 10,
    fontSize: 15,
    fontWeight: "400",
    width: "80%",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#557FF1",
    borderRadius: 15,
    height: 50,
    marginTop: 12,
    width: "80%",
  },
  btnText: {
    color: "white",
    fontSize: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    position: "relative",
    top: -30,
  },
});
