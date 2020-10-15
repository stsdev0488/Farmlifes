import React, {useState} from 'react';
import SearchHeader from './SearchHeader';
import styles from './styles';
import FarmInquiryButton from '../../containers/FarmInquiryButton';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView, TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

import {strings} from '../../utils/i18n';

export interface SearchProps {
  props: object;
  isLoadingForUsers: boolean;
  isLoadingForFarms: boolean;
  users: object[];
  farms: object[];
  goToUserProfile: any;
  goToFarmProfile: any;
  joinFarm: any;
}

const Search: React.FC<SearchProps> = ({
  props,
  isLoadingForUsers,
  isLoadingForFarms,
  users,
  farms,
  goToUserProfile,
  goToFarmProfile,
  joinFarm,
}) => {
  const [searchText, setSearchText] = useState('');

  const renderFarmItem = (item, index) => {
    const hasBorder = index !== farms.length - 1;
    return (
      <TouchableOpacity
        style={{
          ...styles.item,
          borderBottomWidth: hasBorder ? 1 : 0,
        }}
        key={`${item.id} ${item.name}`}
        onPress={() => goToFarmProfile(item)}
      >
        <View style={styles.itemLeft}>
          <View style={styles.imageWrap}>
            <Image
              source={
                item.profile_image && item.profile_image.url
                  ? {uri: item.profile_image && item.profile_image.url}
                  : require('../../assets/placeholders/profile_picture.png')
              }
              style={styles.image}
            />
          </View>
          <Text style={styles.text}>{item.name}</Text>
        </View>
        {joinFarm && <FarmInquiryButton farm={item} />}
      </TouchableOpacity>
    );
  };

  const renderUserItem = (item, index) => {
    const hasBorder = index !== users.length - 1;
    return (
      <TouchableOpacity
        style={{
          ...styles.item,
          borderBottomWidth: hasBorder ? 1 : 0,
        }}
        key={`${item.id} ${item.name}`}
        onPress={() => goToUserProfile(item)}>
        <View style={styles.imageWrap}>
          <Image
            source={
              item.avatar
                ? {uri: item.avatar}
                : require('../../assets/placeholders/profile_picture.png')
            }
            style={styles.image}
          />
        </View>
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderTitle = (title) => {
    return (
      <View style={styles.titleWrap}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SearchHeader
        searchText={searchText}
        setSearchText={setSearchText}
        props={props}
        joinFarm={joinFarm}
      />
      {isLoadingForFarms || isLoadingForUsers ? (
        <View style={styles.wrap}>
          <ActivityIndicator />
        </View>
      ) : farms.length === 0 && users.length === 0 ? (
        <View style={styles.wrap}>
          <Text style={styles.alert}>
            {strings(`Search.${searchText.length < 2 ? 'typeSomethingToSearch' : 'nothingFound'}`)}
          </Text>
        </View>
      ) : (
        <KeyboardAvoidingView behavior="padding">
          <ScrollView>
            <View style={styles.scroll}>
              {farms.length !== 0 && (
                <View>
                  {renderTitle(strings('Common.farms'))}
                  <View style={styles.list}>
                    {farms.map((item, index) => renderFarmItem(item, index))}
                  </View>
                </View>
              )}
              {users.length !== 0 && !joinFarm && (
                <View>
                  {renderTitle(strings('Search.otherProfiles'))}
                  <View style={styles.list}>
                    {users.map((item, index) => renderUserItem(item, index))}
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

const mapStateToProps = state => {
  return {
    isLoadingForUsers: state.view.isLoadingForUsers,
    isLoadingForFarms: state.view.isLoadingForFarms,
    users: state.view.users,
    farms: state.view.farms,
  };
};

export default connect(mapStateToProps)(Search);
