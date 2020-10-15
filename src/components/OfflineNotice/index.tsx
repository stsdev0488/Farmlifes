import React, { Component } from 'react';
import { View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import Text from '_components/Text';

import styles from './styles';


const MiniOfflineSign = () => (
  <View style={styles.offlineContainer}>
    <Text style={styles.offlineText}>No Internet Connection</Text>
  </View>
);

export default class OfflineNotice extends Component {
  state = {
    isConnected: true,
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
  };

  render() {
    const { isConnected } = this.state;
    if (!isConnected) {
      return <MiniOfflineSign />;
    }
    return null;
  }
}