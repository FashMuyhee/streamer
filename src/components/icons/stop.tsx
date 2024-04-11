import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgIconProps } from './type';

export const StopIcon: React.FC<SvgIconProps> = ({ color = '#fff' }) => {
  return (
    <Svg width={20} height={20} viewBox="0 0 256 256" fill={color}>
      <Path
        d="M208 56v144a8 8 0 01-8 8H56a8 8 0 01-8-8V56a8 8 0 018-8h144a8 8 0 018 8z"
        opacity={0.2}
      />
      <Path d="M200 40H56a16 16 0 00-16 16v144a16 16 0 0016 16h144a16 16 0 0016-16V56a16 16 0 00-16-16zm0 160H56V56h144v144z" />
    </Svg>
  );
};
