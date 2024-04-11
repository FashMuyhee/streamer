import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgIconProps } from './type';

export const UnmuteIcon: React.FC<SvgIconProps> = ({ color = '#fff' }) => {
  return (
    <Svg width={20} height={20} viewBox="0 0 256 256" fill={color}>
       <Path
        d="M168 64v64a40 40 0 01-40 40 40 40 0 01-40-40V64a40 40 0 0140-40 40 40 0 0140 40z"
        opacity={0.2}
      />
      <Path d="M213.92 218.62l-160-176a8 8 0 00-11.84 10.76L80 95.09V128a48 48 0 0069.11 43.12l11.1 12.2A63.41 63.41 0 01128 192a64.07 64.07 0 01-64-64 8 8 0 00-16 0 80.11 80.11 0 0072 79.6V240a8 8 0 0016 0v-32.41a78.83 78.83 0 0035.16-12.22l30.92 34a8 8 0 1011.84-10.76zM128 160a32 32 0 01-32-32v-15.31l41.66 45.82A32 32 0 01128 160zm57.52-3.91A63.32 63.32 0 00192 128a8 8 0 0116 0 79.16 79.16 0 01-8.11 35.12 8 8 0 01-7.19 4.49 7.88 7.88 0 01-3.51-.82 8 8 0 01-3.67-10.7zM84 44.87A48 48 0 01176 64v64a49.19 49.19 0 01-.26 5 8 8 0 01-8 7.17 8.13 8.13 0 01-.84 0 8 8 0 01-7.12-8.79c.11-1.1.17-2.24.17-3.36V64a32 32 0 00-61.31-12.75A8 8 0 1184 44.87z" />
    </Svg>
  );
};