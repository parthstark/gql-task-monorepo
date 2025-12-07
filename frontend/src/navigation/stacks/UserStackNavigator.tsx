import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserStackParamList } from '../types';

import UserListScreen from '../../screens/User/list-screen/UserListScreen';
import UserProfileScreen from '../../screens/User/profile-screen/UserProfileScreen';

const UserStack = createNativeStackNavigator<UserStackParamList>();

const UserStackNavigator = () => {
  return (
    <UserStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <UserStack.Screen name="UserListScreen" component={UserListScreen} />
      <UserStack.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
      />
    </UserStack.Navigator>
  );
};

export default UserStackNavigator;
