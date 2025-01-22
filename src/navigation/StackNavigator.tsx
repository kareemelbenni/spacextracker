import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabs from '../components/BottomTabs';
import LaunchDetailsScreen from '../screens/LaunchDetailsScreen';
import RocketDetailsScreen from '../screens/RocketDetailsScreen';

const Stack = createStackNavigator();

/**
 * Stack Navigator Component
 * Contains the main app navigation stack.
 */
const StackNavigator: React.FC = () => (
  <Stack.Navigator initialRouteName="Home">
    {/* Home Screen (Bottom Tabs) */}
    <Stack.Screen
      name="Home"
      component={BottomTabs}
      options={{ headerShown: false, headerTitleAlign: 'left' }}
    />
    {/* Launch Details Screen */}
    <Stack.Screen
      name="Launch Details"
      component={LaunchDetailsScreen}
      options={{ headerTitleAlign: 'left' }}
    />
    {/* Rocket Details Screen */}
    <Stack.Screen
      name="Rocket Details"
      component={RocketDetailsScreen}
      options={{ headerTitleAlign: 'left' }}
    />
  </Stack.Navigator>
);

export default StackNavigator;
