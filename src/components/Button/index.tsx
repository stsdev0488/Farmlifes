import React from 'react';
import {TouchableOpacity, View} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'

import Spinner from '_components/Spinner';
import Text from '_components/Text';

import styles, {primaryButtonStyles} from './styles';
import colors from '_config/colors';


interface ButtonProps {
  text: string;
  fn?: () => void;
  loading?: boolean;
  style?: any;
  fontStyle?: any;
  iconName?: string;
  iconStyle?: any;
  image?: boolean;
  loadingSpinnerProps?: any;
}

const Button = ({
  text,
  fn,
  style,
  loading,
  fontStyle,
  image,
  iconName,
  iconStyle,
  loadingSpinnerProps,
  ...rest
}: ButtonProps) => {
  const displayIcon = iconName || image;
  const displayIconName = iconName || 'envelope';

  return (
    <View>
      <TouchableOpacity
        disabled={loading}
        onPress={fn}
        style={[styles.button, style]}
        {...rest}>
        {loading ? (
          <Spinner color={colors.white} size="small" {...loadingSpinnerProps} />
        ) : (
          <>
            {displayIcon ? (
              <View style={styles.row}>
                <Icon
                  name={displayIconName}
                  style={[styles.iconStyle, iconStyle]}
                />
                <Text style={[styles.buttonText, fontStyle]}>{text}</Text>
              </View>
            ) : (
              <Text style={[styles.buttonText, fontStyle]}>{text}</Text>
            )}
          </>
        )}
      </TouchableOpacity>
    </View>
  )
};

export const PrimaryButton = ({...rest}) => (
  <Button
    style={primaryButtonStyles.main}
    fontStyle={primaryButtonStyles.text}
    {...rest}
  />
);

export default Button
