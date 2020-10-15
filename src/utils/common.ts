import moment from 'moment';
import {timeAgo} from './i18n';

export const momentDateFormat = 'L';

export const timeAgoStyle = {
  flavour: 'long',
  gradation: [
    {
      unit: 'minute',
      factor: 60,
    },
    {
      unit: 'hour',
      factor: 60 * 60,
      threshold: 59.9 * 60,
    },
    {
      unit: 'day',
      factor: 60 * 60 * 24,
      threshold: 59.9 * 60 * 24,
    },
    // If it's more than 7 days then display the date
    {
      threshold: 60 * 60 * 24 * 6,
      format: function (value) {
        return moment(new Date(value)).format(momentDateFormat);
      },
    },
  ],
};

export const toTimeAgo = (date, style = timeAgoStyle) => {
  return timeAgo.format(date, style);
};
