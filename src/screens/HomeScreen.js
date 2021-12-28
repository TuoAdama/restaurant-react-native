import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import CategorieComponent from "../components/CategorieComponent";
import PlatItem from "../components/PlatItem";
import SearchComponent from "../components/SearchComponent";
import { plats } from "../data/data";
import { FlatGrid } from "react-native-super-grid";
import { connect } from "react-redux";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  onSearch(value) {}

  onShowDialog(item) {}

  render() {
    return (
      <View style={styles.container}>
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
            <View>
              <PlatItem item={item} onShowDialog={() => this.onShowDialog(item)} />
            </View>
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

export default connect(mapStateToProps)(HomeScreen);
