import navigationService from '../services/navigationService';

export const navigateToUserProfile = user => {
  navigationService.navigate('UserProfile', {userId: user.id});
};

export const navigateToProfile = (entity: any): void => {
  if (entity) {
    if (entity.type === 'user') {
      navigationService.navigate('UserProfile', {userId: entity.id});
    } else if (entity.type === 'farm') {
      navigationService.navigate('FarmProfile', {farmId: entity.id});
    }
  }
};
