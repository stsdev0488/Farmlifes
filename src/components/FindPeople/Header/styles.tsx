import { StyleSheet } from 'react-native';


import colors from '_config/colors';
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    flex: 1,
  },
  titleText: {
    color: colors.black,
    fontSize: 17,
    textAlign:'center',
    justifyContent: 'center',
    alignItems: 'center'
  },

  findPeopleContainer: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  },

  forwardText:{
    color: colors.lightGreen,
    fontSize: 15,
    textAlign: 'right',
    paddingRight: 15,
  },
  forwardButton: {
    width: '100%',
  }

});

export default styles;
