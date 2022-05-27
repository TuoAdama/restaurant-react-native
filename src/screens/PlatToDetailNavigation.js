import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import PlatDetailScreen from "./PlatDetailScreen";

const PlatToDetailNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailPlat"
          component={PlatDetailScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default PlatToDetailNavigation;
