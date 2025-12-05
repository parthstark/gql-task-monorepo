import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootTabParamList } from './types';
import BoardStackNavigator from './stacks/BoardStackNavigator';
import UserStackNavigator from './stacks/UserStackNavigator';

const Tab = createBottomTabNavigator<RootTabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#ffffff' },
      }}
    >
      <Tab.Screen
        name="UsersTab"
        component={UserStackNavigator}
        options={() => ({
          title: 'Users',
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-group" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="BoardsTab"
        component={BoardStackNavigator}
        options={() => ({
          title: 'Boards',
          tabBarIcon: ({ color, size }) => (
            <Icon name="view-dashboard" color={color} size={size} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
