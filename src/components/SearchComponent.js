import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

export default class SearchComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <EvilIcons style={styles.icon} name="search" size={30} color="black" />
        <TextInput style={styles.input} onChangeText={this.props.onChange} placeholder='recherche'/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flexDirection:'row',
      justifyContent:'center',
      backgroundColor: "#EBEBEB",
      alignItems:'center',
      borderWidth:1,
      borderColor: "#dee2e6",
      borderWidth: 2,
      height:50,
      borderRadius: 10,
      paddingLeft:10,
      marginBottom:18
  },
  input: {
    flex:1,
    height: 50,
    marginVertical: 10,
    padding: 15,
    fontSize: 20,
    fontWeight: "400",
    padding: 12,
  },
  icon:{
    fontWeight:'bold',
    color:'blue'
  }
});
