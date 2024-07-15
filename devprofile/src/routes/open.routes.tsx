import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { ForgotPassword } from '../pages/ForgotPassword';
import { ResetPassword } from '../pages/ResetPassword';

const Open = createNativeStackNavigator();

export const OpenRoutes: React.FunctionComponent = () => {
  return (
    <Open.Navigator
      initialRouteName="SignIn"
      screenOptions={{ headerShown: false }}
    >
      <Open.Screen name="SignIn" component={SignIn} />
      <Open.Screen name="SignUp" component={SignUp} />
      <Open.Screen name="ForgotPassword" component={ForgotPassword} />
      <Open.Screen name="ResetPassword" component={ResetPassword} />
    </Open.Navigator>
  );
};
