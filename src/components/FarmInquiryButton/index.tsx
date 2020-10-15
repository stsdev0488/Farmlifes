import React from 'react';
import Button from '../Button';
import style from './style';
import {strings} from '../../utils/i18n';

export default ({hasInquiry, isLoading, onPress}) => {
  return (
    <Button
      text={strings(`Farm.${!hasInquiry ? 'makeAn' : 'delete'}Inquiry`)}
      style={!hasInquiry ? style.makeInquiry : style.deleteInquiry}
      fontStyle={!hasInquiry ? style.makeInquiryText : style.deleteInquiryText}
      loading={isLoading}
      loadingSpinnerProps={
        !hasInquiry ? style.makeInquirySpinner : style.deleteInquirySpinner
      }
      fn={onPress}
    />
  );
};
