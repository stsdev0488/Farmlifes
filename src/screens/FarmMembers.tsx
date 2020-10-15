import React from 'react';
import HeaderWithBack from '../components/HeaderWithBack';
import FarmMembers from '../containers/FarmMembers';
import {View} from 'react-native';
import {strings} from '../utils/i18n';

export default props => {
  const farm = props.navigation.getParam('farm');

  return (
    <View style={{flex: 1}}>
      <HeaderWithBack
        title={farm.name}
        subTitle={`${farm.members_count} ${strings(
          `Common.member${farm.members_count > 1 ? 's' : ''}`,
        )}`}
      />
      <FarmMembers farmId={farm.id} />
    </View>
  );
};
