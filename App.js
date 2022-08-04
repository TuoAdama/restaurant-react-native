import * as React from 'react';
import LoginScreen from './src/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import Home from './navigations/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store from './src/redux/store'
import { Provider } from 'react-redux'
import RegisterScreen from './src/screens/RegisterScreen';
import PlatDetailScreen from './src/screens/PlatDetailScreen';
import { ToastProvider } from 'react-native-toast-notifications';
import DetailCommandeScreen from './src/screens/DetailCommandeScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function App() {

  const Stack = createNativeStackNavigator()

  return (

    <GestureHandlerRootView style={{flex:1}}>
      <BottomSheetModalProvider>
        <ToastProvider>
          <Provider store={store}>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="LoginScreen">
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
                <Stack.Screen name="PlatDetail" component={PlatDetailScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Index" component={Home} options={{ headerShown: false, }} />
                <Stack.Screen name="DetailCommandeScreen" component={DetailCommandeScreen} options={{ title: "Liste des éléments" }} />
              </Stack.Navigator>
            </NavigationContainer>
          </Provider>
        </ToastProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}