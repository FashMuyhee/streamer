import { useFirebaseCreate } from '@hooks';
import { AuthError, FirebaseAuthErrorCode, LoginPayload, RegisterPayload } from './types';
import usePostRequest from '@hooks/usePostRequest';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

export const useRegister = () => {
  const { onCreate } = useFirebaseCreate();
  return usePostRequest<any, RegisterPayload, AuthError>({
    onPost: (payload) => {
      const register = async () => {
        const res = await auth().createUserWithEmailAndPassword(payload.email, payload.password);
        const { password, ...restPayload } = payload;
        onCreate(
          `users/${res.user.uid}`,
          { ...restPayload, dateJoined: res.user.metadata.creationTime },
          {
            onSuccess: () => {
              res.user.sendEmailVerification();
            },
          }
        );
      };
      return register();
    },
    onError: (error) => {
      switch (error.code) {
        case FirebaseAuthErrorCode.INVALID_EMAIL:
          Toast.show({ text1: 'Invalid Email Address', type: 'error' });
          break;
        case FirebaseAuthErrorCode.EMAIL_EXISTS:
        case FirebaseAuthErrorCode.EMAIL_ALREADY_IN_USE:
        case FirebaseAuthErrorCode.ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL:
          Toast.show({ text1: 'Email already exists', type: 'error' });
          break;
        case FirebaseAuthErrorCode.WEAK_PASSWORD:
          Toast.show({ text1: 'Weak Password, Please use a stronger password', type: 'error' });
        default:
          Toast.show({ text1: 'Something went wrong please try again', type: 'error' });
          break;
      }
    },
    onSuccess: () => {
      Toast.show({ text1: 'Registration Successful', type: 'success' });
    },
  });
};

export const useLogin = () => {
  return usePostRequest<any, LoginPayload, AuthError>({
    onPost: (payload) => {
      const login = async () => {
        const res = await auth().signInWithEmailAndPassword(payload.email, payload.password);
      };
      return login();
    },
    onError: (error) => {
      switch (error.code) {
        case FirebaseAuthErrorCode.INVALID_EMAIL:
          Toast.show({ text1: 'Invalid Email Address', type: 'error' });
          break;
        case FirebaseAuthErrorCode.USER_DISABLED:
          Toast.show({ text1: 'Account disabled contact admin', type: 'error' });
          break;
        case FirebaseAuthErrorCode.INVALID_CREDENTIAL:
        case FirebaseAuthErrorCode.INVALID_CREDENTIALS:
          Toast.show({ text1: 'Invalid credentials', type: 'error' });
          break;
        case FirebaseAuthErrorCode.USER_NOT_FOUND:
          Toast.show({ text1: 'User not found', type: 'error' });
          break;
        case FirebaseAuthErrorCode.WEAK_PASSWORD:
          Toast.show({ text1: 'Weak Password, Please use a stronger password', type: 'error' });
        default:
          Toast.show({ text1: 'Something went wrong please try again', type: 'error' });
          break;
      }
    },
  });
};
