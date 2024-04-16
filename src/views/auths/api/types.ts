export interface RegisterPayload extends LoginPayload {
  firstName: string;
  lastName: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export enum FirebaseAuthErrorCode {
  // Account existence errors
  INVALID_EMAIL = 'auth/invalid-email',
  EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use',
  WEAK_PASSWORD = 'auth/weak-password',

  // Sign in errors
  INVALID_PASSWORD = 'auth/wrong-password',
  ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL = 'auth/account-exists-with-different-credential',
  INVALID_CREDENTIAL = 'auth/invalid-credential',
  USER_DISABLED = 'auth/user-disabled',
  TOO_MANY_ATTEMPTS = 'auth/too-many-requests',
  OPERATION_NOT_ALLOWED = 'auth/operation-not-allowed',

  // Sign up errors
  EMAIL_EXISTS = 'auth/email-already-exists',

  // Linking and unlinking errors
  CREDENTIAL_ALREADY_IN_USE = 'auth/credential-already-in-use',
  INVALID_CREDENTIALS = 'auth/invalid-verification-code',
  INVALID_PROVIDER = 'auth/invalid-provider',
  PROVIDER_ALREADY_LINKED = 'auth/provider-already-linked',
  PROVIDER_NOT_FOUND = 'auth/provider-not-found',
  FEDERATED_USER_ID_ALREADY_LINKED = 'auth/federated-user-id-already-linked',

  // Other errors
  INVALID_USER_TOKEN = 'auth/invalid-user-token',
  USER_NOT_FOUND = 'auth/user-not-found',
  SESSION_EXPIRED = 'auth/session-expired',
  MISSING_EMAIL = 'auth/missing-email',
  INVALID_CODE = 'auth/invalid-verification-code',
  INTERNAL_ERROR = 'auth/internal-error',
  UNSUPPORTED_OPERATION = 'auth/unsupported-operation',
  ARGUMENT_ERROR = 'auth/argument-error',
  TIMEOUT = 'auth/timeout',
  CAPTCHA_EXPIRED = 'auth/captcha-expired',
  INVALID_API_KEY = 'auth/invalid-api-key',
  INVALID_PLAY_SERVICES = 'auth/invalid-play-services',
  NETWORK_ERROR = 'auth/network-error',
  USER_CANCELLED = 'auth/user-cancelled',
}

export interface AuthError {
  code: FirebaseAuthErrorCode;
  message: string;
}
