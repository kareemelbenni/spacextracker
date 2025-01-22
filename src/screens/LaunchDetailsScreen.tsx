import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {useGetLaunchQuery} from '../network/queries/__generated__/graphql';
import LaunchDetails from '../components/LaunchDetails';

const LaunchDetailsScreen = ({route}: {route: any}) => {
  const {launchId} = route.params;
  const {loading, error, data} = useGetLaunchQuery({
    variables: {launchId},
  });

  // Show loading indicator while fetching data
  if (loading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );

  // Display error message if the query fails
  if (error) return <Text style={styles.errorText}>Error: {error.message}</Text>;

  // Render launch details using a separate component
  return (
    <View style={styles.container}>
      {data?.launch ? (
        <LaunchDetails launch={data.launch} />
      ) : (
        <Text style={styles.errorText}>No launch details available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default LaunchDetailsScreen;
