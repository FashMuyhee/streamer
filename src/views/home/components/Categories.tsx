import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import { StackView, Text } from '@components';
import { StreamCard } from './StreamCard';
import { BORDER_RADIUS, SCREEN_WIDTH } from '@utils';

const categories = [
  {
    category: 'Informative',
    backgroundColor: '#d9e3f0',
    icon: '📚',
  },
  {
    category: 'Q&A',
    backgroundColor: '#f7cac9',
    icon: '️📣',
  },
  {
    category: 'Skill Development',
    backgroundColor: '#eef2f1',
    icon: '🛠️',
  },
  {
    category: 'Creative',
    backgroundColor: '#f0eafc',
    icon: '🎨',
  },
  {
    category: 'Current Events',
    backgroundColor: '#fcedc2',
    icon: '📰',
  },
  {
    category: 'Sport',
    backgroundColor: '#e0f2f1',
    icon: '⚽️',
  },
  {
    category: 'Politics',
    backgroundColor: '#f7e9d7',
    icon: '⚖️',
  },
];

type Props = {};

export const Categories = (props: Props) => {
  return (
    <View style={{ marginTop: 40 }}>
      <Text fontSize={25} isBold>
        Categories
      </Text>
      <Text fontSize={13}>We curated a list of streams base on your recent streams</Text>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 20, alignItems: 'center', columnGap: 10 }}
      >
        {categories.map((idea, index) => (
          <Category key={index} {...idea} />
        ))}
      </ScrollView>
    </View>
  );
};

const Category = ({ backgroundColor, category, icon }: (typeof categories)[0]) => {
  return (
    <View style={[styles.category, { backgroundColor }]}>
      <View style={{ alignSelf: 'flex-end' }}>
        <Text fontSize={30}>{icon}</Text>
      </View>
      <Text fontSize={20} color="black" isBold>
        {category}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  category: {
    padding: 10,
    borderRadius: BORDER_RADIUS,
    width: (SCREEN_WIDTH - 45) / 2,
    height: 120,
    justifyContent:'space-between'
  },
});
