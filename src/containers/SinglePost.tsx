import React, {useEffect} from 'react';
import SinglePost from '_components/SinglePost';
import {getSinglePost} from '../actions/notifications';
import {connect} from 'react-redux';


const SinglePostContainer = ({props, getPost}) => {
  const postId = props.navigation.getParam('postId');
  const commentId = props.navigation.getParam('commentId');

  useEffect(() => {
    if (postId) {
      getPost(postId);
    }
  }, [postId]);

  return <SinglePost props={props} commentId={commentId}/>;
};

const mapDispatchToProps = dispatch => ({
  getPost: postId => dispatch(getSinglePost({postId})),
});

export default connect(null, mapDispatchToProps)(SinglePostContainer);
