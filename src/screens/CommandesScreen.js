import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

const CommandesScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>{props.commandes.length}</Text>
    </View>
  );
};

const mapStateToProps = (state) => ({
  commandes: state.commandes,
});

export default connect(mapStateToProps)(CommandesScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
