import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface RocketInfoProps {
  name: string;
  description: string;
}

const RocketInfo = ({ name, description }: RocketInfoProps) => {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.rocketName}>{`Rocket Name: ${name}`}</Text>
      <Text style={styles.description}>{`Description: ${description}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    margin: 8,
  },
  rocketName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
});

export default RocketInfo;
