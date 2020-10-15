import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Container, Header, Left, Right, Button, Icon } from 'native-base';
import Text from '_components/Text';
import {strings} from '../../../utils/i18n';

import color from '_config/colors';
import styles from './styles';
import extStyle from '_utils/styles';

import navigationService from '_services/navigationService';

const HeaderComp = () => {
  return (
    <Header
      style={styles.container}
      androidStatusBarColor={color.stainedWhite}
      barStyle="dark-content"
      iosBarStyle="dark-content"
    >
      <Left style={extStyle.flex1} />
      <View style={styles.findPeopleContainer}>
        <Text style={styles.titleText}>{strings('Misc.findPeople')}</Text>
      </View>
      <Right style={extStyle.flex1}>
        <TouchableOpacity style={styles.forwardButton} onPress={() => navigationService.navigate('Feeds')}>
          <Text style={styles.forwardText}>{strings('Common.forward')}</Text>
        </TouchableOpacity>
      </Right>
    </Header>
  );
}

export default HeaderComp;

