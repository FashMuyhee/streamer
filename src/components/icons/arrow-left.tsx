import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {SvgIconProps} from './type';

export const ArrowLeftIcon: React.FC<SvgIconProps> = ({color = '#292D32'}) => {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path
        d="M7.178 4.447L2.625 9l4.553 4.553M15.375 9H2.752"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
