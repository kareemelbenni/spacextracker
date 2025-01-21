import React from 'react';
import {View, Text, Button} from 'react-native';

type LaunchItemProps = {
  id: string;
  name: string;
  date: string;
  onViewDetails: () => void;
};

const LaunchItem: React.FC<LaunchItemProps> = ({
  id,
  name,
  date,
  onViewDetails,
}) => {
  return (
    <View
      style={{
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
        padding: 8,
        borderRadius: 8,
      }}>
      <Text
        style={{
          color: '#000000',
          marginBottom: 8,
          fontSize: 18,
          fontWeight: 'bold',
        }}>
        {name}
      </Text>
      <Text style={{marginBottom: 8}}>
        {'Launch Date: ' + new Date(date).toLocaleDateString()}
      </Text>
      <Button title="View Details" onPress={onViewDetails} color={'black'} />
    </View>
  );
};

export default LaunchItem;
