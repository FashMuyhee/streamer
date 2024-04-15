import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ProtectedStack } from './protected';
import { AuthStack } from './auth';

type Props = {};

export const RootNavigation = (props: Props) => {
  return (
    <NavigationContainer>
      <ProtectedStack />
    </NavigationContainer>
  );
};
