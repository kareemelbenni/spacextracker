import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, Image, StyleSheet} from 'react-native';
import {useGetRocketQuery} from '../network/queries/__generated__/graphql';

const LaunchDetailsScreen = ({route}: {route: any}) => {
  const {rocketId} = route.params;
  const {loading, error, data} = useGetRocketQuery({
    variables: {rocketId: rocketId},
  });

  console.log('data', data?.rocket);

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
        {'Rocket Name: ' + data?.rocket?.name}
      </Text>
      <Text style={{marginBottom: 8}}>
        {'Description: ' + data?.rocket?.description}
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
