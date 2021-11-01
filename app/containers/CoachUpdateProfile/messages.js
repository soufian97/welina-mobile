import { defineMessage } from '../../components/I18n/defineMessage';

const scope = 'app.containers.coachUpdateProfile';

export const translation = defineMessage({
  stringBlankError: {
    id: `${scope}.stringBlankError`,
    defaultMessage: '{{name}} is required',
  },
  phoneNumberError: {
    id: `${scope}.phoneNumberError`,
    defaultMessage:
      'Phone number should have at least 8 digits after your country code',
  },
  emailFormatError: {
    id: `${scope}.emailFormatError`,
    defaultMessage: 'the email format is invalid',
  },
  birthdayFormatError: {
    id: `${scope}.birthdayFormatError`,
    defaultMessage: 'birthday format is invalid',
  },
  firstName: {
    id: `${scope}.firstName`,
    defaultMessage: 'First name',
  },
  lastName: {
    id: `${scope}.lastName`,
    defaultMessage: 'Last name',
  },
  phoneNumber: {
    id: `${scope}.phoneNumber`,
    defaultMessage: 'Phone number',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Email',
  },
  city: {
    id: `${scope}.city`,
    defaultMessage: 'City',
  },
  birthday: {
    id: `${scope}.birthday`,
    defaultMessage: 'Birthday',
  },
  coachName: {
    id: `${scope}.coachName`,
    defaultMessage: 'Tarik Wahbi',
  },
  coachTitle: {
    id: `${scope}.coachTitle`,
    defaultMessage: 'Instructor',
  },
  coachLocation: {
    id: `${scope}.coachLocation`,
    defaultMessage: 'Dakhla',
  },
  updateProfile: {
    id: `${scope}.updateProfile`,
    defaultMessage: 'Update profile',
  },
  profileSuccessefullyUpdatedTitle: {
    id: `${scope}.profileSuccessefullyUpdatedTitle`,
    defaultMessage: 'Huraaay',
  },
  profileSuccessefullyUpdatedBody: {
    id: `${scope}.profileSuccessefullyUpdatedBody`,
    defaultMessage: 'Your profile was successfully updated',
  },
  profileNotSuccessefullyUpdatedTitle: {
    id: `${scope}.profileNotSuccessefullyUpdatedTitle`,
    defaultMessage: 'Ouups',
  },
  profileNotSuccessefullyUpdatedBody: {
    id: `${scope}.profileNotSuccessefullyUpdatedBody`,
    defaultMessage: 'Your profile was not Updated, try later',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Password',
  },
  oldPassword: {
    id: `${scope}.oldPassword`,
    defaultMessage: 'Old password',
  },
  newPassword: {
    id: `${scope}.newPassword`,
    defaultMessage: 'New password',
  },
});
