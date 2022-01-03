import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import CategorieComponent from "../components/CategorieComponent";
import PlatItem from "../components/PlatItem";
import SearchComponent from "../components/SearchComponent";
import { FlatGrid } from "react-native-super-grid";
import { connect } from "react-redux";
import { addToCart, updateQuantite } from "../redux/actions";
import CommandeDialogComponent from "../components/CommandeDialogComponent";
import { FlatList } from "react-native-gesture-handler";
import { getCategories, getPlats } from "../../firebase/data";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      itemSelected: null,
      plats: [],
      categories:[],
      categorieSelected: null,
    };

    this.allPlats = []

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    Promise.all([getPlats(), getCategories()]).then(([platsRes, categoriesRes]) => {
      this.allPlats = platsRes;
      this.setState({
        plats: platsRes,
        categories:categoriesRes,
        categorieSelected: categoriesRes.find(item => item.id == 0)
      })
    });
  }

  onSearch(search) {
    let results = this.getPlatByCurrentCategorie(this.state.categorieSelected);

    if (search.trim().length) {
      results = this.state.plats.filter((item) =>
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
      visible: true,
    });
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
    this.onClose();
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
        <CommandeDialogComponent
          visible={this.state.visible}
          item={this.state.itemSelected}
          onSubmit={this.onSubmit}
          onClose={this.onClose.bind(this)}
        />
        <View>
          <SearchComponent onChangeText={this.onSearch.bind(this)} />
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
        <FlatGrid
          itemDimension={150}
          showsVerticalScrollIndicator={false}
          data={this.state.plats}
          spacing={15}
          renderItem={({ item }) => (
            <PlatItem item={item} onAdd={() => this.addItem(item)} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    marginHorizontal: 13,
  },
  section: {
    fontSize: 30,
    fontWeight: "bold",
  },
  plats: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

const mapStateToProps = (state) => ({
  panier: state.panier,
});

export default connect(mapStateToProps, { addToCart, updateQuantite })(
  HomeScreen
);
