import { StyleSheet, Dimensions } from 'react-native';
import colors from '_config/colors';

const { height, width } = Dimensions.get('window');


const styles = StyleSheet.create({
  container: {
    borderBottomColor: colors.stainedWhite,
    borderBottomWidth: 10,
  },
  hashTag: {
    color: colors.lightGreen,
    fontSize: 15,
    fontFamily: 'SourceSansPro-Regular',
  },
  header: {
    paddingTop: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerViewTwo: {
    paddingLeft: 15,
    flexDirection: 'row',
  },
  sharedDateText: {
    fontSize: 10,
    fontFamily: 'SourceSansPro-Regular',
    // bottom:-15,
  },
  sharedContentText: {
    fontFamily: 'SourceSansPro-Regular',
    color: colors.lightBrown,
    fontSize: 14,
    top: 7,
    left: 3,
  },
  userNameText: {
    fontSize: 16
  },
  farmView: {
    paddingTop: 2,
    paddingLeft: 15,
  },
  farmViewText: {
    fontFamily: 'SourceSansPro-Regular',
    color: colors.lightBrown,
    fontSize: 14,
  },
  daysAgoText: {
    fontFamily: 'SourceSansPro-Regular',
    color: colors.lightBrown,
    fontSize: 11,
  },
  sharedPostStyle: {
    // flex: 1,
    paddingTop: 5,
    paddingBottom: 15,
    marginLeft: 25,
    borderLeftColor: colors.lightGreen,
    borderLeftWidth: 3
  },
  imagePostView: {
    height: height / 2.5,
    width: width / 1.2,
    backgroundColor: colors.stainedWhite
  },
  imagePostViewShare: {
    width: width / 1.3,
  },
  imageView: {
    height: height / 2.5,
    width,
    backgroundColor: colors.stainedWhite,
  },
  shareImageView: {
    width: '100%',
  },
  userProfile: {
    height: 50,
    width: 50,
    borderRadius: 25,
    resizeMode: 'cover',
  },
  info: {
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  infoFirst: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: colors.stainedWhite,
  },
  infoFirstHide: {
    borderBottomWidth: 0,
  },
  infofirstText: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 15,
  },
  infoSecond: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activityViewContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    height: 50,
    alignItems: 'center',
  },
  likeIcon: {
    height: 18,
    width: 18,
    resizeMode: 'cover',
  },
  activityViewImage: {
    height: 20,
    width: 20,
    resizeMode: 'cover',
  },
  activityViewText: {
    paddingLeft: 5,
  },
  postContainer: {
    borderBottomColor: colors.stainedWhite,
    borderBottomWidth: 10,
  },
  postContentContainer: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  videoContentContainer: {
    height: height / 2.5,
    justifyContent: 'center',
  },
  backgroundVideo: {
    backgroundColor: colors.stainedWhite,
    height: height / 2.5,
    width,
    position: 'absolute',
    top: 2,
    left: 0,
    bottom: 0,
    right: 0,
  },
  userInfo: {
    flexDirection: 'row',
  },
  sharedPostPicsContainer: {
    marginRight: 10,
  },
  sharedPostPics: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  menuIcon: {
    height: 20,
    width: 20,
  },
  headerMenuContainer: {
    alignItems: 'flex-start',
    paddingRight: 10,
  },
  menuContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    top: 55,
    right: 20,
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    opacity: 1,
    zIndex: 999,
  },
  menuItem: {
    display: 'flex',
    flexDirection: 'row',
  },
  menuItemText: {
    color: colors.lightBrown,
    marginLeft: 5,
    backgroundColor: 'white',
  },
});

export default styles;
