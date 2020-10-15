import { StyleSheet } from 'react-native';
import colors from '_config/colors';

const styles  = StyleSheet.create({
  info: {
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  infoFirst: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    // borderBottomWidth: 1,
    // borderBottomColor: colors.stainedWhite
  },
  addBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.stainedWhite
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
    justifyContent: 'space-between'
  },
  activityViewContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    height: 40,
    alignItems: 'center',
  },

  likeIcon: {
    height: 18,
    width: 18,
    resizeMode: 'cover'
  },
  activityViewImage: {
    height: 15,
    width: 13,
    // tintColor: colors.lightBrown,
    resizeMode: 'cover'
  },
   activityViewImageComment:{
     height: 18,
     width: 20,
     resizeMode: 'contain'
  },
  activityViewText: {
    paddingLeft: 5,
    fontFamily: 'SourceSansPro-Regular',
  },
  postContentContainer: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    justifyContent: 'center'
  }
});

export default styles;
