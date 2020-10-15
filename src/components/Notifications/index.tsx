import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  toCapitalize,
} from '_services/helpers';
import NavigationService from '_services/navigationService';
import {
  strings,
} from '_utils/i18n';
import {
  getSinglePost,
  getNotifications,
} from '_actions/notifications';
import Header from '_components/Header';
import BottomTab from '_components/BottomTab';
import Spinner from '_components/Spinner';

import styles from './styles';

export interface NotificationsProps {
  isLoading: boolean;
  notifications: object[];
  getSinglePost: () => void;
  getNotifications: () => void;
  props: object;
}

const Notifications: React.FC<NotificationsProps> = ({
  isLoading = false,
  notifications = [],
  getSinglePost,
  getNotifications,
  props,
}) => {
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getNotifications({});
  }, []);

  const onItemPress = (postId) => {
    getSinglePost({
      postId,
      success: () => NavigationService.navigate('SinglePost'),
    });
  };

  const getFullName = (author) => {
    return `${toCapitalize(author.first_name)} ${toCapitalize(author.last_name)} `;
  };

  const getDescription = (actionType, comment, item) => {
    const notificationStr = strings(`Notifications.${actionType}`);
    const commentStr = comment ? ` ${comment}` : '';
    return notificationStr + commentStr;
  };

  const onRefresh = () => {
    setRefreshing(true);
    getNotifications({
      success: () => setRefreshing(false),
      failure: () => setRefreshing(false),
    });
  }

  const renderItem = ({ item }) => {
    return (
      <View
        style={styles.item}
      >
        <TouchableOpacity
          style={styles.content}
          onPress={() => onItemPress(item.entity_id)}
        >
          <View>
            <Image
              source={{uri: item.author.avatar.avatar}}
              style={styles.avatar}
            />
          </View>
          <View
            style={styles.description}
          >
            <Text
              style={styles.textRegular}
            >
              <Text
                style={styles.textBold}
              >
                { getFullName(item.author) }
              </Text>
              { getDescription(item.type_action, item.comment, item) }
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={styles.line}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.wrap}>
        {
          isLoading && !refreshing
          ? <Spinner />
          : <FlatList
              data={notifications}
              renderItem={renderItem}
              style={styles.list}
              contentContainerStyle={styles.listContent}
              keyExtractor={item => item.id}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
            />
        }
      </View>
      <BottomTab
        props={props}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.notifications.loading,
    notifications: state.notifications.notifications,
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getSinglePost,
    getNotifications,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifications);
