import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloProvider } from '@apollo/client';
import StackNavigator from './navigation/StackNavigator';
import client from './apollo/client';

/**
 * Main App Component
 * Wraps the app in ApolloProvider, SafeAreaProvider, and NavigationContainer.
 */
const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </ApolloProvider>
  );
};

export default App;
