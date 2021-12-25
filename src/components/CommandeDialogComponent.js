import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import Dialog from "react-native-dialog";
import {addToCart} from '../redux/actions';
import {connect} from 'react-redux'


const CommandeDialogComponent = (props) => {
    
 const [qte, setQte] = useState(1);

 const onAdd = (qte) => {
    console.log(props.addToCart({
        ...props.item,
        quantite:qte
    }));
    props.setShow(false)
 }

  return (
    <Dialog.Container visible={props.show}>
      <View>
        <View>
          <View style={styles.container}>
            <Pressable
              onPress={() => {
                if (qte > 1) {
                    
                    setQte(qte-1)
                }
              }}
            >
              <Ionicons
                name="ios-remove-circle-outline"
                size={40}
                color="red"
              />
            </Pressable>
            <Text style={styles.qte}>{qte}</Text>
            <Pressable onPress={() => setQte(qte+1)}>
              <Ionicons name="ios-add-circle-outline" size={40} color="black" />
            </Pressable>
          </View>
        </View>
        <View styles={styles.btn}>
          <Button title="valider" onPress={() =>onAdd(qte)} />
          <View style={{marginBottom:12}}></View>
          <Button title="Annuler" onPress={() => props.setShow(false)} color="#e63946"/>
        </View>
      </View>
    </Dialog.Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 30,
  },
  qte:{
      fontSize:20,
  },
  btn:{
      padding:3,
  }
});


const mapStateToProps = (state) => ({
    panier:state.panier
})


export default connect(mapStateToProps, {addToCart})(CommandeDialogComponent);
