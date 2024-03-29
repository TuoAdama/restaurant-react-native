import React, { Component } from "react";
import { StyleSheet, View, StatusBar, Text, Image, TouchableHighlight } from "react-native";
import { CategorieComponent, PlatItem, SearchInput, CommandeDialogComponent } from '../components';

import { connect } from "react-redux";
import { addToCart, updateQuantite } from "../redux/actions";
import { FlatList } from "react-native-gesture-handler";
import { getAllPlats, getAllCategories, sendTokenToServer } from '../data/ApiRequest'

import { getRegisterToken } from '../notifications/nofitications';
import * as Notifications from 'expo-notifications'
import BottomModal from "../components/BottomModal";
import { capitalize } from "../utils/StringHelper";
import { MaterialIcons } from "@expo/vector-icons";
import PlatModalElement from "../components/PlatModalElement";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      itemSelected: null,
      plats: [],
      categories: [],
      categorieSelected: null,
    };

    this.allPlats = [];
    this.onSubmit = this.onSubmit.bind(this);
    this.bottomSheetModalRef = React.createRef(null);
  }

  componentWillMount() {

    getRegisterToken().then(token => sendTokenToServer(token));

    Promise.all([getAllPlats(), getAllCategories()]).then(
      ([platsRes, categoriesRes]) => {
        this.allPlats = platsRes;
        this.setState({
          plats: platsRes,
          categories: categoriesRes,
          categorieSelected: categoriesRes.find((item) => item.id == 0),
        });
      }
    );
  }

  onSearch(search) {
    let results = this.getPlatByCurrentCategorie(this.state.categorieSelected);

    if (search.trim().length) {
      results = this.allPlats.filter((item) =>
        item.libelle.toLowerCase().startsWith(search.trim().toLowerCase())
      );
    }

    this.setState({
      plats: results,
    });
  }

  addItem(item) {
    this.setState({
      itemSelected: item,
    });
    this.bottomSheetModalRef.current?.present();
  }

  onSubmit(qte) {
    const selectItem = this.state.itemSelected;

    let index = this.props.panier.findIndex((item) => item.id == selectItem.id);
    if (index == -1) {
      this.props.addToCart({
        ...selectItem,
        quantite: qte,
      });
    } else {
      this.props.updateQuantite(selectItem, qte);
    }

    this.bottomSheetModalRef.current?.close();
  }

  onClose() {
    this.setState({
      visible: false,
      itemSelected: null,
    });
  }

  onSelectCategorie(currentCategorie) {
    let result = this.getPlatByCurrentCategorie(currentCategorie);
    this.setState({
      categorieSelected: currentCategorie,
      plats: result,
    });
  }

  onTapPlatItem = (item) => {
    this.props
      .route
      .params
      .navigationToDetail.navigate("PlatDetail", {
        item,
      });
  };

  getPlatByCurrentCategorie(currentCategorie) {
    let results = this.allPlats;

    if (currentCategorie.id != 0) {
      results = this.allPlats.filter(
        (plat) => plat.categorie == currentCategorie.libelle
      );
    }
    return results;
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar />
        <View>
          <SearchInput onChangeText={this.onSearch.bind(this)} />
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={this.state.categories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CategorieComponent
                item={item}
                selected={this.state.categorieSelected.id == item.id}
                onSelect={() => this.onSelectCategorie(item)}
              />
            )}
          />
        </View>
        <FlatList
          style={styles.platList}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={this.state.plats}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => (
            <PlatItem
              item={item}
              onAdd={() => this.addItem(item)}
              onTap={this.onTapPlatItem}
            />
          )}
        />
        <BottomModal bottomSheetModalRef={this.bottomSheetModalRef}>
          <PlatModalElement plat={this.state.itemSelected} onSubmit={this.onSubmit} />
        </BottomModal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 13,
  },
  section: {
    fontSize: 30,
    fontWeight: "bold",
  },
  plats: {
    flexDirection: "row",
    flexWrap: "wrap",
  }
});

const mapStateToProps = (state) => ({
  panier: state.panier,
});

export default connect(mapStateToProps, { addToCart, updateQuantite })(
  HomeScreen
);
