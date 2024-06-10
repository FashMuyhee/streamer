import { FlatList, ListRenderItemInfo, View } from 'react-native';
import React from 'react';
import { Text } from '@components';
import { StreamCard } from '@views/home/components';
import { useGetRecentStreams } from '../hooks';
import { Stream } from '@views/home/firebase';

export const RecentStreams = () => {
  const { isLoading, recentStream } = useGetRecentStreams();

  const renderItem = ({ item }: ListRenderItemInfo<Stream>) => {
    return <StreamCard  {...item} isLive={!!item.endedAt} />;
  };

  return (
    <View style={{ marginVertical: 40 }}>
      <Text fontSize={20} isBold>
        Recent Streams
      </Text>
      <FlatList data={recentStream} maxToRenderPerBatch={10} initialNumToRender={10} renderItem={renderItem} keyExtractor={(i) => i.id} />
    </View>
  );
};
