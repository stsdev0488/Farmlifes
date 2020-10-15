import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 8,

  },
  containerDay: {
    alignItems: 'flex-start',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  avatarContainer: {
    height: 55,
    paddingTop: 20,
  },
  mb2:{
    marginBottom: 2,
  },
  mbBig: {
    marginBottom:40,
  },
  dayText: {
    color: 'black',
    paddingBottom: 2,
    textAlign: 'left'
  },
  avatar: {
    borderRadius: 20,
    height: 40,
    width: 40
  }
});

export const contStyles = {
  left: StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginLeft: 8,
      marginRight: 0,
      paddingRight: 20,
    },
  }),
  right: StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginLeft: 0,
      marginRight: 8,
      paddingLeft: 20,
    },
  }),
}

export default styles;
