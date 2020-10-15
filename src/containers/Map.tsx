import React, {useRef} from 'react';
import ScreenHeaderWithActions from '../components/ScreenHeaderWithActions';
import MapView, {Marker, Callout} from 'react-native-maps';
import colors from '../config/colors';
import {View, Text, StyleSheet, Image} from 'react-native';

const styles = StyleSheet.create({
  farmCalloutContainer: {
    maxWidth: 160,
    display: 'flex',
    flexDirection: 'row',
  },
  farmCalloutLeft: {
    width: 110,
  },
  farmCalloutLogo: {
    width: 25,
    height: 25,
  },
  farmName: {
    fontSize: 22,
    color: colors.darkerGray,
    fontWeight: 'bold',
  },
  farmAddress: {
    fontSize: 15,
    color: colors.darkerGray,
  },
});

export default props => {
  const {markers, farmMarker, onRegionChangeComplete, ...navigationProps} = props.navigation.getParam('props');
  const farmMarkerRef = useRef(null);

  const _onRegionChangeComplete = (...args) => {
    if (onRegionChangeComplete) {
      onRegionChangeComplete(...args);
    }

    if (farmMarkerRef && farmMarkerRef.current && farmMarkerRef.current.showCallout) {
      farmMarkerRef.current.showCallout();
    }
  };

  const renderFarmMarker = () => {
    if (!farmMarker) {
      return null;
    }

    return (
      <Marker coordinate={farmMarker.coordinate} ref={farmMarkerRef}>
        <Callout>
          <View style={styles.farmCalloutContainer}>
            <View style={styles.farmCalloutLeft}>
              <Text style={styles.farmName}>{farmMarker.name}</Text>
              <Text style={styles.farmAddress}>{farmMarker.address}</Text>
            </View>
            <View style={styles.farmCalloutLogo}>
              <Image
                source={require('../assets/farmlifes_logo_image.png')}
                style={styles.farmCalloutLogo}
              />
            </View>
          </View>
        </Callout>
      </Marker>
    )
  };

  return (
    <View style={{flex: 1}}>
      <ScreenHeaderWithActions leftText="Back" />
      <MapView style={{flex: 1}} {...navigationProps} onRegionChangeComplete={_onRegionChangeComplete}>
        {markers && markers.map(marker => <Marker {...marker}/>)}
        {renderFarmMarker()}
      </MapView>
    </View>
  );
};
