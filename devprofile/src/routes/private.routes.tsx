import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../pages/Home';

const Private = createNativeStackNavigator();

export const PrivateRoutes: React.FunctionComponent = () => {
  return (
    <Private.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Private.Screen name="Home" component={Home} />
    </Private.Navigator>
  );
};