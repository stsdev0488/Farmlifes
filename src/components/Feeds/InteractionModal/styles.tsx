import { StyleSheet } from 'react-native';
import color from '_config/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.blurryWhite,
    flex: 1,
  },
  marginNull: {
    margin: 0,
    flex: 1,
    flexDirection: 'column',
  },
  closeContainer: {

    top: '-45%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
  closeContainerButton: {
    borderRadius: 6,
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 6,
    backgroundColor: color.white
  },
  container2: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: color.white,
    height: '90%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: color.black,
    elevation: 6,
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 10,
      width: 10,
    },
  },
  scrollViewContainer: {
    paddingLeft: 20,
    paddingVertical: 20,
    flex: 1
  },
  scrollViewContentContainer: {
    paddingBottom: 20,
    flexGrow: 1
  },
});

export default styles;
