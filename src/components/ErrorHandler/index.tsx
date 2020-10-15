import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import styles from './styles';

interface Props { }
interface State { }

export default class ErrorHandler extends Component<Props | State> {
  constructor(props) {
    super(props);
    this.state = { hasError: false, info: null };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true, info, error });
    console.log('error', error);
    console.log('info', info);
    // You can also log the error to an error reporting service
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Text style={styles.textStyle}> Farmlifes </Text>
          </View>
        </View>
      );
    }
    return children;
  }
}