import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useGetRocketQuery } from '../network/queries/__generated__/graphql';
import RocketInfo from '../components/RocketInfo'; // Import the RocketInfo component

const RocketDetailsScreen = ({ route }: { route: any }) => {
  const { rocketId } = route.params;  // Get rocketId from route parameters
  const { loading, error, data } = useGetRocketQuery({
    variables: { rocketId }, // Fetch rocket data with the rocketId
  });

  // Loading state while data is being fetched
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={'black'} />
      </View>
    );
  }

  // Error handling if data fetching fails
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error.message || 'An unknown error occurred'}</Text>
      </View>
    );
  }

  // If data is successfully fetched, display rocket details
  return (
    <View style={styles.container}>
      {data?.rocket ? (
        <RocketInfo
          name={data?.rocket?.name || 'N/A'}
          description={data?.rocket?.description || 'No description available.'}
        />
      ) : (
        <Text>No rocket data available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center', // Centers the loader vertically
    alignItems: 'center', // Centers the loader horizontally
  },
  container: {
    flex: 1,
    padding: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default RocketDetailsScreen;
