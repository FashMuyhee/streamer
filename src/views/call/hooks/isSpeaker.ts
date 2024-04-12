import { SfuModels, StreamVideoParticipant } from '@stream-io/video-react-native-sdk';

export const isSpeaker = (p: StreamVideoParticipant) => {
  const hasAudio = () => p?.publishedTracks.includes(SfuModels.TrackType.AUDIO);

  return hasAudio();
};
