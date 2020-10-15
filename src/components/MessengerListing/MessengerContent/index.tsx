import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import Text from '_components/Text';

// import NavigationService from '_services/navigationService';

import styles from './styles';

const RoundedView = ({ style }) => <View style={[styles.roundedView, style]} />


// tslint:disable-next-line:no-unused-expression
export default ({ goToMessage, active, imgSource, upText, downText, data }) => {
  return (
    <TouchableOpacity
      onPress={() => goToMessage(data)}
      style={styles.container}>
      <>
        <View style={styles.extra}>
          {
            active ? <RoundedView style={styles.roundedViewActive} /> : null
          }
        </View>
        <View style={styles.leftContainer}>
          <Image
            style={styles.imageStyle}
            source={imgSource}
          />
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.upText}>{upText}</Text>
          <Text style={styles.downText}>{downText}</Text>
        </View>
      </>
    </TouchableOpacity>
  );

};
