import React, { useState, useEffect } from 'react';

import { Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { removeDuplicatesFromArray } from '_services/helpers';

import {
  getFeeds,
  likePost,
  unLikePost,
  addCommentToPost,
  getPostLikes,
  getPostComments,
  getPostShares,
} from '../actions/feeds';

import {
  getUserSuggestion,
  follow,
  unfollow,
} from '../actions/user';

import Feeds from '_components/Feeds';


export default ({ props }) => {

  const keywordParams = props.navigation.state.params.keyword;

  const dispatch = useDispatch();
  let feeds = useSelector(({ feeds }) => feeds);

  let feedData = feeds.feeds.filter(c => c && c.text && c.text.includes(keywordParams));

  feedData = feedData.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)

  // Get user information
  const userInfo = useSelector(({ user }) => user);


  const [page, onChangePage] = useState(1);
  const [suggestPage, onChangeSuggestPage] = useState(1);

  const [activePost, onChangeActivePost] = useState(null);

  // Handling keyboard state
  const [shift, onShiftChanged] = useState(false);

  const [showInteractionModal, onChangeShowInteractionModal] = useState(false);



  // Content to display in modal
  const [display, onChangeDisplay] = useState('likes')

  const [comment, onChangeComment] = useState('');
  const [reloading, onChangeReloading] = useState(false);

  let keyboardDidShowSub;
  let keyboardDidHideSub;


  keyboardDidShow = () => {
    onShiftChanged(true)
  }

  keyboardHide = () => {
    onShiftChanged(false)
  }
  useEffect(() => {
    try {
      dispatch(getFeeds({ page: 1, type: 'hashtag', keyword: keywordParams, userId: userInfo.user.user.id }));
    }
    catch (err) {
      console.log(err.message)
    }

    keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', keyboardHide);
  }, []);

  handleReload = () => {
    onChangeReloading(true);
    dispatch(getFeeds({ page: 1, type: 'hashtag', keyword: keywordParams, reload: true, userId: userInfo.user.user.id }));
    onChangeReloading(false);
  };

  goToPost = () => {
    return props.navigation.navigate('CreatePost')
  }

  handleLoadMore = async () => {

    if (!feeds.interactionLoadingState.loadMore) {
      if (!(feeds.feedType === 'hashtag' && !!feeds.endLoadMore)) {
        if (page === 1 && feedData.length < 5) {
          onChangePage(page + 1)
          return dispatch(getFeeds({ page: page + 1, type: 'hashtag', keyword: keywordParams, userId: userInfo.user.user.id }));
        }
        onChangePage(page + 1)
        return dispatch(getFeeds({ page: page + 1, type: 'hashtag', keyword: keywordParams, userId: userInfo.user.user.id }));
      }
    }

  };

  // Set active post to be used in modal
  handleSetActivePost = async (post: any, display: string) => {


    onChangeDisplay(display)

    onChangeShowInteractionModal(!showInteractionModal)

    Promise.all([
      dispatch(getPostComments(post.id)),
      dispatch(getPostLikes(post.id)),
      dispatch(getPostShares(post.id))
    ]);
    onChangeActivePost(post);


  }

  // TOD0:
  handleLikeInteraction = async (id: number, type: string, likedPostStatus: boolean) => {

    //TODO:
    // let typeOfPost = type === null ? 'post' : type;
    // typeOfPost = type === 'question' ? 'post' : type;

    const reqData = { id, type: 'post' };

    if (!likedPostStatus) {
      return dispatch(likePost(reqData));
    }
    return dispatch(unLikePost(reqData));
  };

  handleCommentingOnAPost = async () => {

    const reqData = {
      id: activePost.id,
      type: 'post',
      text: comment
    };

    // TODO: Fetch this information from user record saved in asyncstorage
    const newCommentData = {
      id: Math.floor(Math.random() * 100) + Math.floor(Math.random() * 100),
      created_at: Date.now(),
      author: {
        id: userInfo.user.user.id,
        type: "user",
        name: userInfo.user.user.name,
        avatar: userInfo.user.user.avatar,
      },
      text: comment
    }

    dispatch(addCommentToPost(reqData, newCommentData));

    Keyboard.dismiss();
    onChangeComment('')

  };


  handleSharePost = (id) => {
    return props.navigation.navigate('SharePost', { id });
  }


  // const loading = feeds && feeds.length > 1 ? false : feeds.loading;


  return (
    <Feeds
      props={props}

      userInfo={userInfo.user.user}
      goToPost={goToPost}
      showInteractionModal={showInteractionModal}
      onChangeShowInteractionModal={onChangeShowInteractionModal}
      onChangeComment={onChangeComment}

      reloading={reloading}
      handleReload={handleReload}

      display={display}
      onChangeDisplay={onChangeDisplay}

      comment={comment}

      loading={feeds.loading}
      loadMore={feeds.interactionLoadingState.loadMore}
      feeds={removeDuplicatesFromArray(feedData)}
      interactionLoadingState={feeds.interactionLoadingState}
      handleLoadMore={handleLoadMore}

      handleSharePost={handleSharePost}
      handleCommentingOnAPost={handleCommentingOnAPost}
      handleLikeInteraction={handleLikeInteraction}

      handleSetActivePost={handleSetActivePost}


      activePost={activePost}

      hashTagHeader={keywordParams}
      hashTag={true}
      headerBack={true}
      headerName={keywordParams}

      shift={shift}
    />
  );
};
