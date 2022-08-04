import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import CommandeElement from '../components/CommandeElement';

export default function DetailCommandeScreen({ navigation, route }) {

  const data = route.params.items.plat_commandes;
  const { table, status } = route.params;

  const getTotal = () => {
    let total = 0;
    data.forEach(i => {
      total += i.quantite * i.plat.prix;
    });
    return total;
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.entete}>
        <View style={styles.head}>
          <Text style={styles.table}>{table}:</Text>
          <Text style={[styles.status, status == "EN COURS" || { color: "#20c997" }]}>{status}</Text>
        </View>
        <View>
          <Text style={[styles.table, {fontWeight:"bold"}]}>
            {new Intl.NumberFormat().format(getTotal())} FCFA
          </Text>
        </View>
      </View>
      <FlatList
        style={{height:"80%"}}
        data={data}
        renderItem={({ item }) => (
          <CommandeElement plat={item} />
        )}
        keyExtractor={(item) => item.id}
        horizontal={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 3,
    paddingHorizontal: 10,
  },
  head: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  entete: {
    flexDirection: "column",
    marginVertical: 10,
    justifyContent: "center",
  },
  status: {
    fontSize: 18,
    marginLeft: 10,
    color: "red"
  },
  table: {
    fontSize: 25,
    marginLeft: 10,
  },
  total:{
    
  },  
  footer: {
    borderWidth: 1,
    position: "absolute",
    bottom: 0
  }
})