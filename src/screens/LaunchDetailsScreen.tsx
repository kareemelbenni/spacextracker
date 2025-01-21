import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, Image, StyleSheet} from 'react-native';
import {useGetLaunchQuery} from '../network/queries/__generated__/graphql';

const LaunchDetailsScreen = ({route}: {route: any}) => {
  const {launchId} = route.params;
  const {loading, error, data} = useGetLaunchQuery({
    variables: {launchId: launchId},
  });

  console.log('data', data?.launch);

  if (loading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={'black'} />
      </View>
    );
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={{margin: 16}}>
      <Text style={{marginBottom: 8}}>
        {'Mission Name: ' + data?.launch?.mission_name}
      </Text>
      <Text style={{marginBottom: 8}}>
        {'Launch Date: ' +
          new Date(data?.launch?.launch_date_utc).toLocaleDateString()}
      </Text>
      <Text style={{marginBottom: 8}}>
        {'Details: ' + data?.launch?.details}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center', // Centers the loader vertically
    alignItems: 'center', // Centers the loader horizontally
  },
});

export default LaunchDetailsScreen;
