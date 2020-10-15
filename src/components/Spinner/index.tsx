import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, StyleProp, View } from 'react-native';

import colors from '_config/colors';
import styles from './styles';

interface Props {
  size?: number | 'small' | 'large';
  color?: string;
  style: StyleProp
}
const Spinner: React.FC<Props> = ({ size, color, style, rest }) => (
  <View style={[styles.spinnerStyle, style]}{...rest}>
    <ActivityIndicator size={size} color={color || 'yellow'} />
  </View>
);

Spinner.defaultProps = {
  size: 'large',
  color: colors.lightGreen,
};

Spinner.propTypes = {
  color: PropTypes.string,
};

export default Spinner;