import Axios from 'axios';
import {BASE_URL, OAUTH_URL} from '../config/constants';
import {store} from '../store';

const axios = Axios.create({
  baseURL: BASE_URL,
  timeout: 80000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axios2 = Axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Add a request interceptor
axios.interceptors.request.use(
  config => {
    // Get user token from the store
    const storeData = store.getState();
    const token =
      storeData &&
      storeData.user &&
      storeData.user.user &&
      storeData.user.user.access_token;

    //console.info('api token', token);

    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
);

// Add a response interceptor
axios.interceptors.response.use(
  response => response,
  error => {
    // Do something with response error
    console.log('API ERR MESSAGE', error.message);
    console.info('API ERR RESPONSE', error.response);
    console.info('API ERR REQUEST', error.request);
    // return error.response;
    return Promise.reject(error);
  },
);

export const register = async data => {
  try {
    return await axios.post('/register', data);
  } catch (err) {
    return err;
  }
};

export const login = async data => {
  try {
    return await Axios.post(`${OAUTH_URL}/token`, data);
  } catch (err) {
    return err;
  }
};

export const reauthenticate = async () => await axios.get(`${BASE_URL}/me`);

export const getUser = async (userId: number): any => {
  try {
    console.info('request url', `${BASE_URL}/users/${userId}`);
    return await axios.get(`${BASE_URL}/users/${userId}`);
  } catch (err) {
    return err;
  }
};

export const getMyUser = async () => {
  console.info('getting url', `${BASE_URL}/user`);
  return await axios.get(`${BASE_URL}/user`);
};

export const editMyUser = async user => await axios.put(`${BASE_URL}/user`, user);

export const verifyEmail = async data => await axios.get(`${BASE_URL}/send_confirmation`);

export const getFeeds = async (
  page: number,
  type: string,
  keyword: string,
  userId?: number,
  feedType?: string,
  farmId?: number,
) => {
  if (feedType === 'posts') {
    if (userId) {
      return await axios.get(`${BASE_URL}/users/${userId}/newsfeed?page=${page}`);
    } else if (farmId) {
      return await axios.get(`${BASE_URL}/farms/${farmId}/newsfeed?page=${page}&farm_id=${farmId}`);
    }
  }

  try {
    if (type === 'hashtag') {
      return await axios.get(
        `${BASE_URL}/newsfeed?page=${page}&user_id=${userId}&hashtag=${keyword.substr(
          1,
        )}`,
      );
    }

    if (type === 'video') {
      return await axios.get(
        `${BASE_URL}/newsfeed?page=${page}&user_id=${userId}&videosOnly=true`,
      );
    }
    if (type === 'farm') {
      return await axios.get(
        `${BASE_URL}/newsfeed?page=${page}&user_id=${userId}`,
      );
    }

    if (type === 'news') {
      return await axios.get(
        `${BASE_URL}/newsfeed?page=${page}&user_id=${userId}&to=${Date.now()}&type=news`,
      );
    }

    return await axios.get(
      `${BASE_URL}/newsfeed?page=${page}&user_id=${userId}&type=${type}`,
    );
  } catch (err) {
    return err;
  }
};

export const createPost = async data => {
  try {
    if (data.farm) {
      let farm_id = data.farm_id;
      delete data.farm;
      delete data.farm_id;
      return await axios.post(`${BASE_URL}/farms/${farm_id}/posts`, data);
    }
    return await axios.post(`${BASE_URL}/posts`, data);
  } catch (err) {
    return err;
  }
};

export const deletePost = async postId => await axios.delete(`${BASE_URL}/posts/${postId}`);

export const sharePost = async data => {
  try {
    return await axios.post(`${BASE_URL}/shares`, data);
  } catch (err) {
    return err;
  }
};

export const likePost = async data => {
  try {
    return await axios.post(`${BASE_URL}/likes`, data);
  } catch (err) {
    return err;
  }
};

export const unLikePost = async data => {
  try {
    return await axios.delete(`${BASE_URL}/likes`, {data});
  } catch (err) {
    return err;
  }
};

export const commentOnAPost = async data => {
  try {
    return await axios.post(`${BASE_URL}/comments`, data);
  } catch (err) {
    return err;
  }
};

export const getCommentsBelongingToAPost = async (postId: number) => {
  try {
    return await axios.get(
      `${BASE_URL}/comments?id=${postId}&page=1&type=post`,
    );
  } catch (err) {
    return err;
  }
};

export const getLikesBelongingToAPost = async (postId: number) => {
  try {
    return await axios.get(`${BASE_URL}/likes?id=${postId}&page=1&type=post`);
  } catch (err) {
    return err;
  }
};

export const getSharesBelongingToAPost = async (postId: number) => {
  try {
    return await axios.get(`${BASE_URL}/shares?id=${postId}&page=1&type=post`);
  } catch (err) {
    return err;
  }
};

// TODO: Get the longitude and latitude
export const getSuggestion = async (data, page) => {
  try {
    return await axios.get(
      // 'https://backend.farmlifes.innovatify.de/api/v1/suggestions?lat=34.862383&lng=50.766874',
      `${BASE_URL}/suggestions?lat=${data.latitude}&lng=${data.longitude}&page=${page}`,
    );
  } catch (err) {
    return err;
  }
};

export const follow = async data => {
  try {
    return await axios.post(`${BASE_URL}/follow`, data);
  } catch (err) {
    return err;
  }
};

export const unfollow = async data => {
  try {
    return await axios.delete(`${BASE_URL}/follow`, {data});
  } catch (err) {
    return err;
  }
};

export const getUserConveration = async (id: number) => {
  try {
    if (id === null) {
      return await axios.get(`${BASE_URL}/messages/conversations`);
    }
    return await axios.get(`${BASE_URL}/messages/conversations/${id}`);
  } catch (err) {
    return err;
  }
};

export const getConversationBetweenUsers = async (userId1, userId2) => {
  return await axios.post(`${BASE_URL}/messages/conversation/find-or-create`, {
    'sender_type': 'user',
    'recipient_type': 'user',
    'sender_id': userId1,
    'recipient_id': userId2
  });
};

export const getConversationWithFarm = async ({userId, farmId}) => {
  return await axios.post(`${BASE_URL}/messages/conversation/find-or-create`, {
    'sender_type': 'user',
    'recipient_type': 'farm',
    'sender_id': userId,
    'recipient_id': farmId
  });
};

export const getConversationById = async ({conversationId, farmId}) => {
  let url = `${BASE_URL}/conversation/${conversationId}`;

  if (farmId) {
    url += `/${farmId}`;
  }

  return await axios.get(url);
};

export const getConverationBetweenPeople = async (
  conversationId: number,
  page: number,
  farmId = null,
) => {
  let url = `${BASE_URL}/messages/conversation/${conversationId}`;

  if (farmId) {
    url += `/${farmId}`;
  }

  return await axios.get(`${url}?page=${page}`);
};

export const sendMessage = async (data, farmId = null) => {
  let url = `${BASE_URL}/messages`;

  if (farmId) {
    url += `/${farmId}`;
  }

  try {
    return await axios.post(url, data);
  } catch (err) {
    return err;
  }
};



export const setConversationToSeen = async data => {
  try {
    if (data.farmId) {
      return await axios.put(
        `${BASE_URL}/messages/conversation/${data.conversationId}/seen/${data.farmId}`,
        {},
      );
    }
    return await axios.put(
      `${BASE_URL}/messages/conversation/${data.conversationId}/seen`,
      {},
    );
  } catch (err) {
    return err;
  }
};

export const acceptPushNotification = async data => {
  try {
    return await axios.put(`${BASE_URL}/settings/push-notifications`, data);
  } catch (err) {
    return err;
  }
};

export const cancelPushNotification = async data => {
  const storeData = store.getState();
  const token =
    storeData &&
    storeData.user &&
    storeData.user.user &&
    storeData.user.user.access_token;

  const bearerToken = `Bearer ${token}`;

  try {
    const resp = await Axios.delete(`${BASE_URL}/settings/push-notifications`, {
      headers: {Authorization: bearerToken},
      data,
    });
    return resp;
  } catch (err) {
    return err;
  }
};

export const requestAttachmentToken = async (data, type) => {
  try {
    return await axios.post(`${BASE_URL}/attachments?type=${type}`, data);
  } catch (err) {
    return err;
  }
};

export const uploadLocalFileToServer = async (localFile, type) => {
  const fd = new FormData();
  fd.append('file', {
    uri: localFile.uri,
    url: localFile.uri,
    type: localFile.type,
    name: localFile.fileName,
    originalname: localFile.fileName,
  });

  return await requestAttachmentToken(fd, type);
};

// 'localFile' has to be a file received after being selected with a library like react-native-image-picker
export const uploadLocalImageToServer = async (localFile, fallbackValue = '') => {
  if (!localFile) {
    return fallbackValue;
  }

  return await uploadLocalFileToServer(localFile, 'image');
};

export const getFollowers = async targetId => {
  try {
    return await axios.get(
      `${BASE_URL}/followers?target_id=${targetId}&target_type=user`,
    );
  } catch (err) {
    return err;
  }
};

export const getFollowedBy = async targetId => {
  try {
    return await axios.get(
      `${BASE_URL}/followedby?target_id=${targetId}&target_type=user`,
    );
  } catch (err) {
    return err;
  }
};

export const getFarm = async (farmId: number): Promise<any> =>
  await axios.get(`${BASE_URL}/farms/${farmId}`);

export const getFarmCategories = async (): Promise<any> =>
  await axios.get(`${BASE_URL}/farm_categories`);

export const createOrEditFarm = async ({id, ...farm}) => {
  if (id) {
    return await axios.put(`${BASE_URL}/farms/${id}`, farm);
  }

  return await axios.post(`${BASE_URL}/farms`, farm);
};

export const getNotifications = async () => {
  try {
    return await axios.get(`${BASE_URL}/notifications`);
  } catch (err) {
    return err;
  }
};

/**
 * Search for farms
 * @param searchText - string - any search text
 * @param joinFarm - undefined or 1 if you want the search results to include the `membership_requested` field
 */
export const searchFarms = async (searchText, joinFarm) => {
  let url = `${BASE_URL}/farms?query=${searchText}`;

  if (joinFarm) {
    url += `&joinFarm=${joinFarm}`;
  }

  try {
    return await axios.get(url);
  } catch (err) {
    return err;
  }
};

export const getSinglePost = async (postId) => {
  try {
    return await axios.get(`${BASE_URL}/newsfeed?page=1&post_id=${postId}&user_id=1`);
  } catch (err) {
    return err;
  }
};

export const searchUsers = async searchText => {
  try {
    return await axios.get(`${BASE_URL}/users?query=${searchText}`);
  } catch (err) {
    return err;
  }
};

export const requestFarmMembership = async farmId => {
  return await axios.post(`${BASE_URL}/farms/${farmId}/membership-requests`);
};

export const cancelFarmMembershipRequest = async (farmId, membershipRequestId) =>
  await axios.delete(
    `${BASE_URL}/farms/${farmId}/membership-requests?membership_request_id=${membershipRequestId}`
  );

export const acceptFarmMembershipRequest = async (farmId, membershipRequestId) =>
  await axios.post(`${BASE_URL}/farms/${farmId}/members`, {
    membership_request_id: membershipRequestId,
  });

export const deleteFarmMember = async (farmId, memberId) =>
  await axios.delete(`${BASE_URL}/farms/${farmId}/members/${memberId}`);

export const getFarmMembers = async (farmId, page) =>
  await axios.get(`${BASE_URL}/farms/${farmId}/members?page=${page}`);
