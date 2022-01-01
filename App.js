import * as React from 'react';
import LoginScreen from './src/screens/LoginScreen';
import { NavigationContainer} from '@react-navigation/native';
import Index from './src/components/Index'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store from './src/redux/store'
import {Provider} from 'react-redux'
import RegisterScreen from './src/screens/RegisterScreen';

export default function App() {

  const Stack = createNativeStackNavigator()

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}}/>
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown:false}}/>
          <Stack.Screen name="Index" component={Index} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}