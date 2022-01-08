import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import CommandesScreen from '../screens/CommandesScreen'
import HomeScreen from '../screens/HomeScreen'
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native'
import PanierScreen from '../screens/PanierScreen'


const Index = () => {

    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor:'#e91e63'
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown:false,
                    tabBarLabel:"Home",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),            
                }}/>
            
            <Tab.Screen
                name="Commandes"
                component={CommandesScreen}
                options={{
                    headerShown:false,
                    tabBarLabel:"Commandes",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="order-bool-descending" size={size} color={color} />
                    ), 
                }}/>
            
            <Tab.Screen
                name="Panier"
                component={PanierScreen}
                options={{
                    tabBarLabel:"Panier",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="fastfood" size={size} color={color} />
                    ), 
                }}/>
        </Tab.Navigator>
    )
}

export default Index
