import { StyleSheet, Dimensions, ColorPropType } from 'react-native';
import color from '_config/colors';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingBottom: 15,
  },
  newsView: {
    marginVertical: 10,
    paddingLeft: 10,
  },
  flexGrow: {
    flexGrow: 1,
    paddingBottom: 70,
  },
  newsText: {
    color: color.lightBrown,
    fontSize: 12,
    fontFamily: 'SourceSansPro-Regular',
  },
  sharerContainer: {
    flexDirection: 'row',
    height: height / 10,
    borderTopColor: color.blushWhite,
    borderBottomColor: color.blushWhite,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  imageView: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: color.blushWhite,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
    resizeMode: 'cover',
  },
  roundedView: {
    position: 'absolute',
    right: 14,
    bottom: 13,
    borderColor: color.blushWhite,
    borderWidth: 1,
    zIndex: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: color.white,
  },
  roundedViewActive: {
    backgroundColor: color.thickGreen
  },
  noActiveContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  spinner: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 10,
  },
});
export default styles;
