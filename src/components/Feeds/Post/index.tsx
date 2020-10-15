import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  FlatList,
  Dimensions,
  ImageSourcePropType,
  TouchableOpacity,
  StyleSheetProperties,
  LayoutAnimation,
  Alert,
  ActivityIndicator,
} from 'react-native';
import ParsedText from 'react-native-parsed-text';
import VideoPlayer from 'react-native-video-controls';
import Text from '_components/Text';
import Content from './Content';
import UserProfile from './UserProfile';
import navigationService from '_services/navigationService';
import InteractionView from './InteractionView';
import ImageFlatlist from './ImageFlatlist';
import styles from './styles';
import {deletePost} from '../../../actions/feeds';
import {toTimeAgo} from '../../../utils/common';
import {strings} from '../../../utils/i18n';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getUserAvatarImageSource} from '../../../utils/assets';
import {navigateToUserProfile} from '../../../utils/navigation';

const hashTagReg = RegExp(
  '(^|\\B)#(?![0-9_]+\\b)([a-zA-Z0-9_]{1,30})(\\b|\\r)',
);

const breakHashTagText = text => {
  const lines = text && text.trim().split('\n');

  if (lines) {
    return lines.map(line => {
      const parts = line.split(/(?!#) /);
      const items = [];
      let textParts = [];

      parts.forEach((part, index) => {
        const isHashtag = /#[\w]*[a-zA-Z0-9][\w]*/.test(part);
        const isLast = index === parts.length - 1;
        const isFirst = index === 0;

        if (!isHashtag) {
          textParts.push(part);
        }

        if (isHashtag || isLast) {
          if (isHashtag && !isFirst) {
            items.push({
              isHashtag: false,
              value: textParts.join(' '),
            });

            textParts = [];
          }

          items.push({
            isHashtag,
            value: isHashtag ? part : textParts.join(' '),
          });
        }
      });

      return items;
    });
  }
};

const TextWithHashTags = ({text}) => {
  return (
    <ParsedText
      style={styles.farmViewText}
      parse={[
        {
          pattern: /#[A-Za-z0-9]+/,
          style: styles.hashTag,
          onPress: hashtag => {
            navigationService.navigate('HashTag', {keyword: hashtag});
          },
        },
      ]}>
      {text}
    </ParsedText>
  );
};

const ActivityView = ({fn, imageSource, text}) => (
  <TouchableOpacity onPress={() => fn()} style={styles.activityViewContainer}>
    <View>
      <Image style={styles.activityViewImage} source={imageSource} />
    </View>
    <View>
      <Text style={styles.activityViewText}>{text}</Text>
    </View>
  </TouchableOpacity>
);

interface StateProps {
  showLikesModal: boolean;
  showCommentsModal: boolean;
  liked: boolean;
  hideInteractionButtons: boolean;

  showInteractionModal: boolean;
  onChangeShowInteractionModal: () => void;

  onChangeShowCommentsModal: () => void;
  onChangeShowLikesModal: () => void;

  commentOnAPost: () => void;
  handleLikeInteraction: () => void;
  handleSharePost: () => void;

  style: StyleSheetProperties;
}

interface InteractionProps {
  likes: number;
  comments: number;
  shares: number;
}

interface PostProps {
  id: number;
  userName?: string;
  daysAgo?: string;
  postText: string;
  post: any;
  postContent: string;
  typeOfPost: string;
  interactionCount: InteractionProps;
  postImage: ImageSourcePropType;
  profileImage: ImageSourcePropType;
  state: StateProps;
  farmName?: string;
  displayFarmName?: boolean;
}

const keyExtractor = (item, index) => index.toString();

// tslint:disable-next-line:no-unused-expression
const Post = ({
  props,
  userName,
  profilePicture,
  postImage,
  daysAgo,
  postText,
  farmName,
  displayFarmName,
  liked,
  post,
  typeOfPost,
  postContent,
  hideInteractionButtons,
  interactionCount,
  onToggle,
  id,
  style,
  state,
  userInfo,
  hashTag,
  singlePostImage,
  share,
  news,
  deletePost,
  deletingPosts,
  onPostDelete,
}: PostProps) => {
  let videoPlayer: Video;
  let blurSubscription;

  // Videos local state
  const [currentTime, onChangeCurrentTime] = useState(null);
  const [duration, onChangeDuration] = useState(null);
  const [paused, onChangePaused] = useState(true);
  const [muted, onChangeMuted] = useState(false);
  const [progress, onChangeProgress] = useState(null);
  const [buffering, onChangeBuffering] = useState(null);
  const [control, onChangeControl] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

  const isDeletingPost = deletingPosts && deletingPosts[id];

  const canDeletePost =
    userInfo &&
    ((post.user_author && post.user_author.id === userInfo.id) ||
      (post.author &&
        ((post.author.type === 'user' && post.author.id === userInfo.id) ||
          (post.author.type === 'farm' &&
            post.author.id === userInfo.farm_id))));

  const toggleMenu = () => {
    LayoutAnimation.configureNext(LayoutAnimation.easeInEaseOut());
    setMenuVisible(!menuVisible);
  };

  onProgress = data => {
    onChangeProgress(data.currentTime);
  };

  // onBuffer = ({ isBuffering }: { isBuffering: boolean }) => {}

  onLoad = data => {
    onChangeDuration(data.duration);
  };

  // video is playing
  onProgress = data => {
    onChangeCurrentTime(data.currentTime);
  };

  // video ends
  onEnd = () => {
    onChangePaused(true);
    // videoPlayer.seek(0);
  };

  onAudioBecomingNoisy = () => {
    // onChangePaused(true);
  };

  onAudioFocusChanged = (event: {hasAudioFocus: boolean}) => {
    onChangePaused(!event.hasAudioFocus);
    onChangeControl(false);
  };

  useEffect(() => {
    blurSubscription = props.navigation.addListener('willBlur', () => {
      if (paused) {
        onChangePaused(!paused);
      }
    });
  }, []);

  const goToUserProfile = (): void => {
    const author = post.author;

    if (author) {
      if (author.type === 'user') {
        navigationService.push('UserProfile', {
          userId: (post.user_author && post.user_author.id) || userInfo.id,
        });
      } else if (author.type === 'farm') {
        navigationService.push('FarmProfile', {
          farm: author,
          farmId: author.id,
        });
      }
    }
  };

  const onDeletePostConfirm = () => {
    deletePost(id, onPostDelete);
  };

  const onDeletePostPress = () => {
    Alert.alert(
      strings('Post.areYouSureYouWantToRemoveThisPost'),
      '',
      [
        {
          text: strings('Post.cancel'),
          style: 'cancel',
        },
        {
          text: strings('Post.deletePost'),
          onPress: onDeletePostConfirm,
        },
      ],
      {cancelable: true},
    );
  };

  const MenuToggler = () => {
    return canDeletePost ? (
      <View style={styles.headerMenuContainer}>
        <TouchableOpacity onPress={toggleMenu}>
          <Image
            source={require('../../../assets/feeds/post_menu.png')}
            style={styles.menuIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    ) : null;
  };

  const Menu = () => {
    return menuVisible ? (
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={onDeletePostPress}>
          {isDeletingPost ? (
            <ActivityIndicator color="black" style={styles.menuItem} />
          ) : (
            <Image
              source={require('../../../assets/feeds/delete_post.png')}
              style={styles.menuIcon}
              resizeMode="contain"
            />
          )}
          <Text style={styles.menuItemText}>{strings('Post.deletePost')}</Text>
        </TouchableOpacity>
      </View>
    ) : null;
  };

  if (
    (post && post.type === 'forum') ||
    (post && post.type === 'help') ||
    (post && post.type === 'question')
  ) {
    return (
      <View style={[!share ? styles.postContainer : null, style]}>
        <Menu />
        <UserProfile
          statusFeed={
            post && post.type === 'forum'
              ? require('_assets/Frage.png')
              : require('_assets/Hilfe.png')
          }
          postType={post && post.type}
          post={post}
          MenuToggler={() => (
            <View style={{paddingLeft: 5}}>
              <MenuToggler />
            </View>
          )}
        />
        <Content share={share} title={post.text} postType={post && post.type} />
        {share ? null : (
          <InteractionView
            interactionCount={{
              likes: post && post.likes_count,
              comments: post && post.comments_count,
              shares: post && post.shares_count,
            }}
            state={state}
            post={post}
            handleSharePost={handleSharePost}
            onToggle={onToggle}
            typeOfPost={typeOfPost}
            userInfo={userInfo}
            id={id}
            news={news}
            liked={post.liked}
            props={props}
          />
        )}
      </View>
    );
  }

  return (
    <View style={[!hideInteractionButtons ? styles.container : null, style]}>

      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <TouchableOpacity onPress={goToUserProfile}>
            <Image
              style={styles.userProfile}
              source={profilePicture}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <View style={styles.headerViewTwo}>
            <View>
              <TouchableOpacity onPress={goToUserProfile}>
                <Text style={styles.userNameText}>{userName}</Text>
              </TouchableOpacity>
              <View>
                <Text style={styles.daysAgoText}>{daysAgo}</Text>
              </View>
            </View>
            {displayFarmName && (
              <View style={styles.farmView}>
                <Text style={styles.farmViewText}>{farmName}</Text>
              </View>
            )}
          </View>
        </View>
        <MenuToggler />
      </View>

      <Menu />
      <>
        {post && post.attachment && post.attachment.type === 'video' ? (
          <View
            style={styles.videoContentContainer}
            // onPress={() => {onChangePaused(paused ? !paused : paused) }}
          >
            <VideoPlayer
              navigator={props.navigator}
              ref={ref => {
                videoPlayer = ref;
              }}
              source={{uri: post && post.attachment && post.attachment.url}}
              style={styles.backgroundVideo}
              volume={1}
              rate={1.0}
              paused={paused}
              // controls={true}
              controlTimeout={1500000}
              resizeMode="cover"
              onLoad={onLoad}
              onPause={() => onChangePaused(true)}
              onPlay={() => onChangePaused(paused ? !paused : paused)}
              toggleResizeModeOnFullscreen={false}
              disableBack={true}
              disableVolume={true}
              disableSeekbar={paused ? true : false}
              disableFullscreen={true}
              disableTimer={true}
              onProgress={onProgress}
              onEnd={onEnd}
              onAudioBecomingNoisy={onAudioBecomingNoisy}
              onAudioFocusChanged={onAudioFocusChanged}
              repeat={false}
            />
          </View>
        ) : (
          <>
            {singlePostImage && singlePostImage.url.length > 1 ? (
              <>
                <View style={styles.postContentContainer}>
                  <TextWithHashTags text={postContent} />
                </View>
                <View>
                  <Image
                    style={[
                      styles.imageView,
                      share ? styles.shareImageView : null,
                    ]}
                    source={{
                      uri:
                        singlePostImage.imageUrl === null
                          ? 'https://via.placeholder.com/50'
                          : singlePostImage.imageUrl,
                    }}
                  />
                </View>
              </>
            ) : (
              <>
                {postImage && postImage.length > 0 ? (
                  <View>
                    <ImageFlatlist data={postImage} />
                  </View>
                ) : (
                  <View style={styles.postContentContainer}>
                    <TextWithHashTags text={postContent} />
                  </View>
                )}
              </>
            )}
          </>
        )}
      </>
      <>
        {post && post.shared_content ? (
          <View style={styles.sharedPostStyle}>
            {/* <View>
                    <Image
                      style={{ height: 20, width: 20, borderRadius: 10 }}
                      source={{ uri: post && post.shared_content && post.shared_content.author && post.shared_content.author.avatar === null ? 'https://via.placeholder.com/50' : post && post.shared_content && post.shared_content.author && post.shared_content.author.avatar }}
                    />
                  </View> */}
            <View style={styles.postContentContainer}>
              <View style={styles.userInfo}>
                <TouchableOpacity
                  onPress={() =>
                    navigateToUserProfile(post.shared_content.author)
                  }
                  style={styles.sharedPostPicsContainer}>
                  <Image
                    style={styles.sharedPostPics}
                    source={getUserAvatarImageSource(
                      post && post.shared_content && post.shared_content.author,
                    )}
                  />
                </TouchableOpacity>
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      navigateToUserProfile(post.shared_content.author)
                    }>
                    <Text>
                      {post.shared_content && post.shared_content.author.name}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.sharedDateText}>
                    {toTimeAgo(
                      (post &&
                        post.shared_content &&
                        post &&
                        post.shared_content.created_at) * 1000,
                    )}
                  </Text>
                </View>
              </View>

              <Text style={styles.sharedContentText}>
                {post && post.shared_content && post.shared_content.text}
              </Text>
            </View>

            <View>
              {(post &&
                post.shared_content &&
                post.shared_content.article &&
                post.shared_content.article.attachments &&
                post.shared_content.article.attachments.length > 0) ||
              (post &&
                post.shared_content &&
                post.shared_content.attachment !== null) ? (
                <View style={styles.postContentContainer}>
                  <Image
                    style={[
                      styles.imagePostView,
                      hideInteractionButtons ? styles.imagePostViewShare : null,
                    ]}
                    source={{
                      uri:
                        (post &&
                          post.shared_content &&
                          post.shared_content.article &&
                          post.shared_content.article.attachments &&
                          post.shared_content.article.attachments[0] &&
                          post.shared_content.article.attachments[0]
                            .imageUrl) ||
                        (post &&
                          post.shared_content &&
                          post.shared_content.attachment.imageUrl),
                    }}
                  />
                </View>
              ) : null}
            </View>
          </View>
        ) : null}
      </>
      {share ? null : (
        <InteractionView
          hideInteractionButtons={hideInteractionButtons}
          interactionCount={interactionCount}
          state={state}
          post={post}
          news={news}
          handleSharePost={handleSharePost}
          onToggle={onToggle}
          typeOfPost={typeOfPost}
          userInfo={userInfo}
          id={id}
          liked={liked}
        />
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  deletingPosts: state.feeds.deletingPosts,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({deletePost}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Post);
