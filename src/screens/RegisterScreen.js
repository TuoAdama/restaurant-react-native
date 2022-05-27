import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  ActivityIndicator
} from "react-native";

import { registerPersonnel } from '../data/ApiRequest'

const RegisterScreen = ({ navigation }) => {
  const [nom, setNom] = React.useState("");
  const [prenom, setPrenom] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);

  const onSubmit = () => {

    setDisabled(true);

    let firstname = nom.trim().toLowerCase();
    let lastname = prenom.trim().toLowerCase();
    let useremail = email.trim().toLowerCase();

    if(firstname == '' || lastname=='' || useremail == ""){
      alert('Tous les champs doivent être remplis');
      setDisabled(false);
      return;
    }

    registerPersonnel(firstname+' '+lastname, useremail, password)
      .then(response => {
        console.log(response);
        if (response.token) {
          global.personnel = response.personnel;
          global.personnel.token = response.token;

          navigation.replace("Index", { personnel: global.personel });

        } else {
          setDisabled(false);
          if(response.errors.email){
            alert(response.errors.email[0]);
          }else{
            alert('Les données renseignées sont incorrectes')
          }
        }
      })

  };

  const onConnexion = () => {
    navigation.navigate("LoginScreen");
  };

  const storePersonnel = async (user) => {


    // firebase
    //   .firestore()
    //   .collection("personnels")
    //   .doc(user.uid)
    //   .set(personel)
    //   .then((_) => navigation.replace("Index", { personnel: personel }))
    //   .catch((error) => {
    //     alert(error);
    //     alert('store personnel')
    //   });
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
      <TouchableHighlight style={styles.btn} onPress={onSubmit}
        disabled={disabled}
      >
        {disabled ? <ActivityIndicator size="large" color="black" /> : <Text style={styles.btnText}>valider</Text>}
      </TouchableHighlight>
      <TouchableHighlight
        style={[styles.btn, { backgroundColor: "red" }]}
        disabled={disabled}
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
