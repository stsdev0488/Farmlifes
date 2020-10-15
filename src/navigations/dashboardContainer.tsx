import React from 'react';
import { createAppContainer } from 'react-navigation'; 
import {View} from 'react-native';

const navigation = React.createRef();

import BottomTab from '../components/BottomTab';
import App from './dashboardStack';

class AppLayout extends React.Component {


  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <App />
        <BottomTab props={this.props} />
      </View>
    );
  }
}
export default createAppContainer(AppLayout);
