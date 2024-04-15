import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProtectedScreenParams } from './type';
import { CallScreen, HomeScreen } from '@views';
import { BackArrow } from './components';
import { useTheme } from '@hooks';

const Nav = createNativeStackNavigator<ProtectedScreenParams>();

export const ProtectedStack = () => {
  const { colors, theme } = useTheme();

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
        },
        headerStyle: {
          backgroundColor: colors.PRIMARY,
        },
        headerTintColor: colors.TEXT,
        title: '',
        headerLeft: () => <BackArrow />,
      }}
    >
      <Nav.Screen name="home" component={HomeScreen} />
      <Nav.Screen name="call" component={CallScreen} />
    </Nav.Navigator>
  );
};