import React from 'react';
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native';

import color from '_config/colors';

import styles from './styles';


export default ({ loading, ...attributes }) => (
  <Modal
    transparent
    animationType="none"
    visible={loading}
    onRequestClose={() => {
      console.log('close modal');
    }}
  >
    <View style={styles.modalBackground}>
      <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator color={color.lightGreen} animating={loading} />
      </View>
    </View>
  </Modal>
);

