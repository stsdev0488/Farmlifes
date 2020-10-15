import { StyleSheet, Dimensions } from 'react-native';
import colors from '_config/colors';


const styles = StyleSheet.create({
  container: {
    // borderTopWidth: 8,
    borderTopColor: colors.stainedWhite,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    paddingVertical: 10,
  },
  mainContainer: {
    flexDirection: 'row',
    flex: 1
  },
  statusFeed: {
    height: 30,
    width: 30,
    resizeMode: 'cover'
  },
  image: {
    height: 50,
    borderRadius: 25,
    width: 50
  },
  redBoxContainer: {
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 10,
    height: 35,
    width: 35
  },
  nameContainer: {
    justifyContent: 'center', 
    left: 5
  },
  nameText: {
    fontSize: 14
  },
  daysAgoText: {
    fontSize: 11
  },
  redBoxText: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 10,
    color: 'white'
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  middleText: {
    color: '#707070'
  },
  box: {
    height: 35,
    width: 35,
    backgroundColor: '#BF2D35',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 10,
  },
  boxForum:{
    backgroundColor: '#FCA802',
  },
  questionBox: {
    backgroundColor: '#FFA500',
  },
  boxText: {
    fontSize: 8,
    fontWeight: "500",
    color: colors.white,
  }
});

export default styles;