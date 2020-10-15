import { StyleSheet, Dimensions } from 'react-native';

import colors from '_config/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  mapButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGreen,
  },
  textWrap: {
    marginLeft: 8,
  },
  mapText: {
    color: colors.lightGreen,
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 16,
  },
  search: {
    flex: 1,
    marginRight: 15,
    paddingHorizontal: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'black',
  },
  searchText: {
    width: '100%',
    color: colors.lightBrown,
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 16,
    paddingVertical: 2,
  },
  abortText: {
    color: colors.lightGreen,
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 18,
  },
});

export default styles;
