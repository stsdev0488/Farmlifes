import React from 'react';
import Search from '_components/Search';

export default ({props}) => {
  const joinFarm = props.navigation.getParam('joinFarm');

  const goToUserProfile = user => {
    props.navigation.navigate('UserProfile', {user, userId: user.id});
  };

  const goToFarmProfile = farm => {
    props.navigation.navigate('FarmProfile', {farmId: farm.id});
  };

  return (
    <Search
      props={props}
      goToUserProfile={goToUserProfile}
      goToFarmProfile={goToFarmProfile}
      joinFarm={joinFarm}
    />
  );
};
