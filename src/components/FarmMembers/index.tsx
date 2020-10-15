import React from 'react';
import styles from './styles';
import Spinner from '../../components/Spinner';
import {ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {strings} from '../../utils/i18n';

export default props => {
  const {
    farmId,
    members,
    isLoading,
    loadMore,
    isOwner,
    currentUserId,
    navigateToUserProfile,
    acceptingMemberships,
    rejectingMemberships,
    deletingMembers,
  } = props;

  const renderMember = ({item: member}) => {
    const renderActions = () => {
      if (currentUserId === member.id) {
        return null;
      }

      const membershipRequestId = member['membership_request_id'];
      const isAcceptingMembership =
        membershipRequestId && acceptingMemberships[membershipRequestId];
      const isRejectingMembership =
        membershipRequestId && rejectingMemberships[membershipRequestId];
      const isDeletingMember = deletingMembers[member.id];

      const acceptMembershipRequest =
        !isAcceptingMembership &&
        (() => props.acceptFarmMembershipRequest(farmId, membershipRequestId));

      const rejectMembershipRequest =
        !isRejectingMembership &&
        (() => props.rejectFarmMembershipRequest(farmId, membershipRequestId));

      const deleteMember =
        !isDeletingMember && (() => props.deleteFarmMember(farmId, member.id));

      return (
        <View style={styles.actionsContainer}>
          {membershipRequestId ? (
            <>
              <TouchableOpacity
                style={[styles.actionButton, {marginRight: 15}]}
                onPress={acceptMembershipRequest}
              >
                {!isAcceptingMembership ? (
                  <Image
                    source={require('../../assets/farmMembership/accept_icon.png')}
                    style={[styles.actionButtonIcon, {marginRight: 5}]}
                    resizeMode="contain"
                  />
                ) : (
                  <ActivityIndicator
                    color="black"
                    size={20}
                    style={{marginRight: 5}}
                  />
                )}
                <Text style={styles.acceptButton}>
                  {strings('FarmMembership.accept')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={rejectMembershipRequest}>
                {!isRejectingMembership ? (
                  <Image
                    source={require('../../assets/farmMembership/reject_icon.png')}
                    style={[styles.actionButtonIcon, {marginRight: 5}]}
                    resizeMode="contain"
                  />
                ) : (
                  <ActivityIndicator
                    color="black"
                    size={20}
                    style={{marginRight: 5}}
                  />
                )}
                <Text style={styles.deleteButton}>
                  {strings('FarmMembership.reject')}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={deleteMember}>
              {!isDeletingMember ? (
                <Image
                  source={require('../../assets/farmMembership/delete_icon.png')}
                  style={styles.actionButtonIcon}
                  resizeMode="contain"
                />
              ) : (
                <ActivityIndicator color="#ff4e4e" size={20} />
              )}
              <Text style={styles.deleteButton}>
                {strings('FarmMembership.delete')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      );
    };

    return (
      <View style={styles.memberContainer} key={`farm-member-${member.id}`}>
        <TouchableOpacity
          style={styles.userDetailsContainer}
          onPress={() => navigateToUserProfile(member)}>
          <View style={styles.userImageWrapper}>
            <Image
              source={
                member.avatar
                  ? {uri: member.avatar}
                  : require('../../assets/placeholders/profile_picture.png')
              }
              style={styles.image}
            />
          </View>
          <Text style={styles.memberName}>
            {member.first_name} {member.last_name}
          </Text>
        </TouchableOpacity>
        {isOwner && renderActions()}
      </View>
    );
  };

  return (
    <FlatList
      data={members}
      renderItem={renderMember}
      refreshing={isLoading}
      onRefresh={loadMore}
      onEndReached={loadMore}
      onEndReachedThreshold={0.3}
    />
  );
};
