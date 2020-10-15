export const getUserAvatarImageSource = user =>
  user && user.avatar
    ? {uri: user.avatar}
    : require('../assets/placeholders/profile_picture.png');

export const getFarmAvatarImageSource = farm =>
  farm && farm.avatar
    ? {uri: farm.avatar}
    : require('../assets/placeholders/profile_picture.png');
