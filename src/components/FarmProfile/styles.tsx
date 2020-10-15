import {StyleSheet} from 'react-native';
import colors from '../../config/colors';

const profileImageWidth = 110;
const profileImageContainerLeft = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    height: 173,
  },
  personImage: {
    height: profileImageWidth,
    width: profileImageWidth,
    borderRadius: 55,
    borderColor: colors.white,
    borderWidth: 2,
  },
  personImageContainer: {
    position: 'absolute',
    bottom: -70,
    left: profileImageContainerLeft,
  },
  farmName: {
    fontSize: 22,
    color: colors.lightBrown,
    textAlign: 'left',
  },
  membersCount: {
    fontSize: 15,
    color: colors.lightBrown,
    textAlign: 'left',
    marginTop: 5,
  },
  subscribersCount: {
    fontSize: 13,
    color: colors.lightBrown,
    fontFamily: 'SourceSansPro-Regular',
    marginRight: 20,
  },
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    marginRight: 10,
    paddingBottom: 15,
    paddingLeft: profileImageWidth + profileImageContainerLeft + 5,
  },
  profileContainer: {
    flex: 2,
    flexDirection: 'row',
  },
  leftProfileHeaderContainer: {
    flex: 16,
  },
  followInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  fl1: {
    flex: 1,
  },
  button: {
    backgroundColor: colors.white,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.lightGreen,
  },
  buttonFont: {
    color: colors.lightGreen,
    fontSize: 13,
  },
  actionButton: {
    width: '100%',
  },
  actionButtonFont: {
    fontSize: 15,
  },
  mapButtonFont: {
    marginLeft: 20,
  },
  subscribeButton: {
    padding: 2,
    height: 25,
    width: 90,
    backgroundColor: colors.lightGreen,
  },
  subscribedButton: {
    padding: 5,
    height: 25,
    width: 90,
  },
  subscribeText: {
    color: colors.white,
    fontSize: 13,
  },
  subscribedText: {
    color: colors.lightGreen,
    fontSize: 13,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  actionButtonContainer: {
    flex: 1,
  },
  sendMessageButtonContainer: {
    marginRight: 10,
  },
  mapButtonContainer: {
    marginLeft: 10,
  },
  descriptionContainer: {
    marginTop: 20,
    marginHorizontal: 15,
    padding: 5,
    backgroundColor: colors.blushWhite,
  },
  separator: {
    marginTop: 10,
    borderBottomColor: colors.stainedWhite,
    borderBottomWidth: 10,
  },
  readMoreContainer: {
    marginTop: 5,
    marginHorizontal: '6%',
  },
  readMore: {
    fontSize: 12,
    color: colors.darkGray,
    textAlign: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  editIcon: {
    marginLeft: 5,
    opacity: 0.3,
  },
});

export default styles;
