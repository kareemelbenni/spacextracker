import React from 'react';
import { FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import LaunchItem from './LaunchItem';

interface LaunchListProps {
  launches: Array<any>;
  fetchingMore: boolean;
  loadMoreData: () => void;
  navigation: any;
}

/**
 * Renders a list of launches with infinite scrolling.
 */
const LaunchList: React.FC<LaunchListProps> = ({
  launches,
  fetchingMore,
  loadMoreData,
  navigation,
}) => (
  <FlatList
    data={launches}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <LaunchItem
        id={item.id}
        name={item.mission_name}
        date={item.launch_date_utc}
        onViewDetails={() => navigation.navigate('Launch Details', { launchId: item.id })}
      />
    )}
    onEndReached={loadMoreData}
    onEndReachedThreshold={0.5}
    ListFooterComponent={
      fetchingMore ? <ActivityIndicator size="small" style={styles.loadingIndicator} /> : null
    }
  />
);

const styles = StyleSheet.create({
  loadingIndicator: {
    marginVertical: 10,
  },
});

export default LaunchList;
