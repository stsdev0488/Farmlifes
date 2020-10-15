import React, {useState, useEffect} from 'react';
import FarmMembers from '../components/FarmMembers';
import {getFarmMembers} from '../actions/farmProfile';
import {
  acceptFarmMembershipRequest,
  rejectFarmMembershipRequest,
  deleteFarmMember,
} from '../actions/view';
import {connect, useSelector} from 'react-redux';
import {View} from 'react-native';
import {bindActionCreators} from 'redux';
import {navigateToUserProfile} from '../utils/navigation';

const FarmMembersContainer = props => {
  const {farmId, members, isLoading, hasMore, getFarmMembers} = props;
  const [page, setPage] = useState(1);
  const user = useSelector(({ user }) => user.user.user);

  const isOwner = user['farm_id'] === farmId;

  useEffect(() => {
    getFarmMembers(farmId, page);
  }, [page]);

  const loadMore = () => {
    if (hasMore) {
      setPage(page + 1);
    }
  };

  return (
    <View style={{flex: 1}}>
      <FarmMembers
        currentUserId={user.id}
        farmId={farmId}
        members={members}
        isLoading={isLoading}
        loadMore={loadMore}
        isOwner={isOwner}
        navigateToUserProfile={navigateToUserProfile}
        acceptFarmMembershipRequest={props.acceptFarmMembershipRequest}
        rejectFarmMembershipRequest={props.rejectFarmMembershipRequest}
        deleteFarmMember={props.deleteFarmMember}
        acceptingMemberships={props.acceptingMemberships}
        rejectingMemberships={props.rejectingMemberships}
        deletingMembers={props.deletingMembers}
      />
    </View>
  );
};

const mapStateToProps = state => ({
  members: state.farmProfile.members,
  isLoading: state.farmProfile.isLoadingMembers,
  hasMore: state.farmProfile.hasMoreMembers,
  acceptingMemberships: state.farmProfile.acceptingMemberships,
  rejectingMemberships: state.farmProfile.rejectingMemberships,
  deletingMembers: state.farmProfile.deletingMembers,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getFarmMembers,
      acceptFarmMembershipRequest,
      rejectFarmMembershipRequest,
      deleteFarmMember,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(FarmMembersContainer);
