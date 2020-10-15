import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import {
  View,
  Text,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {strings} from '../../../utils/i18n';

import {
  searchUsers,
  searchFarms,
  removeUsers,
  removeFarms,
} from '_actions/view';
import styles from './styles';

export interface SearchHeaderProps {
  searchText: string;
  setSearchText: () => void;
  props: any;
  searchUsers: () => void;
  searchFarms: () => void;
  removeUsers: () => void;
  removeFarms: () => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  props,
  searchText,
  setSearchText,
  searchUsers,
  searchFarms,
  removeUsers,
  removeFarms,
  joinFarm,
}) => {
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    if (timerId) {
      clearTimeout(timerId);
      setTimerId(null);
    }

    const p = [searchFarms(searchText, joinFarm ? 1 : undefined)];

    // Search for users only if this page is not a "join farm" search (that page should display only farms)
    if (!joinFarm) {
      p.push(searchUsers(searchText));
    }

    const id = setTimeout(() => {
      Promise.all(p);
    }, 300);
    setTimerId(id);
  }, [searchText]);

  useEffect(() => {
    return () => {
      removeUsers();
      removeFarms();
    };
  }, []);

  const onAbortPress = () => {
    Keyboard.dismiss();
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/*<TouchableOpacity*/}
      {/*  onPress={() => {}}*/}
      {/*  style={styles.mapButton}*/}
      {/*>*/}
      {/*  <View style={styles.iconWrap}>*/}
      {/*    <Icon name="location" color="white" size={18} />*/}
      {/*  </View>*/}
      {/*  <View style={styles.textWrap}>*/}
      {/*    <Text style={styles.mapText}>{'Map'}</Text>*/}
      {/*  </View>*/}
      {/*</TouchableOpacity>*/}
      <View style={styles.search}>
        <TextInput
          style={styles.searchText}
          underlineColorAndroid={'transparent'}
          autoFocus
          autoCapitalize={'none'}
          onChangeText={text => setSearchText(text)}
          placeholder={strings('Search.typeToSearch')}
        />
      </View>
      <TouchableOpacity
        onPress={onAbortPress}
      >
        <Text style={styles.abortText}>{strings(`Common.abort`)}</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    //
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    searchUsers,
    searchFarms,
    removeUsers,
    removeFarms,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchHeader);
