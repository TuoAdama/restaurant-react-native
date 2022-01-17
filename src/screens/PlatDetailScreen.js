import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const PlatDetailScreen = ({route, navigation}) => {
    const item = route.params.item
    return (
        <View style={styles.container}>
            <Text>{item.libelle} : {item.prix} FCFA</Text>
        </View>
    )
}

export default PlatDetailScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
