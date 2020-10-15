import React from 'react';
import Text from '_components/Text';
import navigationService from '../../../../services/navigationService';
import styles from './styles';
import {View, Image, TouchableOpacity} from 'react-native';
import {strings} from '../../../../utils/i18n';
import {toTimeAgo} from '../../../../utils/common';
import {getUserAvatarImageSource} from "../../../../utils/assets";

const badgeColor = text => {
  switch (text) {
    case 'forum':
      return styles.questionBox;
    case 'question':
      return styles.questionBox;
    case 'help':
      return {};
    default:
      return {};
  }
};

const postTypeMap = {
  question: strings('Post.question'),
  help: strings('Post.help'),
};

export default ({postType, statusFeed, post, MenuToggler}) => {
  const goToProfile = (): void => {
    const author = post.author;

    if (author) {
      if (author.type === 'user') {
        navigationService.push('UserProfile', {
          userId: author.id,
        });
      } else if (author.type === 'farm') {
        navigationService.push('FarmProfile', {
          farmId: author.id,
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View>
          <TouchableOpacity onPress={goToProfile}>
            <Image
              style={styles.image}
              source={getUserAvatarImageSource(post.author)}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.nameContainer}>
          <TouchableOpacity onPress={goToProfile}>
            <Text style={styles.nameText}>{post.author.name}</Text>
          </TouchableOpacity>
          <Text style={styles.daysAgoText}>
            {toTimeAgo((post && post.created_at) * 1000)}
          </Text>
        </View>
      </View>
      {/* <View style={styles.middleContainer}>
      <Text style={styles.middleText}>  Grubholf  </Text>
    </View> */}

      <View style={[styles.box, badgeColor(postType)]}>
        <Text style={styles.boxText}>{postTypeMap[postType] || postType}</Text>
        {/* <Text style={styles.boxText}>{postType === 'forum' ? 'forum' : 'help'}</Text> */}
      </View>
      {MenuToggler && <MenuToggler />}
    </View>
  );
};
