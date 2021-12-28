import React from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import CartItem from "./CartItem";
import { connect } from "react-redux";
import { removeCartItem, updateQuantite } from "../redux/actions";

const PanierComponent = (props) => {
  const onRemove = (i) => {
    props.removeCartItem(i);
  };
  const incrementQuantite = (i) => {
    const index = props.panier.findIndex((item) => item.id == i);
    setQuantite(props.panier[index], props.panier[index].quantite +1)
  };
  const decrementQuantite = (i) => {
    const index = props.panier.findIndex((item) => item.id == i);
    if (props.panier[index].quantite > 1) {
      setQuantite(props.panier[index], props.panier[index].quantite - 1)
    }
  };
  
  const setQuantite = (item, qte) => {
    props.updateQuantite(item, qte);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={props.panier}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onRemove={() => onRemove(item.id)}
            incrementQuantite={() => incrementQuantite(item.id)}
            decrementQuantite={() => decrementQuantite(item.id)}
          />
        )}
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
  renderItem: {
    height: 150,
    height: 150,
    width: 150,
    width: 150,
    borderStyle: "solid",
    borderColor: "#000",
  },
});

const mapStateToProps = (state) => ({
  panier: state.panier,
});

export default connect(mapStateToProps, { removeCartItem, updateQuantite })(
  PanierComponent
);