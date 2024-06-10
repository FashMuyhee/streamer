import { Call } from '@stream-io/video-react-native-sdk';

export interface IStreamContext {
  stream?: Call;
  onSaveStream(c: Call): void;
}
