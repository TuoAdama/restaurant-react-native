import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import PanierComponent from './PanierComponent'
import CommandesComponent from './CommandesComponent'
import HomeScreen from '../screens/HomeScreen'


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
                    tabBarLabel:"Home"
                }}/>
            
            <Tab.Screen
                name="Commandes"
                component={CommandesComponent}
                options={{
                    headerShown:false,
                    tabBarLabel:"Commandes"
                }}/>
            
            <Tab.Screen
                name="Panier"
                component={PanierComponent}
                options={{
                    headerShown:false,
                    tabBarLabel:"Panier"
                }}/>
        </Tab.Navigator>
    )
}

export default Index
