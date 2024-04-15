import { ScrollView, View } from 'react-native';
import React from 'react';
import { Text } from '@components';
import { StreamCard } from './StreamCard';

const audioRoomIdeas = [
  {
    title: 'Machine Learning Deep Dive',
    description: 'Dive deep into Machine Learning with expert speakers. Ask questions, share insights, and expand your knowledge!',
  },
  {
    title: 'Live Q&A with Travel Blogger Sarah Jones',
    description: 'Get your questions answered live by Sarah Jones, a leading expert in Travels and Hospitality.',
  },
  {
    title: 'Learn Basic Guitar in a Day',
    description: 'Join this interactive session and pick up the fundamentals of guitar in just 24 hours!',
  },
  {
    title: 'The Story Writing Brainstorm',
    description: 'Spark your creativity! Share ideas, collaborate, and develop stories related to society.',
  },
  {
    title: "Let's Talk About the Recent Space Launch",
    description: 'Discuss the latest news and happenings surrounding space exploration. Share your thoughts and perspectives.',
  },
  {
    title: 'Coffee & Chat',
    description: 'Start your day with a virtual coffee break! Chat with fellow early risers and enjoy a relaxed conversation.',
  },
  {
    title: 'Meditation & Mindfulness',
    description: 'Join a guided meditation session to de-stress, unwind, and find inner peace.',
  },
  {
    title: 'The Knitting Hangout',
    description: 'Connect with others who share your passion for Knitting. Chat, share projects, and find inspiration.',
  },
];

type Props = {};

export const FeatureStreams = (props: Props) => {
  return (
    <View style={{ marginVertical: 40 }}>
      <Text fontSize={25} isBold>
        Featured
      </Text>
      <Text fontSize={13}>We curated a list of streams base on your recent streams</Text>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 5, alignItems: 'center', }}
      >
        {audioRoomIdeas.map((idea, index) => (
          <StreamCard key={index} {...idea} />
        ))}
      </ScrollView>
    </View>
  );
};
