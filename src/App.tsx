import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ListingScreen from './screens/ListingScreen';
import RocketsScreen from './screens/RocketsScreen';
import DetailsScreen from './screens/DetailsScreen';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
// import Ionicons from 'react-native-vector-icons/Ionicons';

const client = new ApolloClient({
  uri: 'https://spacex-production.up.railway.app/',
  cache: new InMemoryCache(),
});

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Bottom Tabs for Launches and Rockets
const BottomTabs = () => (
  <Tab.Navigator
    // screenOptions={({route}) => ({
    //   tabBarIcon: ({focused, color, size}) => {
    //     let iconName;

    //     if (route.name === 'Launches') {
    //       iconName = focused ? 'rocket' : 'rocket-outline';
    //     } else if (route.name === 'Rockets') {
    //       iconName = focused ? 'planet' : 'planet-outline';
    //     }

    //     return <Ionicons name="house" size={size} color={color} />;
    //   },
    //   tabBarActiveTintColor: 'tomato',
    //   tabBarInactiveTintColor: 'gray',
    //   headerTitleAlign: 'center',
    // })}
  >
    <Tab.Screen name="Launches" component={ListingScreen} />
    <Tab.Screen name="Rockets" component={RocketsScreen} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            {/* Home is the BottomTabs Navigator */}
            <Stack.Screen
              name="Home"
              component={BottomTabs}
              options={{headerShown: false}}
            />
            {/* Details Screen */}
            <Stack.Screen
              name="Details"
              component={DetailsScreen}
              options={{headerTitleAlign: 'center'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ApolloProvider>
  );
};

export default App;
