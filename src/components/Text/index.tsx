import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import PropTypes, { oneOfType } from 'prop-types';
import styles from './styles';


interface Props {
  style?: TextStyle;
  children: React.ReactNode;
  onPress?: () => void;
}

const TextN: React.FC<Props> = ({ onPress, style, children }) => (
  <Text onPress={onPress} style={[styles.text, style]}>
    {children}
  </Text>
);


TextN.defaultProps = {
  onPress: null,
  style: {},
  children: '',
};

TextN.propTypes = {
  onPress: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.number,
  ]),
};
export default TextN;