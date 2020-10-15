import React, {useState} from 'react';
import {View, Image, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import Text from '_components/Text';
import Header from './Header';
import Post from '_components/Feeds/Post';
import SpinnerOverlay from '_components/SpinnerOverlay';
import color from '_config/colors';
import styles from './styles';
import {strings} from '_utils/i18n';
import {toTimeAgo} from '../../utils/common';
import {getUserAvatarImageSource} from '../../utils/assets';

interface StateProps {
  postText: string;
  onChangePostText: () => void;

  typeOfPost: string;
  onChangeTypeOfPost: () => void;

  onShare: () => void;
}

interface CreatePostProps {
  props: any;
  state: StateProps
}


// tslint:disable-next-line:no-unused-expression
export default ({ props, feed, state, userInfo }: CreatePostProps) => {

  const RoundedView = ({ style }) => <View style={[styles.roundedView, style]} />

  return (
    <View style={styles.container}>
      <Header
        onShare={state.onShare}
        postText={state.postText}
        props={props}
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.flexGrow1}>
        <View style={styles.publishContainer}>
          <Text style={styles.publishText}>{strings('SharePost.publishAsText')} </Text>
        </View>
        <View style={styles.sharerContainer}>
          <TouchableOpacity
            disabled={userInfo.user.farm_id === null ? true : false}
            onPress={() => state.onChangePublisher('human')}
            style={styles.imageView}>
            <Image
              style={styles.image}
              source={getUserAvatarImageSource(userInfo.user)}/>
            <RoundedView style={state.publisher === 'human' ? styles.roundedViewActive : null} />
          </TouchableOpacity>

          {/* {
            userInfo.user.farm_id !== null ?
              (
                <TouchableOpacity
                  onPress={() => state.onChangePublisher('farm')}
                  style={styles.imageView}>
                  <Image style={styles.image} source={require('../../assets/CreateAPost/farm.png')} />
                  <RoundedView style={state.publisher === 'farm' ? styles.roundedViewActive : null} />
                </TouchableOpacity>
              ) : null
          } */}

        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInputStyle}
            multiline={true}
            placeholderTextColor={color.lightBrown}
            placeholder={strings('SharePost.normalPostText')}
            onChangeText={text => state.onChangePostText(text)}
            autoCorrect={false}
            numberOfLines={5}
            underlineColorAndroid={color.whiteRGBA}
          />
        </View>
        <View style={[styles.postContainer, state.shift ? styles.hidePostContainer : null]}>
          {feed && (
            <Post
              style={styles.innerPostContainer}
              props={props}
              userName={feed.author.name}
              id={feed.id}
              share={true}
              post={feed}
              profilePicture={getUserAvatarImageSource(feed.author)}
              singlePostImage={feed  && feed.attachment}
              // postImage={feed && feed.article && feed.article.attachments}
              daysAgo={toTimeAgo(((feed && feed.created_at) * 1000))}
              postContent={feed && feed.text}
              interactionCount={{
                likes: feed && feed.likes_count,
                comments: feed && feed.comments_count,
                shares: feed && feed.shares_count,
              }}
              farmName={feed && feed.farm && feed.farm.name}
              state={state}
              hideInteractionButtons={true}

              onToggle={() => { }}
            />
          )
          }
        </View>
        <View style={styles.inputContainer} />

        <>
          {state.loading ? <SpinnerOverlay /> : null}
        </>
      </ScrollView>
    </View>
  );

};
