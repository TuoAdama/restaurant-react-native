import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  StatusBar,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [username, onChangeUsername] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [isValid, onChangeIsValid] = React.useState();

  const credential = {
    username: "Admin",
    password: "Admin",
  };

  function onValid() {
    return credential.username == username && credential.password == password;
  }

  const onSubmitHandler = () => {
    onChangeIsValid(onValid());
    
    
    if (onValid()) {
      navigation.replace("Index");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titles}>
        <Text style={styles.title}>Mon </Text>
        <Text style={styles.title}>compte</Text>
      </View>
      <View style={styles.form}>
        { (isValid != undefined && isValid == false) && (
          <Text style={styles.error}>Identenfiant incorrect</Text>
        )}
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
        <TouchableHighlight style={styles.btn} onPress={onSubmitHandler}>
          <Text style={styles.btnText}>Se connecter</Text>
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
