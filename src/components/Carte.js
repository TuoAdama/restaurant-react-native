import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';

const Carte = ({item}) => {
  return (
    <View style={styles.container}>
      <Text>{item.libelle}</Text>
    </View>
  );
};

export default Carte;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'skyblue',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
    }
});
