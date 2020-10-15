import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';

import Text from '_components/Text';
import {strings} from '_utils/i18n';

import styles from './styles';

const ActivityView = ({fn, imageSource, text}) => (
  <TouchableOpacity onPress={() => fn()} style={styles.activityViewContainer}>
    <View>
      <Image
        style={[
          styles.activityViewImage,
          text === 'Comment' || 'comment'
            ? styles.activityViewImageComment
            : null,
        ]}
        source={imageSource}
      />
    </View>
    <View>
      <Text style={styles.activityViewText}>{text}</Text>
    </View>
  </TouchableOpacity>
);

export default ({
  hideInteractionButtons,
  interactionCount,
  state,
  post,
  handleSharePost,
  onToggle,
  typeOfPost,
  userInfo,
  liked,
  news,
  id,
}) => {
  const likesCount = interactionCount && interactionCount.likes;
  const commentsCount = interactionCount && interactionCount.comments;
  const sharesCount = interactionCount && interactionCount.shares;

  const displayBorder =
    likesCount === 0 && commentsCount === 0 && sharesCount === 0;

  return (
    <View style={styles.info}>
      <View
        style={[
          styles.infoFirst,
          hideInteractionButtons ? styles.infoFirstHide : null,
          !displayBorder ? styles.addBorder : null,
        ]}>
        {hideInteractionButtons ? (
          <View style={styles.activityViewContainer}>
            <Image
              style={styles.likeIcon}
              source={require('_assets/feeds/leaf.png')}
            />
            <Text style={[styles.infofirstText, styles.activityViewText]}>
              {interactionCount && interactionCount.likes}
            </Text>
          </View>
        ) : likesCount > 0 ? (
          <TouchableOpacity
            onPress={() => onToggle(post, 'likes')}
            style={styles.activityViewContainer}>
            <Image
              style={styles.likeIcon}
              source={require('_assets/feeds/leaf.png')}
            />
            {likesCount > 0 ? (
              <Text style={[styles.infofirstText, styles.activityViewText]}>
                {interactionCount && interactionCount.likes}
              </Text>
            ) : null}
          </TouchableOpacity>
        ) : null}
        <View style={styles.activityViewContainer}>
          {hideInteractionButtons ? (
            <Text style={styles.infofirstText}>
              {interactionCount && interactionCount.comments}{' '}
              {interactionCount &&
                (interactionCount.comments > 1
                  ? interactionCount.comments +
                    ' ' +
                    strings('Feeds.commentsText')
                  : interactionCount.comments +
                    ' ' +
                    strings('Feeds.oneCommentText'))}{' '}
            </Text>
          ) : commentsCount > 0 ? (
            <TouchableOpacity
              style={styles.activityViewContainer}
              onPress={() => onToggle(post, 'comments')}>
              <Text style={styles.infofirstText}>
                {commentsCount > 1
                  ? commentsCount + ' ' + strings('Feeds.commentsText')
                  : commentsCount + ' ' + strings('Feeds.oneCommentText')}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.activityViewContainer}>
          {hideInteractionButtons ? (
            <Text style={styles.infofirstText}>
              {interactionCount && interactionCount.shares} shares{' '}
            </Text>
          ) : sharesCount > 0 ? (
            <TouchableOpacity
              onPress={() => onToggle(post, 'shares')}
              style={styles.activityViewContainer}>
              <Text style={styles.infofirstText}>
                {sharesCount > 0
                  ? sharesCount + ' ' + strings('Feeds.sharesText')
                  : ' ' + strings('Feeds.shareText')}{' '}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <>
        {!hideInteractionButtons ? (
          <View style={styles.infoSecond}>
            <ActivityView
              text={strings('Feeds.likeText')}
              imageSource={
                !liked
                  ? require('_assets/feeds/white_like.png')
                  : require('_assets/feeds/leaf.png')
              }
              fn={() => state.handleLikeInteraction(id, typeOfPost, liked)}
            />
            <>
              {news ? null : (
                <ActivityView
                  text={strings('Feeds.commentText')}
                  imageSource={require('_assets/feeds/comment.png')}
                  fn={() => onToggle(post, 'comments')}
                />
              )}
            </>

            <>
              {(post && post.user_author && post.user_author.id) ===
                (userInfo && userInfo.id) ||
              (post && post.shared_content) ? null : (
                <ActivityView
                  text={strings('Feeds.shareText')}
                  imageSource={require('_assets/feeds/share.png')}
                  fn={() => handleSharePost(id)}
                />
              )}
            </>
          </View>
        ) : null}
      </>
    </View>
  );
};
