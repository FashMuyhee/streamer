import React from 'react';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { ScreenWrapperProps } from './types';
import { useTheme } from '@hooks';
import { SCREEN_PADDING } from '@utils';

export const ScreenWrapper = ({
  children,
  bg,
  padding = SCREEN_PADDING,
  noEdges = false,
  style,
}: ScreenWrapperProps) => {
  const { colors } = useTheme();
  bg = bg ? bg : colors.PRIMARY;

  const edges: Edge[] = React.useMemo(() => {
    return noEdges ? ['bottom'] : ['bottom', 'top'];
  }, [noEdges]);

  return (
    <SafeAreaView
      style={[{ backgroundColor: bg, paddingHorizontal: padding, flex: 1 }, style]}
      edges={edges}
    >
      {children}
    </SafeAreaView>
  );
};
