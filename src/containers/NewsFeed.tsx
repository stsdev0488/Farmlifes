import React, {useState, useEffect} from 'react';
import Feeds from '_components/Feeds';
import {Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getFeeds,
  likePost,
  unLikePost,
  addCommentToPost,
  getPostLikes,
  getPostComments,
  getPostShares,
} from '../actions/feeds';
import {strings} from '../utils/i18n';

export default ({ props }) => {
  const dispatch = useDispatch();
  let feeds = useSelector(({feeds}) => feeds);
  let feedData = feeds.feeds.filter(c => c.type === 'news');
  // let feedData = feeds.feeds.filter(c => c.type === 'forum')
  // Get user information
  const userInfo = useSelector(({ user }) => user);


  const [page, onChangePage] = useState(1);
  const [suggestPage, onChangeSuggestPage] = useState(1);
  const [activePost, onChangeActivePost] = useState(null);
  const [showInteractionModal, onChangeShowInteractionModal] = useState(false);
  // Content to display in modal
  const [display, onChangeDisplay] = useState('likes')
  const [comment, onChangeComment] = useState('');
  const [reloading, onChangeReloading] = useState(false);
  // Handling keyboard state
  const [shift, onShiftChanged] = useState(false);

  let keyboardDidShowSub;
  let keyboardDidHideSub;

  keyboardDidShow = () => {
    onShiftChanged(true);
  };

  keyboardHide = () => {
    onShiftChanged(false);
  };

  useEffect(() => {
    if (feedData.length < 1) {
      try {
        dispatch(getFeeds({ page: 1, type: 'news', userId: userInfo.user.user.id }));
      } catch (err) {
        console.log(err.message);
      }
    }
    keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', keyboardHide);
  }, []);

  handleReload = () => {
    onChangeReloading(true);
    dispatch(getFeeds({ page: 1, type: 'news', reload: true, userId: userInfo.user.user.id }));
    onChangeReloading(false);
  };

  handleLoadMore = async () => {
    if (!feeds.interactionLoadingState.loadMore) {
      if (!(feeds.feedType === 'news' && !!feeds.endLoadMore)) {
        if (page === 1 && feedData.length < 5) {
          onChangePage(page + 1)
          return dispatch(getFeeds({ page: page + 1, type: 'news', userId: userInfo.user.user.id }));
        }
        onChangePage(page + 1)
        return dispatch(getFeeds({ page: page + 1, type: 'news', userId: userInfo.user.user.id }));
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
  };

  // TOD0:
  handleLikeInteraction = async (id: number, type: string, likedPostStatus: boolean) => {
    const reqData = {id, type: 'post'};

    if (!likedPostStatus) {
      return dispatch(likePost(reqData));
    }
    return dispatch(unLikePost(reqData));
  };

  handleCommentingOnAPost = async () => {
    const reqData = {
      id: activePost.id,
      type: 'post',
      text: comment,
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
      text: comment,
    };

    dispatch(addCommentToPost(reqData, newCommentData));

    Keyboard.dismiss();
    onChangeComment('');
  };

  handleSharePost = (id) => {
    return props.navigation.navigate('SharePost', { id });
  };

  return (
    <Feeds
      props={props}
      userInfo={userInfo.user.user}
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
      feeds={feedData}
      interactionLoadingState={feeds.interactionLoadingState}
      handleLoadMore={handleLoadMore}
      handleSharePost={handleSharePost}
      handleCommentingOnAPost={handleCommentingOnAPost}
      handleLikeInteraction={handleLikeInteraction}
      handleSetActivePost={handleSetActivePost}
      activePost={activePost}
      headerBack={true}
      news={true}
      headerName={strings('Drawer.news')}
      shift={shift}
    />
  );
};
