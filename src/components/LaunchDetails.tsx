import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface LaunchDetailsProps {
  launch: {
    mission_name?: string | null;
    launch_date_utc?: string | null;
    details?: string | null;
  };
}

const LaunchDetails = ({launch}: LaunchDetailsProps) => {
    const {
        mission_name = 'Unknown Mission',
        launch_date_utc = '',
        details = 'No details available',
      } = launch;

      return (
        <View style={styles.container}>
          <Text style={styles.label}>
            <Text style={styles.bold}>Mission Name: </Text>
            {mission_name}
          </Text>
          <Text style={styles.label}>
            <Text style={styles.bold}>Launch Date: </Text>
            {launch_date_utc
              ? new Date(launch_date_utc).toLocaleDateString()
              : 'Unknown Date'}
          </Text>
          <Text style={styles.label}>
            <Text style={styles.bold}>Details: </Text>
            {details}
          </Text>
        </View>
      );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default LaunchDetails;
