import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import appColors from "../assets/colors";
import BackButton from "../components/BackButton";
import QuantiteButton from "../components/QuantiteButton";
import { addToCart } from "../redux/actions";
import { connect } from "react-redux";

const PlatDetailScreen = (props) => {
  const item = props.route.params.item;

  const [quantite, setQuantite] = React.useState(1);

  const onAdd = () => {
    props.addToCart({
      ...item,
      quantite,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.headerContainer}>
        <BackButton size={45} />
        <Text>{item.libelle}</Text>
      </View>
      <View style={styles.centerContainer}>
        <Image
          source={require("../assets/images/coca.jpg")}
          resizeMode="contain"
          style={{ height: "80%", width: "50%" }}
        />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.prix}>{item.prix} FCFA</Text>
          <View style={styles.quantiteContainer}>
            <QuantiteButton
              type="decrement"
              color={appColors.primary}
              onPress={() => {
                if (quantite > 1) {
                  setQuantite(quantite - 1);
                }
              }}
            />
            <Text style={styles.quantite}>{quantite}</Text>
            <QuantiteButton
              type="increment"
              onPress={() => setQuantite(quantite + 1)}
              color={appColors.primary}
            />
          </View>
        </View>
        <View style={styles.addToCart}>
          <View>
            <Text style={styles.total}>
              {new Intl.NumberFormat().format(quantite * item.prix)} FCFA
            </Text>
          </View>
          <TouchableOpacity style={styles.btn} onPress={() => onAdd()}>
            <Text style={styles.btn_text}>Ajouter au panier</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default connect(null, { addToCart })(PlatDetailScreen);

const styles = StyleSheet.create({
  main: {
    position: "relative",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FEFEFE",
  },
  headerContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  centerContainer: {
    flex: 2,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  bottomContainer: {
    width: "100%",
    flex: 3,
    paddingTop: 30,
    paddingHorizontal: 30,
    backgroundColor: "#F1F1F1",
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    justifyContent: "space-between",
    shadowOffset: {
      width: 30,
      height: 10,
    },
    shadowRadius: 30,
    shadowColor: "black",
    elevation: 4,
    shadowOpacity: 0.5,
  },
  prix: {
    fontSize: 25,
    fontWeight: "bold",
  },
  priceContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantiteContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "30%",
  },
  quantite: {
    fontSize: 20,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 40,
    borderRadius: 50,
    backgroundColor: appColors.primary,
    shadowOffset: { height: 10, width: 2 },
    shadowColor: "black",
    elevation: 4,
  },
  btn_text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  addToCart: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 10,
  },
});
