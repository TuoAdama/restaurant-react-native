import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import appColors from "../assets/colors";
import { BackButton, QuantiteButton } from '../components';
import { addToCart } from "../redux/actions";
import { connect } from "react-redux";
import { getPlatByCategorieLibelle } from "../../firebase/data";
import { useToast } from 'react-native-toast-notifications';


const PlatDetailScreen = (props) => {
  const item = props.route.params.item;
  const navigation = props.navigation;
  const toast = useToast()

  const [suggestionItems, setSuggestionItems] = useState([])

  useEffect(() => {
    getPlatByCategorieLibelle(item).then(res => setSuggestionItems(res))
  }, [])

  const [quantite, setQuantite] = React.useState(1);

  const onAdd = () => {
    const elmt = props.addToCart({
      ...item,
      quantite,
    });

    if (elmt) {
      toast.show('Ajouté au panier !', {
        type:'success',
        duration:3000,
        animationType:'zoom-in',
        placement:'top'
      })
    }
  };


  const capitilizeFirstLetter = (value) => {
    return value[0].toUpperCase() + value.slice(1).toLowerCase();
  };

  const suggestionItemElement = (item, index) => {
    console.log(item.images[0]);
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          navigation.navigate("PlatDetail", {
            item,
          })
        }}
        style={styles.suggestionChild}
      >
        <Image resizeMode="contain"
          source={{ uri: item.images[0] }}
          style={{ width: '100%', height: '100%' }}
        />
      </TouchableOpacity>
    );
  }

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
          {suggestionItems.length == 0 || <View>
            <Text style={styles.descriptionLibelle}>Suggestions</Text>
            <ScrollView
              horizontal={true}
              contentContainerStyle={styles.suggestion}
              showsHorizontalScrollIndicator={false}
            >
              {suggestionItems.map((item, index) => suggestionItemElement(item, index))}
            </ScrollView>
          </View>}
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
    fontSize: 20,
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
    width: 150,
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
  priceTotal: {
    fontSize: 20,
    fontWeight: "bold",
  },
  addToCart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
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
  descriptionLibelle: {
    marginTop: 20,
    fontSize: 20,
    color: "black",
    fontWeight: "700",
    opacity: 0.5,
  },
  suggestion: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "red",
    height: 100,
  },
  suggestionChild: {
    marginRight: 10,
    width: 70,
    height: 60,
    padding: 5,
    shadowOffset: { height: 1, width: 2 },
    shadowColor: "black",
    elevation: 2,
  },
});
