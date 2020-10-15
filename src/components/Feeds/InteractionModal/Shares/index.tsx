import React from 'react';
import { View } from 'react-native';
import Text from '_components/Text';
import Spinner from '_components/Spinner';
import PersonInfo from '../PersonInfo';
import styles from './styles';
import {strings} from '../../../../utils/i18n';
import {getUserAvatarImageSource} from "../../../../utils/assets";
import {navigateToUserProfile} from "../../../../utils/navigation";

export default ({sharers, loading, onToggle}) => {
  if (loading) {
    return <Spinner />;
  }

  if (sharers.length === 0) {
    return (
      <View style={styles.container}>
        <Text>{strings('Post.nobodyHasSharedThisPost')}</Text>
      </View>
    );
  }

  return sharers.map((c) => (
    <PersonInfo
      key={c.id}
      imageSource={getUserAvatarImageSource(c.author)}
      name={c && c.author && c.author.name}
      onPress={() => {
        onToggle();
        navigateToUserProfile(c.author);
      }}
    />
  ));
};
