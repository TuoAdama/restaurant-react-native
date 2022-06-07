import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { connect } from "react-redux";
import CommandeItem from "../components/CommandeItem";
import SearchInput from "../components/SearchInput";
import appColors from "../assets/colors";
import { ScrollView } from "react-native-gesture-handler";
import {getPersonnelCommands} from '../data/ApiRequest'

class CommandesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commandes: [],
      commandeFiltred: [],
      showLoading: true,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.retreiveCommande();
  }

  retreiveCommande() {
    getPersonnelCommands()
      .then((response) => {
        this.setState({
          commandes: response,
          commandeFiltred:response,
          showLoading: false,
          refreshing: false,
        });
        console.log(response);
      })
      .catch((error) => console.log(error));
  }

  handleShowCommande() {
    getPersonnelCommands().then((response) => {
      console.log(response);
    });
  }

  onRefreshCommande = () => {
    this.setState({
      refreshing: true,
    });
    this.retreiveCommande();
  };

  handleLoading = () => {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={appColors.primary} />
      </View>
    );
  };

  handeRefreshControl = () => {
    return (
      <RefreshControl refreshing={false} onRefresh={this.onRefreshCommande} />
    );
  };

  handleEmptyOrder() {
    return (
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={this.handeRefreshControl()}
      >
        <Text>Aucune commande en cours</Text>
      </ScrollView>
    );
  }

  onChangeText = (value) => {
    const results = this.state.commandes.filter(
      (item) => item.table.indexOf(value) != -1
    );
    this.setState({
      commandeFiltred: results,
    });
  };

  render() {
    return this.state.showLoading ? (
      this.handleLoading()
    ) : this.state.commandes.length == 0 ? (
      this.handleEmptyOrder()
    ) : (
      <View style={styles.container}>
        <>
          <SearchInput
            onChangeText={this.onChangeText}
            placeholder="Numéro de table"
          />
          <FlatList
            style={styles.liste}
            data={this.state.commandeFiltred}
            refreshControl={this.handeRefreshControl()}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => (
              <CommandeItem commande={item} />
            )}
          />
        </>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  commandes: state.commandes,
});

export default connect(mapStateToProps)(CommandesScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
  },
  liste: {
    width: "100%",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
