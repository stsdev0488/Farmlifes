import { StyleSheet,Dimensions } from 'react-native';
import color from '_config/colors';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
    borderBottomColor: color.stainedWhite,
    borderBottomWidth: 1,
  },
  mainContainer: {
    height: 60,
    width: width / 1.5, 
    flexDirection: 'row',
    alignItems: 'center'
  },
  activityViewContainer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  activityViewImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },
  activityViewText:{
    left: 5,
    color: color.lightBrown,
    fontSize: 15,
    fontFamily: 'SourceSansPro-Regular',
  }
});

export default styles;
