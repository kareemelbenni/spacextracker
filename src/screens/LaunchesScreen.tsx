import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Button,
  StyleSheet,
} from 'react-native';
import {useGetLaunchesQuery} from '../network/queries/__generated__/graphql';
import LaunchItem from '../components/LaunchItem';

const LaunchesScreen = ({navigation}: {navigation: any}) => {
  const [page, setPage] = useState(1);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // State for sorting order

  const {loading, error, data, fetchMore, refetch} = useGetLaunchesQuery({
    variables: {limit: 10, offset: 0},
  });

  // If loading and on the first page, show loading indicator centered
  if (loading && page === 1) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={'black'} />
      </View>
    );
  }

  if (error) return <Text>Error: {error?.message || 'Unknown error'}</Text>;

  const loadMoreData = async () => {
    if (!fetchingMore && data?.launches?.length) {
      setFetchingMore(true);
      const newPage = page + 1;
      try {
        await fetchMore({
          variables: {offset: newPage * 10},
          updateQuery: (prev, {fetchMoreResult}) => {
            if (!fetchMoreResult?.launches) {
              return prev;
            }
            return {
              ...prev,
              launches: [
                ...(prev?.launches || []),
                ...(fetchMoreResult?.launches || []),
              ],
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

  // Sort the data inline before rendering
  const sortedLaunches = data?.launches
    ? [...data.launches].sort((a, b) => {
        const dateA = new Date(a?.launch_date_utc).getTime();
        const dateB = new Date(b?.launch_date_utc).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      })
    : [];

  const handleSortChange = (newSortOrder: 'asc' | 'desc') => {
    setSortOrder(newSortOrder); // Update the sort order
    setPage(1); // Reset pagination to the first page after sorting
    refetch({limit: 10, offset: 0}); // Refetch with the new sort order
  };

  return (
    <View style={styles.container}>
      {/* Sort Buttons */}
      <View style={styles.sortContainer}>
        <Button
          title="Sort by Date: ASC"
          onPress={() => handleSortChange('asc')}
          disabled={sortOrder === 'asc'}
          color={"black"}
        />
        <Button
          title="Sort by Date: DESC"
          onPress={() => handleSortChange('desc')}
          disabled={sortOrder === 'desc'}
          color={"black"}
        />
      </View>

      {/* Launch List */}
      <FlatList
        data={sortedLaunches}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({item}: {item: any}) => (
          <LaunchItem
            key={item.id}
            id={item.id}
            name={item.mission_name}
            date={item.launch_date_utc}
            onViewDetails={() =>
              navigation.navigate('Launch Details', {launchId: item.id})
            }
          />
        )}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          fetchingMore ? (
            <ActivityIndicator size="small" style={{marginVertical: 10}} />
          ) : null
        }
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
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center', // Centers the loader vertically
    alignItems: 'center', // Centers the loader horizontally
  },
});

export default LaunchesScreen;
