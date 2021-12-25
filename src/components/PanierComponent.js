import React from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import CartItem from "./CartItem";
import {connect} from 'react-redux'

const PanierComponent = (props) => {
    return (
    <View style={styles.container}>
      {/* <Button title='Test' onPress={() => {
        console.log(props.panier)
      }}/> */}
      <FlatList
        data={props.panier}
        renderItem={CartItem}
        keyExtractor={(item) => item.id}
        horizontal={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
  },
  renderItem: {height: 150,height: 150,
    width: 150,
    width: 150,
    borderStyle: "solid",
    borderColor: "#000",
  },
});

const mapStateToProps = (state) => ({
    panier: state.panier
});

export default connect(mapStateToProps)(PanierComponent);
