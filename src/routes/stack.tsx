import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenParams } from './type';
import { HomeScreen, OnboardingScreen, RoomScreen } from '@views';
import { BackArrow } from './components';
import { useTheme } from '@hooks';

const Nav = createNativeStackNavigator<ScreenParams>();

export const Stack = () => {
  const { colors, theme } = useTheme();

  return (
    <Nav.Navigator
      screenOptions={{
        statusBarStyle: theme,
        statusBarColor: colors.PRIMARY,
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 16,
        },
        headerStyle: {
          backgroundColor: colors.PRIMARY,
        },
        headerTintColor: colors.TEXT,
        title: '',
        headerLeft: () => <BackArrow />,
      }}
    >
      <Nav.Screen name="onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
      <Nav.Screen name="home" component={HomeScreen} />
      <Nav.Screen name="room" component={RoomScreen} />
    </Nav.Navigator>
  );
};
