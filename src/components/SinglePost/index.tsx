import React, {useState, useEffect} from 'react';
import {View, Keyboard, ScrollView} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {toTimeAgo} from '../../utils/common';

import {
  likeSinglePost,
  unlikeSinglePost,
  addCommentToSinglePost,
  getSinglePostLikes,
  getSinglePostComments,
  getSinglePostShares,
} from '_actions/notifications';
import Header from '_components/Header';
import BottomTab from '_components/BottomTab';
import Post from '_components/Feeds/Post';
import InteractionModal from '_components/Feeds/InteractionModal';
import styles from './styles';
import navigationService from '../../services/navigationService';
import {getUserAvatarImageSource} from "../../utils/assets";

export interface SinglePostProps {
  singlePost: any;
  interactionLoadingState: any;
  userInfo: any;
  likeSinglePost: () => void;
  unlikeSinglePost: () => void;
  addCommentToSinglePost: () => void;
  getSinglePostLikes: () => void;
  getSinglePostComments: () => void;
  getSinglePostShares: () => void;
  props: any;
}

const SinglePost: React.FC<SinglePostProps> = ({
  singlePost,
  interactionLoadingState,
  userInfo,
  likeSinglePost,
  unlikeSinglePost,
  addCommentToSinglePost,
  getSinglePostLikes,
  getSinglePostComments,
  getSinglePostShares,
  props,
  commentId
}) => {
  const showComment = !!commentId;

  const [showInteractionModal, onChangeShowInteractionModal] = useState(showComment);

  const [display, onChangeDisplay] = useState(showComment ? 'comments' : 'likes');
  const [comment, onChangeComment] = useState('');

  useEffect(() => {
    if (showComment) {
      getSinglePostComments(singlePost.id);
    }
  }, [singlePost.id]);

  const handleCommentingOnAPost = async () => {
    const reqData = {
      id: singlePost.id,
      type: 'post',
      text: comment,
    };

    addCommentToSinglePost(reqData);

    Keyboard.dismiss();
    onChangeComment('');
  };

  const handleLikeInteraction = async (id: number, type: string, likedPostStatus: boolean) => {
    const reqData = { id, type: 'post' };

    if (!likedPostStatus) {
      return likeSinglePost(reqData);
    }

    return unlikeSinglePost(reqData);
  };

  const handleSetActivePost = async (post: any, display: string) => {
    onChangeDisplay(display);
    onChangeShowInteractionModal(!showInteractionModal);

    Promise.all([
      getSinglePostComments(post.id),
      getSinglePostLikes(post.id),
      getSinglePostShares(post.id),
    ]);
  };

  const handleSharePost = (id) => {
    return props.navigation.navigate('SharePost', { id });
  };

  const state = {
    showInteractionModal,
    onChangeShowInteractionModal,
    handleCommentingOnAPost,
    handleLikeInteraction,
    handleSetActivePost,
  };

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView
        contentContainerStyle={styles.scroll}
      >
        <Post
          props={props}
          id={singlePost && singlePost.id}
          userName={singlePost && singlePost.author && singlePost.author.name}
          profilePicture={getUserAvatarImageSource(singlePost && singlePost.author)}
          singlePostImage={singlePost && singlePost.attachment}
          postImage={singlePost && singlePost.article && singlePost.article.attachments}
          postContent={singlePost && singlePost.text}
          daysAgo={toTimeAgo(((singlePost && singlePost.created_at) * 1000))}
          liked={singlePost && singlePost.liked}
          typeOfPost={singlePost && singlePost.type}
          handleSharePost={handleSharePost}
          interactionCount={{
            likes: singlePost && singlePost.likes_count,
            comments: singlePost && singlePost.comments_count,
            shares: singlePost && singlePost.shares_count,
          }}
          state={state}
          post={singlePost}
          userInfo={userInfo.user.user}
          onToggle={handleSetActivePost}
          style={styles.post}
          onPostDelete={() => navigationService.goBack()}
        />
      </ScrollView>

      {
        showInteractionModal &&
        <InteractionModal
          style={!showInteractionModal ? styles.flex0 : styles.flex1}
          userInfo={userInfo.user.user}
          activePost={singlePost}
          toggle={showInteractionModal}
          comment={comment}
          onChangeComment={onChangeComment}
          display={display}
          onChangeDisplay={onChangeDisplay}
          handleCommentingOnAPost={handleCommentingOnAPost}
          onToggle={() => state.onChangeShowInteractionModal(!showInteractionModal)}
          onShareCount={() => props.navigation.navigate('SharePost', { id: singlePost.id })}
          interactionLoadingState={interactionLoadingState}
          interactionCountState={{
            likeCount: singlePost && singlePost.likes_count || 0,
            commentCount: singlePost && singlePost.comments_count || 0,
            shareCount: singlePost && singlePost.shares_count || 0
          }}
        />
      }

      <View style={styles.tabBar}>
        <BottomTab props={props} />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    singlePost: state.notifications.singlePost,
    interactionLoadingState: state.notifications.interactionLoadingState,
    userInfo: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    likeSinglePost,
    unlikeSinglePost,
    addCommentToSinglePost,
    getSinglePostLikes,
    getSinglePostComments,
    getSinglePostShares,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SinglePost);
