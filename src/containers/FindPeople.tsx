import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FindPeople from '_components/FindPeople';
import Geolocation from '@react-native-community/geolocation';

import { getFollowedBy as apiGetFollowedBy } from '_services/api';

import {
  getUserSuggestion,
  follow,
  unfollow,
} from '../actions/user';

export default ({ props }) => {

  const dispatch = useDispatch();
  const userInfo = useSelector(({ user }) => user);
  const suggestions = useSelector(({ suggestions }) => suggestions);

  const [followedPeopleCount, onChangeFollowedPeopleCount] = useState(0)
  const [page, onChangePage] = useState(1);
  const [coords, onChangeCoords] = useState(null);
  const [reloading, onChangeReloading] = useState(false)

  const findCoordinates = () => {
    return Geolocation.getCurrentPosition(
      position => {
        // Get user suggestions
        const coords = {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        };
        onChangeCoords(coords);
        dispatch(getUserSuggestion(coords, page, false));
        return position
      },
      error => {
        return error;
      },
    )
  };

  const getFollowedPeople = async () => {
    try {
      const resp = await apiGetFollowedBy(userInfo.user.user.id);
      onChangeFollowedPeopleCount(resp.data.data.length);
    }
    catch (err) {
      //
    }
  };

  const getInitialData = async () => {
    try {
      await getFollowedPeople();
      await findCoordinates();
    } catch (e) {
      //
    }
  };

  useEffect(() => {
    getInitialData();
  }, []);

  const handleLoadMore = async () => {
    if (!suggestions.suggestionsLoadMore) {
      if (suggestions.endLoadMore) {
        onChangePage(page + 1)
        dispatch(getUserSuggestion(coords, page + 1, false));
      }
    }

  };

  const handleReload = async () => {
    dispatch(getUserSuggestion(coords, 1, true));
  };

  const followFunction = (data) => {
    let newCount = followedPeopleCount + 1;
    onChangeFollowedPeopleCount(newCount);
    data.trigger= true;
    dispatch(follow(data));
  };

  const suggestionsData = suggestions.suggestions;

  // let sugg
  return (
    <FindPeople
      suggestions={suggestionsData}
      props={props}
      followedPeopleCount={followedPeopleCount === undefined ? 0 : followedPeopleCount}


      loadMore={suggestions.suggestionsLoadMore}
      loading={(suggestions.suggestionsLoading && !suggestions.reload) ? true : false}
      reloading={reloading}
      handleReload={handleReload}
      follow={(data) => followFunction(data)}
      unfollow={(data) => dispatch(unfollow(data))}
      handleLoadMore={handleLoadMore}
    />
  );
};
