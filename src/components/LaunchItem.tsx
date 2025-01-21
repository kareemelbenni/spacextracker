import React from 'react';
import { View, Text, Button } from 'react-native';

type LaunchItemProps = {
  id: string;
  name: string;
  date: string;
  onViewDetails: () => void;
};

const LaunchItem: React.FC<LaunchItemProps> = ({ id, name, date, onViewDetails }) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={{color:"#000000"}}>{name}</Text>
      <Text>{new Date(date).toLocaleDateString()}</Text>
      <Button title="View Details" onPress={onViewDetails} />
    </View>
  );
};

export default LaunchItem;
