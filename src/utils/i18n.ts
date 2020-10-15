import ReactNative from 'react-native';
import I18n from 'react-native-i18n';
import moment from 'moment';
import 'moment/locale/de';
import TimeAgo from 'javascript-time-ago';
import en from '../config/locales/en.json';
import de from '../config/locales/de.json';

import timeAgoDe from 'javascript-time-ago/locale/de';

TimeAgo.addLocale(timeAgoDe);

// Should the app fallback to English if user locale doesn't exists
I18n.fallbacks = true;

// Define the supported translations
I18n.translations = {
  en,
  de,
};

I18n.locale = 'de';

moment.locale(I18n.locale);

const currentLocale = I18n.currentLocale();

// Is it a RTL language?
export const isRTL = currentLocale.indexOf('he') === 0 || currentLocale.indexOf('ar') === 0;

ReactNative.I18nManager.allowRTL(isRTL);

export function strings(name, params = {}) {
  return I18n.t(name, params);
}

export default I18n;
export const timeAgo = new TimeAgo(I18n.locale);
export const momentDateFormat = 'L';
