import { defineMessage } from '../../components/I18n/defineMessage';

const scope = 'app.containers.updateInfo';

export const translation = defineMessage({
  editPersonalInfo: {
    id: `${scope}.editPersonalInfo`,
    defaultMessage: 'Edit personal information',
  },
  firstName: {
    id: `${scope}.firstName`,
    defaultMessage: 'First name',
  },
  lastName: {
    id: `${scope}.lastName`,
    defaultMessage: 'Last name',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Email',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Password',
  },
  oldPassword: {
    id: `${scope}.oldPassword`,
    defaultMessage: 'Enter your current password',
  },
  newPassword: {
    id: `${scope}.newPassword`,
    defaultMessage: 'Enter your new password',
  },
  phoneNumber: {
    id: `${scope}.phoneNumber`,
    defaultMessage: 'Phone',
  },
  save: {
    id: `${scope}.save`,
    defaultMessage: 'Save',
  },
  startVerify: {
    id: `${scope}.startVerify`,
    defaultMessage: 'Start verification',
  },
  verifyAccount: {
    id: `${scope}.verifyAccount`,
    defaultMessage: 'Verify account',
  },
  enterOTP: {
    id: `${scope}.enterOTP`,
    defaultMessage:
      'Please enter the 4 digits we sent to your\nphone number to verify your account',
  },
  expireIn: {
    id: `${scope}.expireIn`,
    defaultMessage: 'Expires in {{seconds}}',
  },
  stringBlankError: {
    id: `${scope}.stringBlankError`,
    defaultMessage: '{{name}} is required',
  },
  phoneNumberError: {
    id: `${scope}.phoneNumberError`,
    defaultMessage:
      'phone number should have at least 8 digits after your country code',
  },
  emailFormatError: {
    id: `${scope}.emailFormatError`,
    defaultMessage: 'Email format is invalid',
  },
  huray: {
    id: `${scope}.huray`,
    defaultMessage: 'Hurray',
  },
  informationsSuccessefullyUpdated: {
    id: `${scope}.informationsSuccessefullyUpdated`,
    defaultMessage: 'Your information was successfully updated',
  },
  currency: {
    id: `${scope}.currency`,
    defaultMessage: 'Currency',
  },
  notifications: {
    id: `${scope}.notifications`,
    defaultMessage: 'Notifications',
  },
  enableNotifications: {
    id: `${scope}.enableNotifications`,
    defaultMessage: 'Enable notifications',
  },
});
