import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Header, Left, Body, Right, Title } from 'native-base';
import Text from '_components/Text';
import {strings} from '../../../utils/i18n';

import color from '_config/colors';
import styles from './styles';

interface HeaderProps {
  onShare: () => void;
  postText: string;
}

export default ({ props, onShare, postText }: HeaderProps) => {
  return (
    <Header style={styles.container} androidStatusBarColor={color.stainedWhite}>
      <Left style={styles.leftContainer}>
        <TouchableOpacity style={styles.center} onPress={() => props.navigation.goBack()}>
          <Text style={styles.leftText}>{strings('Common.abort')}</Text>
        </TouchableOpacity>
      </Left>
      <Body style={styles.middleContainer}>
        <Title style={styles.centerText}>{strings('Common.shareAPost')}</Title>
      </Body>
      <Right style={styles.rightContainer}>
        <TouchableOpacity style={styles.rightContent} onPress={() => onShare()}>
          <Text style={styles.rightText}>{strings('Common.share')}</Text>
        </TouchableOpacity>
      </Right>
    </Header >
  );
}
