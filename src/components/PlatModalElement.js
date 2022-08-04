import { Button, Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { capitalize, formPrix } from '../utils/StringHelper';
import colors from '../assets/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PlatModalElement = (props) => {
    const {plat, bottomSheetModalRef} = props;
    if (!plat) return null;

    const onAdd = () => {
        bottomSheetModalRef.current?.close();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{capitalize(plat.libelle)}</Text>
            <Image resizeMode='contain' source={{ uri: plat.images[0] }} style={styles.image} />
            <Text style={styles.prix}>{formPrix(plat.prix)} FCFA</Text>
            <View style={styles.actions}>
                <TouchableHighlight onPress={() => console.log("Hello,world")}>
                    <MaterialIcons name="add-box" size={30} color="black" />
                </TouchableHighlight>
                <Text style={styles.quantite}>1</Text>
                <TouchableHighlight onPress={() => console.log("Hello,world")}>
                    <MaterialIcons name="indeterminate-check-box" size={30} color="black" />
                </TouchableHighlight>
            </View>
            <TouchableOpacity style={styles.btn} onPress={onAdd}>
                <Text style={styles.textBtn}>Ajouter au panier</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PlatModalElement

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    image: {
        marginTop: 10,
        width: 200,
        height: 140
    },
    title: {
        fontSize: 20,
        color: colors.primary,
        fontWeight: 'bold',
    },
    prix: {
        fontSize: 20,
    },
    actions: {
        flexDirection: 'row',
        marginVertical: 15,
    },
    quantite: {
        marginHorizontal: 12,
    },
    btn:{
        backgroundColor:colors.primary,
        padding:12,
        borderRadius:20,
    },
    textBtn:{
        color:'white',
    }
})