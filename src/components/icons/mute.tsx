import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgIconProps } from './type';

export const MuteIcon: React.FC<SvgIconProps> = ({ color = '#fff' }) => {
  return (
    <Svg width={20} height={20} viewBox="0 0 256 256" fill={color}>
       <Path
        d="M168 64v64a40 40 0 01-40 40 40 40 0 01-40-40V64a40 40 0 0140-40 40 40 0 0140 40z"
        opacity={0.2}
      />
      <Path d="M128 176a48.05 48.05 0 0048-48V64a48 48 0 00-96 0v64a48.05 48.05 0 0048 48zM96 64a32 32 0 0164 0v64a32 32 0 01-64 0zm40 143.6V240a8 8 0 01-16 0v-32.4A80.11 80.11 0 0148 128a8 8 0 0116 0 64 64 0 00128 0 8 8 0 0116 0 80.11 80.11 0 01-72 79.6z" />
    </Svg>
  );
};
