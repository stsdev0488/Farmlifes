import {StyleSheet} from 'react-native';
import colors from '../../config/colors';

export default StyleSheet.create({
  userDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderColor: colors.lightGray,
  },
  userImageWrapper: {
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
  memberName: {
    marginLeft: 15,
    color: colors.lightBrown,
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 18,
  },
  actionsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  actionButtonIcon: {
    width: 20,
    height: 20,
  },
  actionButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    color: '#ff4e4e',
  },
  rejectButton: {
    color: '#ff4e4e',
    paddingBottom: 2,
  },
  acceptButton: {
    color: colors.lightGreen,
    paddingBottom: 2,
  },
});
