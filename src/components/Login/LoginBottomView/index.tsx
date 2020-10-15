import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Text from '_components/Text';
import Button from '_components/Button';
import styles from './styles';
import { strings } from '_utils/i18n';

const LoginBottomView = ({ goToRegister,shift }) => (
  <View style={[styles.container,shift ? styles.shiftKeyboard : null]}>
    <View style={styles.containerView}>
      <View style={styles.horizontalLine} />
      <View style={styles.innerBottomView}>
        <Text style={styles.text}>{strings('Login.or')}</Text>
      </View>
      <View style={styles.horizontalLine} />
    </View>

    <Button
      text={strings('Login.createANewAccount')}
      fn={goToRegister}
      style={styles.button}
      fontStyle={styles.buttonText}
    />
  </View>
);

export default LoginBottomView;
