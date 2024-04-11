import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ScreenParams} from './type';
import {HomeScreen, OnboardingScreen, RoomScreen} from '@views';
import {BackArrow} from './components';

const Nav = createNativeStackNavigator<ScreenParams>();

export const Stack = () => {
  return (
    <Nav.Navigator
      screenOptions={{
        statusBarStyle: 'dark',
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 16,
        },

        headerLeft: () => <BackArrow />,
      }}>
      <Nav.Screen
        name="onboarding"
        component={OnboardingScreen}
        options={{headerShown: false}}
      />
      <Nav.Screen name="home" component={HomeScreen} />
      <Nav.Screen name="room" component={RoomScreen} />
    </Nav.Navigator>
  );
};
