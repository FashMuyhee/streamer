import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthScreenParams } from './type';
import { OnboardingScreen } from '@views';
import { useTheme } from '@hooks';
import { LoginScreen, RegisterScreen } from '@views/auths';

const Nav = createNativeStackNavigator<AuthScreenParams>();

export const AuthStack = () => {
  const { colors, theme } = useTheme();

  return (
    <Nav.Navigator
      initialRouteName="onboarding"
      screenOptions={{
        statusBarStyle: theme == 'light' ? 'dark' : 'light',
        statusBarColor: colors.PRIMARY,
        headerShown: false,
      }}
    >
      <Nav.Screen name="onboarding" component={OnboardingScreen} />
      <Nav.Screen name="login" component={LoginScreen} />
      <Nav.Screen name="register" component={RegisterScreen} />
    </Nav.Navigator>
  );
};
