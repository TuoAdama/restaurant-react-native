import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CommandeElement = ({ plat }) => {

    const item = plat.plat;

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: item.images[0].chemin }}
                    style={styles.image} />
            </View>
            <View style={styles.detail}>
                <Text style={styles.title}>{item.libelle}</Text>
                <Text style={styles.subTitle}>{item.prix} FCFA</Text>
                <Text style={styles.subTitle}> x {plat.quantite}</Text>
            </View>
        </View>
    )
}

export default CommandeElement

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        margin: 5,
        padding: 10,
        alignItems: "center",
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.41,
        elevation: 2,
        borderRadius:18,
    },
    image: {
        width: 100,
        height: 100,
    },
    imageContainer: {
        width: 110,
        justifyContent: "center",
        alignItems: "center",
    },
    detail:{
        height:100,
        width:200,
    },
    title:{
        fontSize:20,
        fontWeight:"bold",
    },
    subTitle:{
        fontSize:17,
        marginTop:5,
    }
})