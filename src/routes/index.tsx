import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Stack} from './stack';

type Props = {};

export const RootNavigation = (props: Props) => {
  return (
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
  );
};
