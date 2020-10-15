import React from 'react';
import Text from '_components/Text';
import styles from './styles';
import extStyles from '_utils/styles';
import color from '_config/colors';
import navigationService from '../../services/navigationService';
import { TouchableOpacity, Image } from 'react-native';
import { Header, Left, Body, Right } from 'native-base';

const HeaderComp = ({ props, news, title, fn, subTitle }) => {
  return (
    <Header
      style={styles.container}
      androidStatusBarColor={color.blurredWhite}
      barStyle="dark-content"
      iosBarStyle="dark-content">
      {news ? (
        <Left style={extStyles.flex1} />
      ) : (
        <Left style={extStyles.flex1}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => fn ? fn() : navigationService.goBack()}
          >

            <Image
              style={styles.icon}
              source={require('_assets/black-back.png')}
            />

          </TouchableOpacity>
        </Left>
      )}
      <Body
        style={title && title.length > 20 ? styles.longText : styles.shortText}>
        <Text style={styles.headerTitle}>{title}</Text>
        {subTitle && <Text style={styles.headerSubTitle}>{subTitle}</Text>}
      </Body>
      <Right style={{flex: title && title.length > 20 ? 0 : 1}} />
    </Header>
  );
};

export default HeaderComp;
