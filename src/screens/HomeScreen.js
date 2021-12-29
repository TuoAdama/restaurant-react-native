import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import CategorieComponent from "../components/CategorieComponent";
import PlatItem from "../components/PlatItem";
import SearchComponent from "../components/SearchComponent";
import { plats } from "../data/data";
import { FlatGrid } from "react-native-super-grid";
import { connect } from "react-redux";
import { addToCart, updateQuantite } from "../redux/actions";
import CommandeDialogComponent from "../components/CommandeDialogComponent";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      itemSelected: null,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSearch(value) {}

  addItem(item) {
    this.setState({
      itemSelected: item,
      visible: true,
    });
  }

  onSubmit(qte) {

    const selectItem = this.state.itemSelected

    let index = this.props.panier.findIndex(
      (item) => item.id == selectItem.id
    );
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
          <Text style={styles.section}>Categories</Text>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentContainerStyle={{ height: 130 }}
          >
            <CategorieComponent />
            <CategorieComponent />
          </ScrollView>
        </View>
        <Text style={[styles.section, { marginTop: 25 }]}>Plats</Text>
        <FlatGrid
          itemDimension={150}
          showsVerticalScrollIndicator={false}
          data={plats}
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
    marginHorizontal: 18,
  },
  section: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subsection: {
    marginTop: 20,
    flex: 1,
    alignItems: "center",
  },
  plats: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

const mapStateToProps = (state) => ({
  panier: state.panier,
});

export default connect(mapStateToProps, { addToCart, updateQuantite })(HomeScreen);