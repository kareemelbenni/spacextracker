import React, {useState} from 'react';
import {View, Text, FlatList, ActivityIndicator, StyleSheet} from 'react-native';
import {useGetRocketsQuery} from '../network/queries/__generated__/graphql'; // Adjust the import for your GraphQL queries

const RocketsScreen = () => {
  const {loading, error, data} = useGetRocketsQuery(); // Replace with your actual query

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error: {error.message || 'Unknown error'}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.rockets || []}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({item}: {item: any}) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
            <Text>{item.description}</Text>
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
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default RocketsScreen;
