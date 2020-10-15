import { StyleSheet } from 'react-native'

import color from '_config/colors'

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    flex: 1
  },
  flexStart: {
    alignItems: 'flex-start',
  },
  timeStyle:{
    justifyContent: 'center',
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerContent: {
    minHeight: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.lightGreen,
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  senderContainerContent: {
    backgroundColor: color.drawerBorderColor,
  },
  containerMsgHeader: {
    alignItems: 'baseline',
    flexDirection: 'row',
    marginTop: -2 
  },
  usernameText: {
    color: 'black',
    marginRight: 8
  },
  containerTime: {
    // marginBottom: 0,
    // marginLeft: 0,
    // marginRight: 0
  },
  timeText: {
    color: color.lightBrown,
    textAlign: 'center',
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 12,
  },
  messageText: {
    color: color.white,
    marginLeft: 0,
    marginRight: 0,
    fontSize: 16,
    fontFamily: 'SourceSansPro-Regular',
  },
  senderMessageText: {
    color: color.lightBrown,
    marginLeft: 0,
    marginRight: 0,
    fontSize: 16,
    fontFamily: 'SourceSansPro-Regular',
  },
  dayText: {
    color: color.lightBrown,
    fontSize: 12,
    fontFamily: 'SourceSansPro-Regular',
  }
});

export default styles;
