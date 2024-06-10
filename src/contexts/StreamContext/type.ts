import { Call } from '@stream-io/video-react-native-sdk';

export interface IStreamContext {
  stream?: Call;
  onChangeStream(c: Call | null): void;
}
