import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Button,
  Picker,
} from "react-native";
import CartItem from "../components/CartItem";
import { connect } from "react-redux";
import { removeCartItem, updateQuantite, clearCart } from "../redux/actions";
import { addToCommande } from "../redux/actions/commandesAction";
import "intl";
import "intl/locale-data/jsonp/fr";
import Dialog from "react-native-dialog";
import { storeCommande, getPersonnelByUserId } from "../../firebase/data";
import { currentDateTime } from "../utils/date";

const PanierScreen = (props) => {
  const [visible, setVisible] = React.useState(false);
  const tables = ["TAB001", "TAB002", "TAB003", "TAB004"];
  const [tableSelected, settableSelected] = React.useState(tables[0]);

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

  const handlerConfirm = async () => {
    setVisible(true);
  };

  const handlerValid = async () => {
    setVisible(false);

    const personnel = await getPersonnelByUserId();

    const commande = {
      personnel,
      table: tableSelected,
      createdAt: currentDateTime(),
      status: "EN COURS",
      items: props.panier,
    };
    await storeCommande(commande);
    props.clearCart();
  };

  const showPanier = () => {
    return (
      <View style={styles.container}>
        <Dialog.Container visible={visible}>
          <Text style={styles.confirmTitle}>Numero de table:</Text>
          <Picker
            style={styles.confirmPicker}
            selectedValue={tableSelected}
            onValueChange={(itemValue, itemIndex) =>
              settableSelected(itemValue)
            }
          >
            {tables.map((tab, id) => (
              <Picker.Item key={id} label={tab} value={tab} />
            ))}
          </Picker>
          <Button title="valider" onPress={handlerValid} />
          <View style={{ marginBottom: 12 }}></View>
          <Button
            title="annuler"
            color="#e63946"
            onPress={() => setVisible(false)}
          />
        </Dialog.Container>
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
    marginBottom: 20,
  },
  cartTotal: {
    marginTop: 10,
    borderRadius: 20,
    height: 130,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.41,
    elevation: 2,
  },
  btn: {
    padding: 15,
    width: "50%",
    borderRadius: 25,
    backgroundColor: "#e91e63",
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.41,
    elevation: 3,
  },
  btnText: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
  },
  confirmPicker: {
    marginVertical: 10,
    height: 50,
    borderWidth: 1,
  },
  confirmTitle: {
    fontSize: 18,
    fontWeight: "400",
  },
});

const mapStateToProps = (state) => ({
  panier: state.panier,
  commandes: state.commandes,
});

export default connect(mapStateToProps, {
  removeCartItem,
  updateQuantite,
  clearCart,
  addToCommande,
})(PanierScreen);
