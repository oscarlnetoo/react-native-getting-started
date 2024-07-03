import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';

const Open = createNativeStackNavigator();

export const OpenRoutes: React.FunctionComponent = () => {
  return (
    <Open.Navigator
      initialRouteName="SignIn"
      screenOptions={{ headerShown: false }}
    >
      <Open.Screen name="SignIn" component={SignIn} />
      <Open.Screen name="SignUp" component={SignUp} />
    </Open.Navigator>
  );
};
