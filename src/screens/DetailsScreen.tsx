import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import {
    useGetLaunchQuery,
  } from '../network/queries/__generated__/graphql';


const DetailsScreen = ({ route }: { route: any }) => {
  const { launchId } = route.params;
  const { loading, error, data } = useGetLaunchQuery({
    variables: { launchId: launchId },
  });

  console.log("data",data?.launch);

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View>
      <Text>{data?.launch?.id}</Text>
      <Text>{data?.launch?.mission_name}</Text>
      <Text>{new Date(data?.launch?.launch_date_utc).toLocaleDateString()}</Text>
      <Text>{data?.launch?.details}</Text>
      {/* <Image
        source={{ uri: data?.launch?.mission_patch }}
        style={{ width: 100, height: 100 }}
      /> */}
    </View>
  );
};

export default DetailsScreen;
