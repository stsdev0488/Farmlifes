import { StyleSheet, Dimensions } from 'react-native';

const { width,height } = Dimensions.get('window');

import colors from '_config/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: 17,
    height: height / 10,
    alignItems: 'center'
  },
  imageStyle: {
    height: 20,
    resizeMode: 'cover',
    width: 20,
  },
  viewInTextContainer: {
     alignItems: 'center',
     justifyContent: 'center'
  },
  imageContainer: {
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  viewBoxContainer: {
    flexDirection: 'row',
    paddingHorizontal: 7,
  },
  boxContainer: {

    height: height / 10,
    width: width / 2.5,
  
    justifyContent: 'center',
    alignItems: 'center'
  },
  noBorder: {
    borderRightWidth: 0,
  },
  textInBox: {
    fontSize: 12,
    paddingBottom: 3,
    fontWeight: '600',
    fontFamily: 'SourceSansPro-regular',
    color: colors.lightBrown
  },
});

export default styles;
