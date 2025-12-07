import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '../components/Icon';
import { RootTabParamList } from './types';
import BoardStackNavigator from './stacks/BoardStackNavigator';
import UserStackNavigator from './stacks/UserStackNavigator';
import AboutScreen from '../screens/About/AboutScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#000000',
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
      <Tab.Screen
        name="AboutTab"
        component={AboutScreen}
        options={() => ({
          title: 'About',
          tabBarIcon: ({ color, size }) => (
            <Icon name="information" color={color} size={size} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fffbfe',
  },
});

export default TabNavigator;
