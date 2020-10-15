import React from 'react';
import FarmInquiryButton from '../components/FarmInquiryButton';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  requestFarmMembership,
  cancelFarmMembershipRequest,
} from '../actions/view';

const FarmInquiryButtonContainer = ({
  farm, isChangingMembershipRequest, requestFarmMembership, cancelFarmMembershipRequest
}) => {
  const farmId = farm.id;

  // Do not display the button if the user is already a member of this farm
  if (farm['is_member']) {
    return null;
  }

  const hasInquiry = farm['membership_requested'];

  const onPress = () => {
    if (!hasInquiry) {
      requestFarmMembership(farmId);
    } else {
      cancelFarmMembershipRequest(farmId, farm['membership_request_id']);
    }
  };

  return (
    <FarmInquiryButton
      hasInquiry={hasInquiry}
      isLoading={isChangingMembershipRequest[farmId]}
      onPress={onPress}
    />
  );
};

const mapStateToProps = state => ({
  isChangingMembershipRequest: state.view.isChangingMembershipRequest,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestFarmMembership,
      cancelFarmMembershipRequest,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FarmInquiryButtonContainer);
