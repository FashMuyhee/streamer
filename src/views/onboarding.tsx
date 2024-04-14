import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthScreenParams } from '@routes/type';
import { useTheme } from '@hooks';
import { Button, CenterView, ScreenWrapper, Text } from '@components';
import { View } from 'react-native';

type Props = {
  navigation: NativeStackNavigationProp<AuthScreenParams>;
};

export const OnboardingScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();

  return (
    <ScreenWrapper>
      <View style={{ width: '100%', height: '50%', backgroundColor: colors.GREEN, borderRadius: 20, marginTop: '15%', marginBottom: '10%' }} />
      <Text textAlign="center" fontSize={30} textTransform="capitalize">
        The live stage for your voice. Stream now !.
      </Text>
      <CenterView style={{ width: '100%', position: 'absolute', bottom: 50, alignSelf: 'center' }}>
        <Button title="Create an Account" onPress={() => navigation.navigate('register')} />
        <Text onPress={() => navigation.navigate('login')}>
          Already have an account ? <Text color={colors.BLUE}>Login</Text>
        </Text>
      </CenterView>
    </ScreenWrapper>
  );
};
