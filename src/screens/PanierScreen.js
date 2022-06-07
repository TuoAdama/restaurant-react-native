import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Button,
  Picker,
} from "react-native";
import PanierItem from "../components/PanierItem";
import { connect } from "react-redux";
import { removeCartItem, updateQuantite, clearCart } from "../redux/actions";
import { addToCommande } from "../redux/actions/commandesAction";
import "intl";
import "intl/locale-data/jsonp/fr";
import Dialog from "react-native-dialog";
import { currentDateTime } from "../utils/date";
import appColors from '../assets/colors'
import {storeCommande, getTablesClient} from '../data/ApiRequest'

const PanierScreen = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [tables, setTables] = React.useState([]);
  const [tableSelected, settableSelected] = React.useState(tables[0]);

  useEffect(() => {
    getTablesClient().then(res =>  {
      setTables(res)
      settableSelected(tables[0]);
    })
  },[]);

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

    const commande = {
      table: tableSelected,
      createdAt: currentDateTime(),
      status: "EN COURS",
      items: props.panier,
      total:getTotal()
    };
    storeCommande(commande)
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
            color={appColors.primary}
            onPress={() => setVisible(false)}
          />
        </Dialog.Container>
        <FlatList
          data={props.panier}
          renderItem={({ item }) => (
            <PanierItem
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
          <Text style={styles.total}>Total : {getTotal()} FCFA</Text>
          <TouchableOpacity style={styles.btn} onPress={handlerConfirm}>
            <Text style={styles.btnText}>confirmer</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const getTotal = () => {
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
