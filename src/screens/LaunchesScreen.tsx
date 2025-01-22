import React, { useState } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useGetLaunchesQuery } from '../network/queries/__generated__/graphql';
import LaunchList from '../components/LaunchList';
import SortButtons from '../components/SortButtons';

const LaunchesScreen = ({ navigation }: { navigation: any }) => {
  const [page, setPage] = useState(1);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const { loading, error, data, fetchMore, refetch } = useGetLaunchesQuery({
    variables: { limit: 10, offset: 0 },
  });

  if (loading && page === 1) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={'black'} />
      </View>
    );
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error.message || 'Unknown error'}</Text>;
  }

  // Load more launches when reaching the end of the list
  const loadMoreData = async () => {
    if (!fetchingMore && data?.launches?.length) {
      setFetchingMore(true);
      const newPage = page + 1;
      try {
        await fetchMore({
          variables: { offset: newPage * 10 },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult?.launches) return prev;
            return {
              ...prev,
              launches: [...(prev?.launches || []), ...(fetchMoreResult.launches || [])],
            };
          },
        });
        setPage(newPage);
      } catch (err) {
        console.error('Error fetching more launches:', err);
      } finally {
        setFetchingMore(false);
      }
    }
  };

  // Sort launches based on the selected sort order
  const sortedLaunches = data?.launches
    ? [...data.launches].sort((a, b) => {
        const dateA = new Date(a?.launch_date_utc).getTime();
        const dateB = new Date(b?.launch_date_utc).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      })
    : [];

  // Handle sort order changes
  const handleSortChange = (newSortOrder: 'asc' | 'desc') => {
    setSortOrder(newSortOrder);
    setPage(1);
    refetch({ limit: 10, offset: 0 });
  };

  return (
    <View style={styles.container}>
      {/* Sort Buttons */}
      <SortButtons sortOrder={sortOrder} onSortChange={handleSortChange} />

      {/* Launch List */}
      <LaunchList
        launches={sortedLaunches}
        fetchingMore={fetchingMore}
        loadMoreData={loadMoreData}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    marginBottom: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
    margin: 20,
  },
});

export default LaunchesScreen;
