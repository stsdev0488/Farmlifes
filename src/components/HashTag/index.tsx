// import React, from 'react';
// import { View, FlatList, RefreshControl } from 'react-native';
// import Text from '_components/Text';

// import Spinner from '_components/Spinner';
// import UserProfile from '../Help/UserProfile';
// import Content from '../Help/Content';

// import Header from '_components/HeaderWithBack';

// import InteractionModal from '_components/Feeds/InteractionModal';



// import InteractionView from '_components/Feeds/Post/InteractionView';

// import styles from './styles';
// import extStyles from '_utils/styles';

// const keyExtractor = (item, index) => index.toString();




// // tslint:disable-next-line:no-unused-expression
// export default ({

//   props,
//   goToPost,

//   handleLoadMore,
//   showInteractionModal,
//   onChangeShowInteractionModal,
//   onChangeComment,

//   feeds,
//   comment,
//   loading,
//   loadMore,

//   reloading,
//   handleReload,

//   handleSetActivePost,

//   activePost,

//   handleLikeInteraction,
//   handleCommentingOnAPost,


//   display,
//   onChangeDisplay,

//   interactionLoadingState,

//   userInfo,

// }) => {


//   const state = {

//     showInteractionModal,
//     onChangeShowInteractionModal,

//     handleCommentingOnAPost,
//     handleLikeInteraction,

//     handleSetActivePost,

//   };

//   const Post = ({
//     // hideInteractionButtons,
//     interactionCount,
//     state,
//     post,
//     handleSharePost,
//     onToggle,
//     typeOfPost,
//     userInfo,
//     id,
//     liked,
//     props
//   }) => (
//       <View style={styles.postContainer}>
//         <UserProfile
//           statusFeed={require('_assets/Frage.png')}
//           post={post}
//         />
//         <Content
//           title={post.text}
//         />

//         <InteractionView
//           interactionCount={{
//             likes: post && post.likes_count,
//             comments: post && post.comments_count,
//             shares: post && post.shares_count,
//           }}
//           state={state}
//           post={post}
//           handleSharePost={handleSharePost}
//           onToggle={onToggle}
//           typeOfPost={typeOfPost}
//           userInfo={userInfo}
//           id={id}
//           liked={liked}
//           props={props}
//         />
//       </View>
//     );

//   const renderItem = ({ item }) => {

//     return (
//       <Post
//         props={props}
//         state={state}
//         post={item}
//         handleSharePost={handleSharePost}
//         // onToggle={onToggle}
//         typeOfPost={item && item.type}
//         userInfo={userInfo}
//         id={item.id}
//         liked={item.liked}
//         props={props}

//         farmName={item.farm && item.farm.name}
//         state={state}
//         post={item}
//         userInfo={userInfo}
//         onToggle={handleSetActivePost}

//       />
//     )
//   };
//   const Footer = () => (
//     loadMore ? <Spinner style={styles.footerSpinner} /> : null
//   )

//   if (loading) {
//     return (
//       <View style={extStyles.center}>
//         <Spinner />
//       </View>
//     )
//   }

//   return (
//     <View style={styles.container}>

//       <Header
//         title="#Forum"
//         props={props}
//         fn={() => props.navigation.navigate('Feeds')}
//       />
//       <>
//         <FlatList
//           style={styles.container}
//           refreshControl={
//             <RefreshControl
//               refreshing={reloading}
//               onRefresh={handleReload}
//             />}
//           contentContainerStyle={styles.innerContainer}

//           data={feeds}
//           extraData={Object.assign(feeds, state)}
//           keyExtractor={keyExtractor}
//           initialNumToRender={10}
//           showsHorizontalScrollIndicator={false}
//           onEndReachedThreshold={0.1}
//           ListFooterComponent={Footer}
//           onEndReached={handleLoadMore}
//           removeClippedSubviews={true}
//           maxToRenderPerBatch={15}
//           renderItem={renderItem}
//         />
//         <>{
//           !showInteractionModal ? null : (
//             <InteractionModal
//               style={!showInteractionModal ? styles.flex0 : styles.flex1}
//               userInfo={userInfo}
//               activePost={activePost}
//               toggle={showInteractionModal}
//               comment={comment}
//               onChangeComment={onChangeComment}
//               display={display}
//               onChangeDisplay={onChangeDisplay}
//               handleCommentingOnAPost={handleCommentingOnAPost}
//               onToggle={() => state.onChangeShowInteractionModal(!showInteractionModal)}
//               onShareCount={() => props.navigation.navigate('SharePost', { id: activePost.id })}
//               interactionLoadingState={interactionLoadingState}
//               interactionCountState={{
//                 likeCount: activePost && activePost.likes_count || 0,
//                 commentCount: activePost && activePost.comments_count || 0,
//                 shareCount: activePost && activePost.shares_count || 0
//               }}
//             />
//           )
//         }
//         </>

//       </>

//     </View>
//   );

// };
