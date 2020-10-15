import { StyleSheet,Dimensions } from 'react-native';
import color from '_config/colors';

const { width,height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    // justifyContent:  '',
    justifyContent: 'space-between',
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 3,
    borderColor: color.stainedWhite,
    width: width /3,
  },
  hide: {
    width: null,
    height: null
  },
  imageStyle:{
    height: width /4.5,
    width: width / 4.5,
    borderRadius: width /9,
    resizeMode: 'cover',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: 12,
    textAlign: 'center',
    color: color.lightBrown
  },
  button: {
    paddingVertical: 3,
    backgroundColor: color.lightGreen,
    height:width /15,
  },
  buttonFont:{
    color: color.white,
    fontSize: 12,
    fontFamily: 'SourceSansPro-Regular',
  }
});

export default styles;
