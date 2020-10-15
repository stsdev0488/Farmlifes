import React, {useState} from 'react';
import {View, ScrollView, ImageBackground, Image, TouchableOpacity, LayoutAnimation} from 'react-native';
import Header from '../../components/Header';
import BottomTab from '../../components/BottomTab';
import Text from '../../components/Text';
import Button from '../../components/Button';
import Feeds from '../../containers/Feeds';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../config/colors';
import {strings} from '../../utils/i18n';

import styles from './styles';

const descriptionLengthLimit = 100;

const HeaderPictures = React.memo(({bannerPicture, profilePicture}) => {
  return (
    <ImageBackground
      source={
        bannerPicture
          ? {uri: bannerPicture}
          : require('../../assets/placeholders/cover_picture.png')
      }
      style={styles.headerImage}>
      <View style={styles.personImageContainer}>
        <Image
          style={styles.personImage}
          source={
            profilePicture
              ? {uri: profilePicture}
              : require('../../assets/placeholders/profile_picture.png')
          }
        />
      </View>
    </ImageBackground>
  );
});

export default ({
  props,
  farm,
  onSendMessagePress,
  isSubscribing,
  isUnsubscribing,
  onSubscribe,
  onUnsubscribe,
  displayEditIcon,
  onEditPress
}): any => {
  const renderHeader = (): any => {
    const [showMore, setShowMore] = useState(false);
    const displayReadMore =
      !farm ||
      !farm.description ||
      farm.description.length > descriptionLengthLimit;

    let description = '';

    if (farm.description) {
      description =
        farm.description.length > descriptionLengthLimit
          ? `${farm.description.slice(0, descriptionLengthLimit)}...`
          : farm.description;
    }

    const latitude = farm && parseFloat(farm.lat);
    const longitude = farm && parseFloat(farm.lng);

    const openMap = () => {
      props.navigation.navigate('Map', {
        props: {
          region: {latitude, longitude, latitudeDelta: 0.03, longitudeDelta: 0.03},
          farmMarker: {
            coordinate: {latitude, longitude},
            name: farm.name,
            address: farm.adress,
          },
        },
      });
    };

    const iAmSubscribed = farm.i_am_subscribed;
    const subscribers = farm.subscribers || 0;

    return (
      <>
        <View>
          <HeaderPictures
            bannerPicture={farm.title_image && farm.title_image.url}
            profilePicture={farm.profile_image && farm.profile_image.url}
          />
        </View>

        <View style={styles.userInfoContainer}>
          <View style={styles.profileContainer}>
            <View style={styles.leftProfileHeaderContainer}>
              <View style={styles.titleContainer}>
                <TouchableOpacity
                  onPress={displayEditIcon ? onEditPress : undefined}>
                  <Text style={styles.farmName}>{farm.name}</Text>
                </TouchableOpacity>
                {displayEditIcon && (
                  <TouchableOpacity onPress={onEditPress}>
                    <Icon name="pencil" size={16} style={styles.editIcon}/>
                  </TouchableOpacity>
                )}
              </View>

              <View>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('FarmMembers', {farm})}>
                  <Text style={styles.membersCount}>
                    {farm.members_count}{' '}
                    {strings(
                      `Common.member${farm.members_count !== 1 ? 's' : ''}`,
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.followInfoContainer}>
          <Text style={styles.subscribersCount}>
            {subscribers}{' '}
            {strings(`Common.subscriber${subscribers !== 1 ? 's' : ''}`)}
          </Text>
          <Button
            style={{
              ...styles.button,
              ...(!iAmSubscribed
                ? styles.subscribeButton
                : styles.subscribedButton),
            }}
            fontStyle={
              !iAmSubscribed ? styles.subscribeText : styles.subscribedText
            }
            text={strings(`Common.subscribe${iAmSubscribed ? 'd' : ''}`)}
            fn={iAmSubscribed ? onUnsubscribe : onSubscribe}
            loadingSpinnerProps={{
              color: iAmSubscribed ? colors.lightGreen : colors.white,
            }}
            loading={isSubscribing || isUnsubscribing}
          />
        </View>

        <View style={styles.actionButtonsContainer}>
          <View
            style={{
              ...styles.actionButtonContainer,
              ...styles.sendMessageButtonContainer,
            }}>
            <Button
              text={strings('Common.sendMessage')}
              style={{...styles.button, ...styles.actionButton}}
              fontStyle={{...styles.buttonFont, ...styles.actionButtonFont}}
              iconName="envelope"
              iconStyle={styles.actionButtonFont}
              fn={onSendMessagePress}
            />
          </View>

          {farm.lat && farm.lng && (
            <View
              style={{
                ...styles.actionButtonContainer,
                ...styles.mapButtonContainer,
              }}>
              <Button
                text={strings('Common.map')}
                style={{...styles.button, ...styles.actionButton}}
                fontStyle={{
                  ...styles.buttonFont,
                  ...styles.actionButtonFont,
                  ...styles.mapButtonFont,
                }}
                iconName="map-marker"
                iconStyle={styles.actionButtonFont}
                fn={openMap}
              />
            </View>
          )}
        </View>

        <View style={styles.descriptionContainer}>
          <Text>{!showMore ? description : farm.description}</Text>
        </View>

        {displayReadMore && (
          <TouchableOpacity
            onPress={() => {
              LayoutAnimation.spring();
              setShowMore(!showMore);
            }}
            style={styles.readMoreContainer}>
            <Text style={styles.readMore}>
              {strings(`Common.${!showMore ? 'readMore' : 'hide'}`)}
            </Text>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Icon
                name={`chevron-${!showMore ? 'down' : 'up'}`}
                size={12}
                color={colors.darkGray}
              />
            </View>
          </TouchableOpacity>
        )}

        <View style={styles.separator}></View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Header props={props} />
      <View style={styles.container}>
        <Feeds
          props={props}
          showHeader={false}
          renderHeader={renderHeader}
          feedType="posts"
          isForFarms={true}
          farm={farm}
        />
      </View>
      <BottomTab props={props} />
    </View>
  );
};
