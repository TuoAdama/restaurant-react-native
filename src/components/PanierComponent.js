import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import CartItem from "./CartItem";
import { connect } from "react-redux";
import { removeCartItem, updateQuantite } from "../redux/actions";
import 'intl';
import "intl/locale-data/jsonp/fr";

const PanierComponent = (props) => {
  const onRemove = (i) => {
    props.removeCartItem(i);
  };
  const incrementQuantite = (i) => {
    const index = props.panier.findIndex((item) => item.id == i);
    setQuantite(props.panier[index], props.panier[index].quantite + 1);
  };
  const decrementQuantite = (i) => {
    const index = props.panier.findIndex((item) => item.id == i);
    if (props.panier[index].quantite > 1) {
      setQuantite(props.panier[index], props.panier[index].quantite - 1);
    }
  };

  const setQuantite = (item, qte) => {
    props.updateQuantite(item, qte);
  };

  const handlerConfirm = () => {
    console.log(props.panier);
  }
  

  const showPanier = () => {
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
        <View style={styles.cartTotal}>
          <Text style={styles.total}>Total : {printTotal()} FCFA</Text>
          <TouchableOpacity style={styles.btn} onPress={handlerConfirm}>
            <Text style={styles.btnText}>confirmer</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const printTotal = () => {
    let total = 0;
    props.panier.forEach((item) => {
      total += item.prix * item.quantite;
    });
    return new Intl.NumberFormat().format(total);
  };

  return props.panier.length > 0 ? (
    showPanier()
  ) : (
    <View
      style={[
        styles.container,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <Text>Panier vide</Text>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
  },
  renderItem: {
    height: 150,
    width: 150,
    borderStyle: "solid",
    borderColor: "#000",
  },
  total: {
    fontSize: 18,
    marginBottom:20,
  },
  cartTotal: {
    marginTop:10,
    borderRadius: 20,
    height: 130,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.41,
    elevation: 2,
  },
  btn:{
    padding:15,
    width:'50%',
    borderRadius:25,
    backgroundColor:'#e91e63',
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.41,
    elevation: 3,
  },
  btnText:{
    textAlign:'center',
    color:'white',
    fontSize:18,
  }
});

const mapStateToProps = (state) => ({
  panier: state.panier,
});

export default connect(mapStateToProps, { removeCartItem, updateQuantite })(
  PanierComponent
);
