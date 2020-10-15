import { StyleSheet } from 'react-native';

import colors from '_config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    width: '100%',
  },
  listContent: {
    paddingBottom: 80,
  },
  item: {
    marginLeft: 15,
    marginRight: 30,
  },
  content: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    height: 1,
    backgroundColor: colors.lightGray,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  description: {
    width: '70%',
    marginLeft: 15,
  },
  textRegular: {
    fontSize: 18,
    fontFamily: 'SourceSansPro-Regular',
    color: colors.lightBrown,
  },
  textBold: {
    fontSize: 18,
    fontFamily: 'SourceSansPro-Semibold',
    color: colors.lightBrown,
  },
});

export default styles;
