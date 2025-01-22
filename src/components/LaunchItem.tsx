import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// Defining the prop types for the LaunchItem component
type LaunchItemProps = {
  id: string;
  name: string;
  date: string;
  onViewDetails: () => void;  // Function that is called when "View Details" is pressed
};

const LaunchItem: React.FC<LaunchItemProps> = ({ id, name, date, onViewDetails }) => {
  return (
    <View style={styles.itemContainer}>
      {/* Displaying the name of the launch */}
      <Text style={styles.title}>{name}</Text>

      {/* Displaying the formatted launch date */}
      <Text style={styles.date}>
        {'Launch Date: ' + new Date(date).toLocaleDateString()}
      </Text>

      {/* Button to trigger the onViewDetails function */}
      <Button title="View Details" onPress={onViewDetails} color={'black'} />
    </View>
  );
};

// Defining the styles for the component
const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    padding: 8,
    borderRadius: 8,
  },
  title: {
    color: '#000000',
    marginBottom: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    marginBottom: 8,
  },
});

export default LaunchItem;
