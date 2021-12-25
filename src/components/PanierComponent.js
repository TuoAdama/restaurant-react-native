import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const PanierComponent = (props) => {
    return (
        <View style={styles.container}>
            <Text>Panier</Text>
        </View>
    )
}

export default PanierComponent

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})
