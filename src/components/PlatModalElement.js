import { Button, Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { capitalize, formPrix } from '../utils/StringHelper';
import colors from '../assets/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PlatModalElement = (props) => {
    const [qte, setQte] = useState(1);
    const { plat, bottomSheetModalRef, onSubmit } = props;


    if (!plat) return null;

    const updateQte = (increment = true) => {
        if (increment) {
            setQte(qte + 1);
        } else {
            if (qte > 1) {
                setQte(qte - 1);
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{capitalize(plat.libelle)}</Text>
            <Image resizeMode='contain' source={{ uri: plat.images[0] }} style={styles.image} />
            <Text style={styles.prix}>{formPrix(plat.prix)} FCFA</Text>
            <View style={styles.actions}>
                <TouchableHighlight onPress={() => updateQte(false)}>
                    <MaterialIcons name="indeterminate-check-box" size={30} color="black" />
                </TouchableHighlight>
                <Text style={styles.quantite}>{qte}</Text>
                <TouchableHighlight onPress={() => updateQte()}>
                    <MaterialIcons name="add-box" size={30} color="black" />
                </TouchableHighlight>
            </View>
            <TouchableOpacity style={styles.btn} onPress={() => onSubmit(qte)}>
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
    btn: {
        backgroundColor: colors.primary,
        padding: 12,
        borderRadius: 20,
    },
    textBtn: {
        color: 'white',
    }
})