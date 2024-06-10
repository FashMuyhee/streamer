import { ScrollView, View } from 'react-native';
import React from 'react';
import { Text } from '@components';
import { StreamCard } from './StreamCard';
import { useGetStreams } from '../firebase';

export const FeatureStreams = () => {
  const { streams } = useGetStreams();

  return (
    <View style={{ marginVertical: 40 }}>
      <Text fontSize={25} isBold>
        Featured
      </Text>
      <Text fontSize={13}>We curated a list of streams base on your recent streams</Text>
      <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginTop: 5, alignItems: 'center' }}>
        {streams.map((stream) => (
          <StreamCard key={`${stream.id}`} {...stream} isLive={false} />
        ))}
      </ScrollView>
    </View>
  );
};
