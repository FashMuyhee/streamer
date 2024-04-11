import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgIconProps } from './type';

export const EarphoneIcon: React.FC<SvgIconProps> = ({ color = '#fff' }) => {
  return (
    <Svg width={20} height={20} viewBox="0 0 256 256" fill={color}>
      <Path d="M204.73 51.85A108.07 108.07 0 0020 128v56a28 28 0 0028 28h16a28 28 0 0028-28v-40a28 28 0 00-28-28H44.84A84.05 84.05 0 01128 44h.64a83.7 83.7 0 0182.52 72H192a28 28 0 00-28 28v40a28 28 0 0028 28h16a28 28 0 0028-28v-56a107.34 107.34 0 00-31.27-76.15zM64 140a4 4 0 014 4v40a4 4 0 01-4 4H48a4 4 0 01-4-4v-44zm148 44a4 4 0 01-4 4h-16a4 4 0 01-4-4v-40a4 4 0 014-4h20z" />
    </Svg>
  );
};
