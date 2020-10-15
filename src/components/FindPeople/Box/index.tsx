import React from 'react';
import { View, Image } from 'react-native';
import Button from '_components/Button';
import Text from '_components/Text';
import {strings} from '../../../utils/i18n';

import styles from './styles';
export default ({ subscribed, modified, name, avatar, follow, unfollow, targetId, targetType }) => {
  const data = {
    target_id: targetId,
    target_type: targetType
  };
  if( modified && !subscribed){
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image
          style={styles.imageStyle}
          source={avatar} />
      </View>
      <View style={styles.otherView}>
        <View style={styles.innerView}>
          <Text style={styles.innerViewText}>{name}</Text>
        </View>
        <View style={styles.buttonViewContainer}>
          {
            modified ? (
              <View>
                <Button
                  style={styles.subscribedButton}
                  fontStyle={styles.subscribedButtonText}
                  text={strings(`Common.${!subscribed ? 'un' : ''}subscribed`)}
                  disabled={true}
                />
              </View>
            ) : (
                <>
                  <View>
                    <Button
                      style={styles.firstButton}
                      fontStyle={styles.firstButtonText}
                      text={strings('Common.follow')}
                      fn={() => follow(data)}
                    />
                  </View>

                  <View>
                    <Button
                      style={styles.secondButton}
                      text={strings('Common.delete')}
                      fn={() => unfollow(data)}
                    />
                  </View>
                </>
              )
          }
        </View>
      </View>
    </View>
  );

};
