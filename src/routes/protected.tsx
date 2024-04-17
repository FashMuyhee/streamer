import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProtectedScreenParams } from './type';
import { CallScreen, HomeScreen } from '@views';
import { BackArrow } from './components';
import { useAuth, useTheme } from '@hooks';
import { ProfileScreen } from '@views/profile';
import { FONTS } from '@utils';
import { IconButton } from '@components/commons/IconButton';
import { SignOutIcon } from '@components';

const Nav = createNativeStackNavigator<ProtectedScreenParams>();

export const ProtectedStack = () => {
  const { colors, theme } = useTheme();
  const { onLogout } = useAuth();

  return (
    <Nav.Navigator
      initialRouteName="home"
      screenOptions={{
        statusBarStyle: theme == 'light' ? 'dark' : 'light',
        statusBarColor: colors.PRIMARY,
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 16,
          fontFamily: FONTS.BOLD,
        },
        headerStyle: {
          backgroundColor: colors.PRIMARY,
        },
        headerTintColor: colors.TEXT,
        title: '',
        headerLeft: () => <BackArrow />,
      }}
    >
      <Nav.Screen name="home" component={HomeScreen} options={{ headerShown: false }} />
      <Nav.Screen name="call" component={CallScreen} />
      <Nav.Screen
        name="profile"
        component={ProfileScreen}
        options={{ title: 'Profile', headerRight: () => <IconButton onPress={onLogout} size={30} icon={<SignOutIcon color={colors.TEXT} />} /> }}
      />
    </Nav.Navigator>
  );
};
