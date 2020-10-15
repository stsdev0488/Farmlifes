import navigationService from './navigationService';
import {showMessage} from 'react-native-flash-message';
import {getConversationById} from './api';

const notificationTypes = {
  profile: 'profile',
  farm: 'farm',
  post: 'post',
  chat: 'chat',
};

const getNotificationAdditionalData = notification =>
  notification.payload && notification.payload.additionalData;

class Notification {
  public notification: any;
  public payload: any;
  public additionalData: any;
  public navigation: any;
  public routeName: string | null;
  public routeParams: any;

  constructor(notification) {
    this.notification = notification;
    this.payload = notification.payload;
    this.additionalData = this.payload.additionalData;
    this.routeName = null;
    this.routeParams = null;
  }

  public getRouteName = async () => this.routeName;
  public getRouteParams = async () => ({});
  public getOrSetRouteParams = async () => {
    if (this.routeParams) {
      return this.routeParams;
    }

    const routeParams = await this.getRouteParams();
    this.routeParams = routeParams;

    return routeParams;
  };
  public getTitle = async () => this.payload.title;
  public getBody = async () => this.payload.body;
  public getShowExtraOptions = () => ({});
  public routeParamsChanged = (currentRouteParams, nextRouteParams) => false;
  public shouldGoToScreen = async () => {
    const routeName = await this.getRouteName();
    const routeParams = await this.getOrSetRouteParams();

    const currentRoute = navigationService.getCurrentRoute();

    if (!currentRoute) {
      return true;
    }

    if (!routeName) {
      return false;
    }

    if (currentRoute.routeName !== routeName || currentRoute.params && !routeParams) {
      return true;
    } else {
      const paramsChanged = this.routeParamsChanged(routeParams, currentRoute.params);
      if (paramsChanged) {
        return true;
      }
    }

    return false;
  };

  public handleOpen = async () => {
    const routeName = await this.getRouteName();
    const routeParams = await this.getRouteParams();

    const currentRoute = navigationService.getCurrentRoute();

    if (routeName) {
      navigationService.navigate(routeName, routeParams);
    }
  };

  public shouldShow = async () => {
    return await this.shouldGoToScreen();
  };

  public getShowOptions = async () => {
    const extraOptions = await this.getShowExtraOptions();

    return {
      autoHide: true,
      duration: 5000,
      message: await this.getTitle(),
      description: await this.getBody(),
      position: 'top',
      type: 'info',
      onPress: this.handleOpen,
      ...extraOptions,
    };
  };

  public show = async (): void => {
    const shouldShow = await this.shouldShow();
    console.info('should show', shouldShow);
    if (shouldShow) {
      const options = await this.getShowOptions();
      console.info('options', options);
      showMessage(options);
    }
  };
}

// tslint:disable-next-line:max-classes-per-file
class PostNotification extends Notification {
  public routeName = 'SinglePost';

  public routeParamsChanged = (currentRouteParams, nextRouteParams) => {
    return currentRouteParams.postId !== nextRouteParams.postId;
  };

  public getRouteParams = async () => ({
    postId: parseFloat(this.additionalData['post_id']),
    commentId: parseFloat(this.additionalData['comment_id']),
  });
}

// tslint:disable-next-line:max-classes-per-file
class ProfileNotification extends Notification {
  public routeName = 'UserProfile';

  public getRouteParams = async () => ({
    userId: parseFloat(this.additionalData['user_id'])
  });

  public routeParamsChanged = (currentRouteParams, nextRouteParams) => {
    return currentRouteParams.userId !== nextRouteParams.userId;
  };
}

// tslint:disable-next-line:max-classes-per-file
class FarmNotification extends Notification {
  public routeName = 'FarmProfile';

  public getRouteParams = async () => ({
    farmId: parseFloat(this.additionalData['farm_id'])
  });

  public routeParamsChanged = (currentRouteParams, nextRouteParams) => {
    return currentRouteParams.farmId !== nextRouteParams.farmId;
  };
}

// tslint:disable-next-line:max-classes-per-file
class ChatNotification extends Notification {
  public routeName = 'Messenger';

  public getRouteParams = async () => {
    const farmId = parseFloat(this.additionalData['farm_id']);
    const conversationId = parseFloat(this.additionalData['conversation_id']);

    const publisher = farmId ? 'farm' : 'human';

    const response = await getConversationById({conversationId, farmId});
    return {data: response.data, publisher};
  };

  public routeParamsChanged = (currentRouteParams, nextRouteParams) => {
    return (
      !currentRouteParams ||
      !nextRouteParams ||
      !currentRouteParams.data ||
      !nextRouteParams.data ||
      currentRouteParams.data.id !== nextRouteParams.data.id ||
      currentRouteParams.publisher !== nextRouteParams.publisher
    );
  };
}

const getNotificationType = notification => {
  const data = getNotificationAdditionalData(notification);

  if (data) {
    if (
      [
        notificationTypes.chat,
        notificationTypes.farm,
        notificationTypes.post,
        notificationTypes.profile,
      ].indexOf(data.navigate) > -1
    ) {
      return data.navigate;
    }
  }
};

const getNotificationInstance = notification => {
  const type = getNotificationType(notification);

  switch (type) {
    case notificationTypes.post:
      return new PostNotification(notification);
    case notificationTypes.profile:
      return new ProfileNotification(notification);
    case notificationTypes.farm:
      return new FarmNotification(notification);
    case notificationTypes.chat:
      return new ChatNotification(notification);
    default:
      break;
  }

  return new Notification(notification);
};

export const handleNotificationOpened = async (notification) => {
  const instance = getNotificationInstance(notification);

  if (instance) {
    instance.handleOpen();
  }
};

const showNotification = (notification) => {
  const instance = getNotificationInstance(notification);

  if (instance) {
    instance.show();
  }
};

export const handleNotificationReceived = (notification) => {
  console.info('handle notification', notification);
  if (notification.isAppInFocus) {
    showNotification(notification);
  }
};
