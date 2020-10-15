import { StyleSheet,Dimensions } from 'react-native';
import color from '_config/colors';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container:{
    marginVertical: 10,
    width
  },
  suggestionsView: {
    flexGrow: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between'
  },
  suggestionsTextView: {
    paddingVertical: 5
  },
  mh8:{
    marginHorizontal: 8
  },
  suggestionsText: {
    paddingLeft: 8,
    color: color.lightBrown,
    fontSize: 12,
  }
});

export default styles;
