import { StyleSheet,Dimensions } from 'react-native';
import colors from '_config/colors';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    paddingHorizontal: 0,
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    height: height / 12.7,
    alignItems: 'center',
    paddingHorizontal: 29,
    borderTopColor: colors.drawerBorderColor,
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  imageView: {
    flex: 1,
  },
  innerView: {
    flex: 3,
  },
  textStyle: {
    fontSize: 18,
  },
  smallText: {
    fontSize: 12,
  },
  logOutView: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    height: height / 12.7,
    justifyContent: 'center',
    borderTopColor: colors.drawerBorderColor,
    borderTopWidth: 1,
    paddingLeft: 29,
  },
  images: {
    height: 40,
    resizeMode: 'cover',
    width: 40,
    borderRadius: 20,
  },
  button: {
    backgroundColor: colors.lightGreen,
  },
  buttonFont: {
    color: colors.white,
  },
});

export default styles;
