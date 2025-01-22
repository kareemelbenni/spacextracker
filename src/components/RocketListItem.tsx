import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface RocketListItemProps {
  id: string;
  name: string;
  first_flight: string;
  onViewDetails: () => void;
}

const RocketListItem = ({ id, name, first_flight, onViewDetails }: RocketListItemProps) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.firstLaunch}>First Flight: {first_flight}</Text>
      <Button title="View Details" onPress={onViewDetails} color={'black'} />
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default RocketListItem;
