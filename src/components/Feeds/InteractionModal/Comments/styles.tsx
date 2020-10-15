import { StyleSheet } from 'react-native';
import color from '_config/colors'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  commentContainer: {
    flexDirection: 'row',
    // height: 70,
    marginHorizontal: 5,
  },
  viewImage: {
    justifyContent: 'center'
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 15,
    // resizeMode: 'contain'
  },
  textContainer: {
    marginLeft: 10,
    width: '70%',
    borderRadius: 15,
    backgroundColor: color.drawerBorderColor,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  text: {
    color: color.lightBrown,
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 14,
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
    bottom: 3,
  },
  pv10: {
    paddingVertical: 10
  }
});

export default styles;
