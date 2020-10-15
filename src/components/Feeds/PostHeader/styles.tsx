import { StyleSheet, Dimensions } from 'react-native';

const { width, height  } = Dimensions.get('window');
import colors from '_config/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: 17,
    height: height / 10 ,
    alignItems: 'center'
  },
  imageStyle: {
    height: 50,
    resizeMode: 'cover',
    width: 50,
    borderRadius: 25,
  },
  viewBoxContainer: {
    flexDirection: 'row',
    paddingHorizontal: 4,
  },
  emptyView: {
    borderRightWidth: 1,
    marginVertical: 15,
    borderRightColor: colors.stainedWhite,
  }
});

export default styles;
