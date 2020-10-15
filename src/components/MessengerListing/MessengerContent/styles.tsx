import { StyleSheet,Dimensions } from 'react-native';
import color from '_config/colors';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: height / 6,
    flexDirection: 'row',
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: color.blushWhite,
    alignItems: 'center',
  },
  imageStyle: {
    backgroundColor: color.stainedWhite,
    height: height / 13,
    width: height / 13,
    borderRadius: height / 26,
  },
  upText: {
    fontSize: 18,
    fontWeight: '500',
    color: color.lightBrown,
  },
  downText: {
    color: color.lightBrown,
    top: 1,
    fontFamily: 'SourceSansPro-Regular',
  },
  rightContainer: {
    flex: 4,
    paddingLeft: 10,
  },
  leftContainer: {
    flex: 1,
  },
  extra: {
    paddingLeft: 25,
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: color.white
  },
  roundedViewActive: {
    backgroundColor: color.thickGreen
  }
});

export default styles;
