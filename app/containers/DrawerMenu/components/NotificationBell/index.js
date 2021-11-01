import { View } from 'react-native';
import { PreferencesIcon } from '../../../../assets/svgs';
import React from 'react';
import { Style } from './style';

const NotificationBell = ({ hasNewNotificationState }) => (
  <>
    {hasNewNotificationState && <View style={Style.circle} />}
    <PreferencesIcon />
  </>
);

export default NotificationBell;
