import React, { Fragment } from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import PropTypes from 'prop-types';
import FeatherIcon from 'react-native-vector-icons/Feather';

import Text from '../Text';
import styles from './styles';
import colors from '_config/colors';




interface InputProps {
  showPassword?: () => void;
  medium?: boolean;
  showPass?: boolean;
  style?: any;
  textStyle?: any;
  placeHolderColor?: string;
  multiline?: boolean;
  sideImageStatus?: boolean;
  sideImage?: ImageSourcePropType;
  numb?: string;
  value?: string;
  error?: boolean;
  errorMessage?: string;
  leftImageStatus?: boolean;
  leftImage?: ImageSourcePropType;
}

const Input = ({
  secure,
  showPassword,
  medium,
  showPass,
  style,
  textStyle,
  placeHolderColor,
  multiline,
  sideImageStatus,
  sideImage,
  numb,
  error,
  errorMessage,
  leftImageStatus,
  leftImage,
  errorStyle,
  // numberOfLines,
  ...rest
}: InputProps) => {
  return (
    <View style={[styles.column, error ? styles.errorInputContainerStyle: null]}>
      <View style={[styles.container, style, error ? styles.mainErrorContainer : null]}>
        <TextInput
          placeholderTextColor={placeHolderColor || colors.eyeIconColor}

          // placeholderStyle={styles.placeHolderStyle}
          secureTextEntry={secure}
          autoCapitalize="none"
          multiline={multiline}
          underlineColorAndroid="rgba(0,0,0,0)"
          spellCheck={false}
          autoCorrect={false}
          blurOnSubmit={false}
          // numberOfLines={multiline ? 5 : 1}
          keyboardType={numb ? 'numeric' : 'default'}
          style={{
            ...styles.text,
            ...textStyle,
            ...(error ? styles.errorTextCont : {}),
          }}
          {...rest}
        />
        <Fragment>
          {showPass ? (
            <View style={styles.viewInImage}>
              <TouchableOpacity
                style={styles.touchableButton}
                onPress={showPassword}>
                {secure ? <FeatherIcon name="eye" size={20} color={colors.eyeIconColor} /> : <FeatherIcon name="eye-off" size={20} color={colors.eyeIconColor} />}
              </TouchableOpacity>
            </View>
          ) : null}
        </Fragment>
        <Fragment>
          {leftImageStatus ? (
            <View style={styles.sideImageStyle2}>
              <Image source={leftImage} />
            </View>
          ) : null}
        </Fragment>
        <Fragment>
          {sideImageStatus ? (
            <View style={styles.sideImageStyle}>
              <Image source={sideImage} />
            </View>
          ) : null}
        </Fragment>
      </View>
      <Fragment>
        {error ? (
          <View style={[styles.errorContainer,errorStyle]}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}
      </Fragment>
    </View>
  )
};

Input.defaultProps = {
  secure: null,
  showPass: null,
  showPassword: null,
  medium: null,
  onChange: null,
  multiline: false,
  placeHolderColor: '',
};

Input.propTypes = {
  placeHolderColor: PropTypes.string,
  secure: PropTypes.bool,
  showPass: PropTypes.bool,
  medium: PropTypes.bool,
  multiline: PropTypes.bool,
  showPassword: PropTypes.func,
};

export default Input;
