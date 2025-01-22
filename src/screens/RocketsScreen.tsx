import React, { useState } from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useGetRocketsQuery } from '../network/queries/__generated__/graphql';
import RocketListItem from '../components/RocketListItem'; // Import the RocketListItem component

const RocketsScreen = ({ navigation }: { navigation: any }) => {
  const { loading, error, data } = useGetRocketsQuery(); // Query for rockets data

  // Show loading indicator if data is being fetched
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  // Handle error if data fetching fails
  if (error) return <Text>Error: {error.message || 'Unknown error'}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.rockets || []}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: { item: any }) => (
          <RocketListItem
            id={item.id}
            name={item.name}
            first_flight={item.first_flight}
            onViewDetails={() => navigation.navigate('Rocket Details', { rocketId: item.id })}
          />
        )}
      />
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
    justifyContent: 'center', // Centers the loader vertically
    alignItems: 'center', // Centers the loader horizontally
  },
});

export default RocketsScreen;
