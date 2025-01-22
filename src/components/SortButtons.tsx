import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

interface SortButtonsProps {
  sortOrder: 'asc' | 'desc';
  onSortChange: (order: 'asc' | 'desc') => void;
}

/**
 * Renders buttons to sort launches by date (ascending or descending).
 */
const SortButtons: React.FC<SortButtonsProps> = ({ sortOrder, onSortChange }) => (
  <View style={styles.sortContainer}>
    <Button
      title="Sort by Date: ASC"
      onPress={() => onSortChange('asc')}
      disabled={sortOrder === 'asc'}
      color="black"
    />
    <Button
      title="Sort by Date: DESC"
      onPress={() => onSortChange('desc')}
      disabled={sortOrder === 'desc'}
      color="black"
    />
  </View>
);

const styles = StyleSheet.create({
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default SortButtons;
