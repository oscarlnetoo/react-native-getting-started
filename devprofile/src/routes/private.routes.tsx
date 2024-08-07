import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../pages/Home';
import { UserDetails } from '../pages/UserDetails';
import { UserProfile } from '../pages/UserProfile';
import { UserProfileEdit } from '../pages/UserProfileEdit';
import { UserProfilePassword } from '../pages/UserProfilePassword';

const Private = createNativeStackNavigator();

export const PrivateRoutes: React.FunctionComponent = () => {
  return (
    <Private.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Private.Screen name="Home" component={Home} />
      <Private.Screen name="UserDetails" component={UserDetails} />
      <Private.Screen name="UserProfile" component={UserProfile} />
      <Private.Screen name="UserProfileEdit" component={UserProfileEdit} />
      <Private.Screen
        name="UserProfilePassword"
        component={UserProfilePassword}
      />
    </Private.Navigator>
  );
};
