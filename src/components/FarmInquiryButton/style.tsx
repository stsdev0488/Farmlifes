import {StyleSheet} from 'react-native';
import colors from '../../config/colors';

const height = 30;
const paddingHorizontal = 5;

export default StyleSheet.create({
  makeInquiry: {
    height,
    paddingHorizontal,
    minWidth: 100,
    backgroundColor: colors.lightGreen,
  },
  makeInquiryText: {
    color: colors.white,
  },
  makeInquirySpinner: {
    color: colors.white,
  },
  deleteInquiry: {
    height,
    paddingHorizontal,
    minWidth: 100,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGreen,
  },
  deleteInquiryText: {
    color: colors.lightGreen,
  },
  deleteInquirySpinner: {
    color: colors.lightGreen,
  },
});
