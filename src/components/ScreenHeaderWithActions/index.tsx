import React, { Component } from 'react';
import Text from '_components/Text';
import color from '_config/colors';
import styles from './styles';

import {withNavigation} from 'react-navigation';
import { TouchableOpacity } from 'react-native';
import { Header, Left, Body, Right, Title } from 'native-base';

interface HeaderProps {
  title?: string,
  leftText?: string;
  rightText?: string;
  goBackOnLeftTextPress?: boolean;
  onLeftTextPress?: any;
  onRightTextPress?: any;
  navigation: any;
}

const ScreenHeaderWithActions = (props: HeaderProps): any => {
  const {leftText, rightText} = props;

  const onLeftTextPress = (): void => {
    if (props.goBackOnLeftTextPress) {
      props.navigation.goBack();
    } else if (props.onLeftTextPress) {
      props.onLeftTextPress();
    }
  };

  return (
    <Header style={styles.container} androidStatusBarColor={color.stainedWhite}>
      <Left style={styles.leftContainer}>
        {leftText && (
          <TouchableOpacity style={styles.center} onPress={onLeftTextPress}>
            <Text style={styles.leftText}>{leftText}</Text>
          </TouchableOpacity>
        )}
      </Left>
      <Body style={styles.middleContainer}>
        <Title style={styles.centerText}>{props.title}</Title>
      </Body>
      <Right style={styles.rightContainer}>
        {rightText && (
          <TouchableOpacity
            style={styles.rightContent}
            onPress={props.onRightTextPress}>
            <Text style={styles.rightText}>{rightText}</Text>
          </TouchableOpacity>
        )}
      </Right>
    </Header>
  );
};

ScreenHeaderWithActions.defaultProps = {
  goBackOnLeftTextPress: true,
};

export default withNavigation(ScreenHeaderWithActions);
