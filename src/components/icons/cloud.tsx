import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgIconProps } from './type';

export const CloudIcon: React.FC<SvgIconProps> = ({ color = '#fff' }) => {
  return (
    <Svg width={20} height={20} viewBox="0 0 256 256" fill={color}>
       <Path
        d="M240 120a40 40 0 01-40 40h-40V80h40a40 40 0 0140 40z"
        opacity={0.2}
      />
      <Path d="M248 120a48.05 48.05 0 00-48-48h-39.8c-2.91-.17-53.62-3.74-101.91-44.24A16 16 0 0032 40v160a16 16 0 0026.29 12.25c37.77-31.68 77-40.76 93.71-43.3v31.72a16 16 0 007.12 13.33l11 7.33A16 16 0 00194.5 212l11.77-44.36A48.07 48.07 0 00248 120zM48 199.93V40c42.81 35.91 86.63 45 104 47.24v65.48c-17.35 2.28-61.16 11.35-104 47.21zm131 8v.11l-11-7.33V168h21.6zM200 152h-32V88h32a32 32 0 110 64z" />
    </Svg>
  );
};
