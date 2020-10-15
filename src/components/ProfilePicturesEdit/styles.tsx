import colors from '../../config/colors';
import {StyleSheet, Dimensions} from 'react-native';

const pictureHeight = Dimensions.get('window').width * 0.3;

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  profilePictureContainer: {
    marginRight: '2.5%',
  },
  profilePicture: {
    width: pictureHeight,
    height: pictureHeight,
    borderRadius: pictureHeight,
    borderWidth: 1,
    borderColor: colors.darkGray,
  },
  bannerPicture: {
    width: Dimensions.get('window').width * 0.55,
    height: pictureHeight,
    marginLeft: '2.5%',
    borderWidth: 1,
    borderColor: colors.darkGray,
    borderRadius: 2,
  },
  text: {
    marginTop: 15,
    color: colors.lightBrown,
    textAlign: 'center',
  },
});
