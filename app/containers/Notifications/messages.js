import { defineMessage } from '../../components/I18n/defineMessage';

const scope = 'app.containers.notifications';

export const translation = defineMessage({
  screenTitle: {
    id: `${scope}.screenTitle`,
    defaultMessage: 'Notifications',
  },
  noNotifications: {
    id: `${scope}.noNotifications`,
    defaultMessage: 'You have no notification yet',
  },
});
