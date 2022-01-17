import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const PlatDetailScreen = () => {
    return (
        <View style={style.container}>
            <Text>Je suis detail</Text>
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
