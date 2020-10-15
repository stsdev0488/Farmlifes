import React from 'react';
import Text from '_components/Text';
import Spinner from '_components/Spinner';
import PersonInfo from '../PersonInfo';
import styles from './styles';
import { View } from 'react-native';
import {strings} from '../../../../utils/i18n';
import {getUserAvatarImageSource} from '../../../../utils/assets';
import {navigateToUserProfile} from '../../../../utils/navigation';

export default ({likers, loading, onToggle}) => {
  if (loading) {
    return <Spinner />;
  }

  if (likers.length === 0) {
    return (
      <View style={styles.container}>
        <Text>{strings('Post.nobodyHasLikedThisPost')}</Text>
      </View>
    );
  }
  return likers.map((c)=> (
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
