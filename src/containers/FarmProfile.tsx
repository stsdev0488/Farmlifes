import React, {useEffect} from 'react';
import FarmProfile from '_components/FarmProfile';
import Spinner from '../components/Spinner';
import {getFarm} from '../actions/farmProfile';
import {useDispatch, useSelector} from 'react-redux';
import {GET_CONVERSATION_WITH_FARM, SUBSCRIBE_TO_FARM, UNSUBSCRIBE_FROM_FARM} from "../actions/types";

export default ({props}: {props: any}): {props: any} => {
  const farmId = props.navigation.getParam('farmId');
  const {farm, loading, isSubscribing, isUnsubscribing} = useSelector((state: any) => state.farmProfile);
  const dispatch = useDispatch();
  const userInfo = useSelector(({ user }) => user);


  useEffect(() => {
    dispatch(getFarm(farmId));
  }, [farmId]);

  const onSendMessagePress = () => {
    dispatch({
      type: GET_CONVERSATION_WITH_FARM,
      data: {
        farmId: farm.id,
        userId: userInfo.user.user.id,
      },
      onSuccess: conversation => {
        props.navigation.navigate('Messenger', {data: conversation});
      },
    });
  };

  const onEditPress = () => {
    props.navigation.navigate('EditFarmProfile', {farmId: farm.id});
  };

  const onSubscribe = () => {
    dispatch({
      type: SUBSCRIBE_TO_FARM,
      farmId: farm.id,
    });
  };

  const onUnsubscribe = () => {
    dispatch({
      type: UNSUBSCRIBE_FROM_FARM,
      farmId: farm.id,
    });
  };

  if (loading || !farm) {
    return <Spinner/>;
  }

  const user = userInfo && userInfo.user && userInfo.user.user;

  const isOwnFarm =
    farm &&
    user &&
    (user.farm_id === farm.id || (user.farm && user.farm.id === farm.id));

  return (
    <FarmProfile
      props={props}
      farm={farm}
      onSendMessagePress={onSendMessagePress}
      isSubscribing={isSubscribing}
      isUnsubscribing={isUnsubscribing}
      onSubscribe={onSubscribe}
      onUnsubscribe={onUnsubscribe}
      displayEditIcon={isOwnFarm}
      onEditPress={onEditPress}
    />
  );
};
