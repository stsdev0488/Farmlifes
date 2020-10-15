import { StyleSheet,Dimensions } from 'react-native';
import colors from '_config/colors';

const {height, width} = Dimensions.get('window');

const profileImageWidth = 110;
const profileImageContainerLeft = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fl1: {
    flex: 1
  },
  fl2: {
    flex: 2
  },
  fg: {
    flexGrow: 1
  },
  headerImage:{
    height: 173,  //height /4.2
  },
  personImage: {
    height: profileImageWidth,
    width: profileImageWidth,
    borderRadius: 55,
    borderColor: colors.white,
    borderWidth: 2,
  },
  personImageContainer:{
    position: 'absolute',
    bottom: -70,
    left: profileImageContainerLeft,
  },
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent:'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.drawerBorderColor,
    marginVertical: 10,
    marginRight: 10,
    paddingBottom: 15,
  },
  descriptionContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 10,
    paddingTop: 30,
  },
  profileContainer: {
    flex: 1,
    marginLeft: profileImageWidth + profileImageContainerLeft + 5,
  },
  userName:{
    fontSize: 25,
    color: colors.lightBrown,
    textAlign: 'left',
  },
  farmName: {
    fontSize: 20,
    color: colors.lightGreen,
    textAlign: 'left',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
  numberOfPost: {
    fontSize: 14,
    color: colors.lightBrown,
    fontFamily: 'SourceSansPro-Regular',
    marginTop: 10,
  },
  followButton: {
    backgroundColor: colors.lightGreen,
    borderRadius: 3,
    height: 35,
    paddingHorizontal: 10,
    width: 100,
  },
  unfollowButton: {
    backgroundColor: colors.white,
    borderColor: colors.lightGreen,
    borderWidth: 1,
  },
  followButtonFont: {
    color: colors.white,
    fontSize: 15,
    fontFamily: 'SourceSansPro-Regular',
  },
  unfollowButtonFont: {
    color: colors.lightGreen,
  },
  followContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  followButtonCont: {
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noOfSubscribers: {
    fontSize: 18,
    color: colors.lighBrown,
  },
  noOfSubscribersText: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 15,
    color: colors.lighBrown,
  },
  sendInfoContainer: {
    flex: 1,
    // paddingTop: 15,
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },

  sendMessageButton: {
    backgroundColor: colors.white,
    width: 150,
    borderRadius: 3,
    height: 35,
    borderWidth: 1,
    borderColor: colors.lightGreen,
  },
  sendMessageButtonFont: {
    color: colors.lightGreen,
    fontSize: 15,
    fontFamily: 'SourceSansPro-Regular',
  },
  infosButton: {

  },
  subContainer: {
    // backgroundColor: 'red',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomColor: colors.stainedWhite,
    borderBottomWidth: 10,
  },
  flatlistContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  imageTextStyle: {
    fontSize: 12,
    fontFamily: 'SourceSansPro-Regular',
    bottom: 5,
  },
  imagesStyle: {
    height: height / 5.5,
    width: width / 2.4,
    borderRadius: 3,
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editIcon: {
    marginLeft: 5,
    opacity: 0.3,
  },
});

export default styles;
