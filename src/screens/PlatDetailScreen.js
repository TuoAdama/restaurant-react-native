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
  console.log(item);

  const [quantite, setQuantite] = React.useState(1);

  const onAdd = () => {
    props.addToCart({
      ...item,
      quantite,
    });
  };

  const capitilizeFirstLetter = (value) => {
    return value[0].toUpperCase() + value.slice(1).toLowerCase();
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.headerContainer}>
        <BackButton size={45} onPress={() => props.navigation.goBack()} />
      </View>
      <View style={styles.centerContainer}>
        <Image
          source={{ uri: item.images[0] }}
          resizeMode="contain"
          style={{ height: "80%", width: "70%" }}
        />
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
      <View style={styles.description}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {capitilizeFirstLetter(item.libelle)}
          </Text>
          <Text style={styles.subtitle}>
            {capitilizeFirstLetter(item.categorie)}
          </Text>
          <View>
            <Text style={styles.descriptionLibelle}>Description</Text>
            <Text>Aucune description</Text>
          </View>
        </View>
        <View style={styles.addToCart}>
          <View style={styles.total}>
            <Text style={styles.libelleTotal}>Total</Text>
            <Text style={styles.priceTotal}>
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
  description: {
    width: "100%",
    flex: 3,
    paddingTop: 15,
    paddingLeft: 20,
    paddingEnd: 10,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    opacity: 0.6,
  },
  titleContainer: {
    justifyContent: "space-between",
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
    height: 60,
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
  priceTotal: {
    fontSize: 23,
    fontWeight: "bold",
  },
  addToCart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: appColors.primary,
  },
  libelleTotal: {
    fontSize: 18,
    opacity: 0.5,
  },
  descriptionLibelle:{
    marginTop:15,
    fontSize:20,
    color:'black'
  }
});
