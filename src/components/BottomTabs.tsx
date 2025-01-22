import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LaunchesScreen from '../screens/LaunchesScreen';
import RocketsScreen from '../screens/RocketsScreen';
import TabBarIcon from './TabBarIcon';

const Tab = createBottomTabNavigator();

/**
 * Bottom Tabs Component 
 * Contains tabs for "Launches" and "Rockets" screens.
 */
const BottomTabs: React.FC = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => <TabBarIcon route={route} color={color} />,
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray',
      headerTitleAlign: 'center',
    })}
  >
    <Tab.Screen
      name="Launches"
      component={LaunchesScreen}
      options={{ headerTitleAlign: 'left' }}
    />
    <Tab.Screen
      name="Rockets"
      component={RocketsScreen}
      options={{ headerTitleAlign: 'left' }}
    />
  </Tab.Navigator>
);

export default BottomTabs;
