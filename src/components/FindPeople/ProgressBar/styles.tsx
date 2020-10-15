import { StyleSheet } from 'react-native';
import colors from '_config/colors';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 70,
  },
  progressBar: {
    flexDirection: 'row',
    height: 8,
    width: '97%',
    backgroundColor: colors.stainedWhite,
  },
  top: {
    flexDirection: 'row',
  },
  firstTopView: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingLeft: 5,
  },
  secondTopView: {
    flex: 1,
    flexDirection: 'column',
    paddingRight: 10,
    alignItems: 'flex-end',
  },
  bottomView: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    paddingLeft: 5,
  },
  textStyle: {
    fontSize: 12,
    color: colors.lightBrown,
    fontWeight: '400',
  },
  textStyleSecond: {
    fontSize: 10,
    fontWeight: '400',
    
    color: colors.lightBrown,
  },
  progressBarView: {
    backgroundColor: colors.lightGreen,
    // width: '50%'
  }
});

export default styles;
