import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgIconProps } from './type';

export const SpeakerIcon: React.FC<SvgIconProps> = ({ color = '#fff' }) => {
  return (
    <Svg width={20} height={20} viewBox="0 0 256 256" fill={color}>
      <Path d="M157.27 21.22a12 12 0 00-12.64 1.31L75.88 76H32a20 20 0 00-20 20v64a20 20 0 0020 20h43.88l68.75 53.47A12 12 0 00164 224V32a12 12 0 00-6.73-10.78zM36 100h32v56H36zm104 99.46l-48-37.33V93.87l48-37.33zM212 128a44 44 0 01-11 29.11 12 12 0 11-18-15.88 20 20 0 000-26.43 12 12 0 0118-15.86A43.94 43.94 0 01212 128zm40 0a83.87 83.87 0 01-21.39 56 12 12 0 01-17.89-16 60 60 0 000-80 12 12 0 1117.88-16 83.87 83.87 0 0121.4 56z" />
    </Svg>
  );
};
