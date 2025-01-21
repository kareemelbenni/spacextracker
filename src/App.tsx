import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import LaunchesScreen from './screens/LaunchesScreen';
import RocketsScreen from './screens/RocketsScreen';
import LaunchDetailsScreen from './screens/LaunchDetailsScreen';
import RocketDetailsScreen from './screens/RocketDetailsScreen';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import Rocket from './svgs/rocket.svg'; // Path to your SVG file
import Planet from './svgs/planet.svg'; // Path to your SVG file

const client = new ApolloClient({
  uri: 'https://spacex-production.up.railway.app/',
  cache: new InMemoryCache(),
});

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Bottom Tabs for Launches and Rockets
const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {

        return route.name === 'Rockets'?<Rocket width={25} height={25} fill={color} />:<Planet width={25} height={25} fill={color} />;
      },
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray',
      headerTitleAlign: 'center',
    })}
  >
    <Tab.Screen name="Launches" component={LaunchesScreen} options={{headerTitleAlign: 'left'}}/>
    <Tab.Screen name="Rockets" component={RocketsScreen} options={{headerTitleAlign: 'left'}}/>
  </Tab.Navigator>
);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={BottomTabs}
              options={{headerShown: false,headerTitleAlign: 'left',}}
            />
            {/* Details Screen */}
            <Stack.Screen
              name="Launch Details"
              component={LaunchDetailsScreen}
              options={{headerTitleAlign: 'left'}}
            />
            <Stack.Screen
              name="Rocket Details"
              component={RocketDetailsScreen}
              options={{headerTitleAlign: 'left'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ApolloProvider>
  );
};

export default App;
