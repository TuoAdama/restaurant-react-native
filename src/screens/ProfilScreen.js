import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import appColors from '../assets/colors'

const ProfilScreen = (props) => {

    const onDeconnect = () => {
        global.personnel = null;
        props
            .route
            .params
            .navigationToLogin
            .replace("LoginScreen");
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.avatarContainer}>
                <View>
                    <Image
                        source={require('../assets/images/user.png')}
                        resizeMode="contain"
                        style={styles.avatar}
                    />
                </View>
                <View>
                    <Text style={styles.name}>{global.personnel.prenom + " " + global.personnel.nom}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={onDeconnect} style={styles.btnDeco}>
                        <Text style={styles.deconnexion}>Deconnexion</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.titles}>
                <Text style={styles.title1}>Mon </Text>
                <Text style={styles.title2}>Restaurant</Text>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
    },
    avatarContainer: {
        height: 350,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 120,
        height: 120,
    },
    name: {
        fontSize: 20,
    },
    deconnexion: {
        fontSize: 16,
        color: appColors.primary,
        fontWeight: "500",
    },
    btnDeco: {
        marginTop: 12,
    },
    listItem: {
        minHeight: 50,
        borderBottomWidth: 1,
        justifyContent: 'center',
        paddingLeft: 18,
    },
    row: {
        borderWidth: 1,
    },
    titles: {
        flexDirection: "row",
        justifyContent: "center",
        position: "relative",
        bottom: -200,
    },

    title1: {
        fontSize: 40,
        color: appColors.primary,
        fontWeight: 'bold',
    },
    title2: {
        textDecorationLine: "underline",
        fontSize: 40,
    },
})

export default ProfilScreen