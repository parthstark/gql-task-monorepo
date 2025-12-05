import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from './types';
import BoardStackNavigator from './stacks/BoardStackNavigator';
import UserStackNavigator from './stacks/UserStackNavigator';

const Tab = createBottomTabNavigator<RootTabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="UsersTab"
        component={UserStackNavigator}
        options={{ title: 'Users' }}
      />
      <Tab.Screen
        name="BoardsTab"
        component={BoardStackNavigator}
        options={{ title: 'Boards' }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
