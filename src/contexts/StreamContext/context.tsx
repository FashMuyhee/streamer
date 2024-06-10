import React from 'react';
import { IStreamContext } from './type';
import { Call } from '@stream-io/video-react-native-sdk';

const initialValue: IStreamContext = {
  onSaveStream: () => {},
  stream: undefined,
};

export const StreamContext = React.createContext<IStreamContext>(initialValue);

export const StreamContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [stream, setStream] = React.useState<Call | undefined>(undefined);

  const onSaveStream = (stream: Call) => {
    setStream(stream);
  };

  const value = React.useMemo(() => {
    return { stream, onSaveStream };
  }, [stream]);

  return <StreamContext.Provider value={value}>{children}</StreamContext.Provider>;
};

export const useStreamContext = () => {
  return React.useContext(StreamContext);
};
