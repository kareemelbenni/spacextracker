import React, {useState} from 'react';
import {View, Text, FlatList, ActivityIndicator, StyleSheet,Button} from 'react-native';
import {useGetRocketsQuery} from '../network/queries/__generated__/graphql'; // Adjust the import for your GraphQL queries

const RocketsScreen = ({navigation}: {navigation: any}) => {
  const {loading, error, data} = useGetRocketsQuery(); // Replace with your actual query

  // Show loading indicator if data is being fetched
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  if (error) return <Text>Error: {error.message || 'Unknown error'}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.rockets || []}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({item}: {item: any}) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.firstLaunch}>{item.first_flight}</Text>
            <Button title="View Details" onPress={()=>{navigation.navigate('Rocket Details', {rocketId: item.id})}} color={'black'} />
          </View>
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
  item: {
    marginBottom: 16,
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  firstLaunch: {
    marginBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center', // Centers the loader vertically
    alignItems: 'center', // Centers the loader horizontally
  },
});

export default RocketsScreen;
