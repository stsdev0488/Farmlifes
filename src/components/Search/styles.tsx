import { StyleSheet, Dimensions } from 'react-native';

import colors from '_config/colors';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
  },
  scroll: {
    marginBottom: 30,
  },
  titleWrap: {
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
  },
  title: {
    color: colors.lightBrown,
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 16,
  },
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    width: '100%',
  },
  item: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderColor: colors.lightGray,
  },
  itemLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  text: {
    marginLeft: 15,
    color: colors.lightBrown,
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 18,
  },
  alert: {
    color: colors.lightGray,
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 24,
  },
  inquiryButtonContainer: {
    justifyContent: 'flex-end',
  },
});

export default styles;
