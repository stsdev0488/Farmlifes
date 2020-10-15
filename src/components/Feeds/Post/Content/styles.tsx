import { StyleSheet } from 'react-native';
import colors from '_config/colors';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'rgba(191,46,53,0.1)',
  },
  text: {
    left: 15,
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 18,
    color: colors.lightBrown
    // color: '#FFFFFF',
    // color: colors.lightBrown
  },
  lightBrownText: {
    color: colors.lightBrown,
  },
  whiteText: {
    color: colors.lightBrown,
    // color: '#FFFFFF',
  },

  questionBox: {
    backgroundColor: 'rgba(254,165,0,0.1)',
  },
  forumBox: {
    backgroundColor: 'rgba(191,46,53,0.1)',
  },
});

export default styles;
