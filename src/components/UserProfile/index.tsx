import React, {useState} from 'react';
import {
  View,
  Image,
  ScrollView,
  ImageBackground,
  Platform,
  UIManager,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import Header from '_components/Header';
import BottomTab from '_components/BottomTab';

import Button from '_components/Button';
import Text from '_components/Text';

import Feeds from '_containers/Feeds';
import Spinner from '_components/Spinner';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import {Accordion} from 'native-base';
import colors from '../../config/colors';
import {strings} from '../../utils/i18n';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default ({
  props,
  user,
  loading,
  onSendMessagePress,
  isFollowing,
  follow,
  unfollow,
  isFollowLoading,
  onFarmTitlePress,
  loadingConversation,
  onEditPress,
}) => {
  const userInfo = useSelector(({user}) => user);

  const isOwnProfile =
    userInfo &&
    userInfo.user &&
    userInfo.user.user &&
    user &&
    user.id === userInfo.user.user.id;

  const renderProfile = () => {
    const [showDescription, setShowDescription] = useState(false);

    console.info('user', user);
    return (
      <>
        <View>
          <ImageBackground
            source={
              user && user.cover
                ? {uri: user.cover}
                : require('../../assets/placeholders/cover_picture.png')
            }
            style={styles.headerImage}>
            <View style={styles.personImageContainer}>
              <Image
                style={styles.personImage}
                source={
                  user.avatar
                    ? {uri: user.avatar}
                    : require('../../assets/placeholders/profile_picture.png')
                }
              />
            </View>
          </ImageBackground>
        </View>
        <View style={styles.userInfoContainer}>
          <View style={styles.profileContainer}>
            <View style={styles.titleContainer}>
              <TouchableOpacity
                onPress={isOwnProfile ? onEditPress : undefined}>
                <Text style={styles.userName}>{user.name}</Text>
              </TouchableOpacity>
              {isOwnProfile && (
                <TouchableOpacity onPress={onEditPress}>
                  <Icon name="pencil" size={16} style={styles.editIcon} />
                </TouchableOpacity>
              )}
            </View>

            <View>
              <TouchableOpacity onPress={onFarmTitlePress}>
                <Text style={styles.farmName}>{user['farm_name']}</Text>
              </TouchableOpacity>
            </View>

            <View>
              <Text style={styles.numberOfPost}>
                {strings('UserProfile.postsCount', {
                  postsCount: user['posts_count'],
                })}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.subContainer}>
          <View style={styles.followContainer}>
            {!isOwnProfile && (
              <View style={styles.followButtonCont}>
                <Button
                  text={strings(
                    `Common.${isFollowing ? 'subscribed' : 'follow'}`,
                  )}
                  style={[
                    styles.followButton,
                    isFollowing ? styles.unfollowButton : null,
                  ]}
                  fontStyle={[
                    styles.followButtonFont,
                    isFollowing ? styles.unfollowButtonFont : null,
                  ]}
                  fn={isFollowing ? unfollow : follow}
                  loading={isFollowLoading}
                  loadingSpinnerProps={
                    isFollowing ? {color: colors.lightGreen} : undefined
                  }
                />
              </View>
            )}

            <View style={styles.followButtonCont}>
              <Text style={styles.noOfSubscribers}>{user.subscribers}</Text>
              <Text style={styles.noOfSubscribersText}>
                {strings('Common.subscribers')}
              </Text>
            </View>

            <View style={styles.followButtonCont}>
              <Text style={styles.noOfSubscribers}>{user.subscribed}</Text>
              <Text style={styles.noOfSubscribersText}>
                {strings('Common.subscribed')}
              </Text>
            </View>
          </View>

          <View style={styles.sendInfoContainer}>
            {!isOwnProfile && (
              <View style={styles.followButtonCont}>
                <Button
                  fn={onSendMessagePress}
                  text={strings('Common.sendMessage')}
                  image={true}
                  style={styles.sendMessageButton}
                  fontStyle={styles.sendMessageButtonFont}
                  loading={loadingConversation}
                  loadingSpinnerProps={{color: colors.lightGreen}}
                />
              </View>
            )}

            <View style={styles.followButtonCont}>
              <Button
                fn={() => {
                  LayoutAnimation.configureNext({
                    duration: 300,
                    create: {
                      delay: 200,
                      type: LayoutAnimation.Types.linear,
                      property: LayoutAnimation.Properties.opacity,
                    },
                    update: {
                      type: LayoutAnimation.Types.easeInEaseOut,
                    },
                  });
                  setShowDescription(!showDescription);
                }}
                text={strings('UserProfile.infos')}
                style={styles.sendMessageButton}
                fontStyle={styles.sendMessageButtonFont}
              />
            </View>
          </View>

          {showDescription && (
            <View style={styles.descriptionContainer}>
              <Text>{user.description}</Text>
            </View>
          )}
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.container}>
        {user ? (
          <Feeds
            props={props}
            showHeader={false}
            user={user}
            feedType="posts"
            renderHeader={renderProfile}
          />
        ) : (
          <Spinner />
        )}
      </View>
      <BottomTab props={props} />
    </View>
  );
};
