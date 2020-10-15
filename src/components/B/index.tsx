import React from 'react';
import { StyleProp } from 'react-native';
import Text from './Text';

interface BProps {
  fn?: () => void;
  style?: StyleProp;
  children?: React.ReactNode;
  weight?: string;
  color?: string;
  size?: number;
}

const B: React.FC<BProps> = ({ fn, size, children, color, weight, style }) => (
  <Text
    onPress={fn}
    style={[style, { fontWeight: weight || 'bold', fontSize: size, color }]}>
    {children}
  </Text>
);

export default B;