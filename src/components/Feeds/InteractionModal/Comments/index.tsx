import React from 'react';
import Text from '_components/Text';
import Footer from '../Footer';
import Spinner from '_components/Spinner';
import styles from './styles';
import {View, Image, TouchableOpacity} from 'react-native';
import {strings} from '../../../../utils/i18n';
import {getUserAvatarImageSource} from '../../../../utils/assets';
import {navigateToUserProfile} from "../../../../utils/navigation";

const Comment = ({ imageSource, name, text, onPress }) => (
  <View style={styles.pv10}>
    <View style={styles.commentContainer}>
      <TouchableOpacity onPress={onPress} style={styles.viewImage}>
        <Image style={styles.image} source={imageSource} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  </View>
);

export default ({commenters, loading, onToggle}) => {
  if (loading) {
    return <Spinner />;
  }

  if (commenters.length === 0) {
    return (
      <View style={styles.container}>
        <Text>{strings('Post.nobodyHasCommentedOnThisPost')}</Text>
      </View>
    );
  }
  return commenters.map((c) => (
    <Comment
      name={c && c.author && c.author.name}
      key={c.id}
      text={c && c.text}
      imageSource={getUserAvatarImageSource(c.author)}
      onPress={() => {
        onToggle();
        navigateToUserProfile(c.author);
      }}
    />
  ));
};
