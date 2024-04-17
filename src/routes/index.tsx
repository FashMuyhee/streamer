import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ProtectedStack } from './protected';
import { AuthStack } from './auth';
import { useAuth } from '@hooks';
import { Loader } from '@views';

export const RootNavigation = () => {
  const { isAuth, initializing } = useAuth();

  if (initializing) {
    return <Loader />;
  }

  return <NavigationContainer>{!isAuth ? <AuthStack /> : <ProtectedStack />}</NavigationContainer>;
};
