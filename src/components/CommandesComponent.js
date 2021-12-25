import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const CommandesComponent = (props) => {
    return (
        <View style={styles.container}>
            <Text>Commandes</Text>
        </View> 
    )
}

export default CommandesComponent

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
