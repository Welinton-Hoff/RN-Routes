import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Home from './pages/Home/index';
import Maps from './pages/Map/index';

export default function Routes() {
  return (
    <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: "#3CB371" }, headerTintColor: "#FFF" }}
      initialRouteName="Home" >
      <Stack.Screen name="Home" component={Home} options={{ title: "Home" }} />
      <Stack.Screen name="Maps" component={Maps} options={{ title: "Maps" }} />
    </Stack.Navigator>
  );
}