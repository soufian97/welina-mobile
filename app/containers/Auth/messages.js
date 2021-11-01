import { defineMessage } from '../../components/I18n/defineMessage';

const scope = 'app.containers.auth';

export const translation = defineMessage({
  register: {
    id: `${scope}.register`,
    defaultMessage: 'Create an account',
  },
  registerSubText: {
    id: `${scope}.regiseterSubText`,
    defaultMessage: 'Create your account to fully\nexperience the app.',
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
  phone: {
    id: `${scope}.phone`,
    defaultMessage: 'Phone number',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Password',
  },
  inviteCode: {
    id: `${scope}.inviteCode`,
    defaultMessage: 'invite code',
  },
  createAccount: {
    id: `${scope}.createAccount`,
    defaultMessage: 'CREATE ACCOUNT',
  },
  haveAccount: {
    id: `${scope}.haveAccount`,
    defaultMessage: 'I have an account!',
  },
  signIn: {
    id: `${scope}.singIn`,
    defaultMessage: 'Sign in',
  },
  show: {
    id: `${scope}.show`,
    defaultMessage: 'Show',
  },
  hide: {
    id: `${scope}.hide`,
    defaultMessage: 'Hide',
  },
  forgot: {
    id: `${scope}.forgot`,
    defaultMessage: 'Forgot',
  },
  signInText: {
    id: `${scope}.signInText`,
    defaultMessage: 'To start planning your next surf trip',
  },
  noAccount: {
    id: `${scope}.noAccount`,
    defaultMessage: 'No account? ',
  },
  createOne: {
    id: `${scope}.createOne`,
    defaultMessage: 'Create one.',
  },
  DefaultSignInErrorMessage: {
    id: `${scope}.DefaultSignInErrorMessage`,
    defaultMessage: 'Invalid email or password!',
  },
  enterPhone: {
    id: `${scope}.enterPhone`,
    defaultMessage:
      'Enter your phone number to activate the 2-step\nverification process',
  },
  didVeryWell: {
    id: `${scope}.didVeryWell`,
    defaultMessage: "You're almost there! One last step",
  },
  phoneNumber: {
    id: `${scope}.phoneNumber`,
    defaultMessage: 'Phone number',
  },
  startVerify: {
    id: `${scope}.startVerify`,
    defaultMessage: 'START VERIFICATION',
  },
  verifyAccount: {
    id: `${scope}.verifyAccount`,
    defaultMessage: 'Verify account',
  },
  enterOTP: {
    id: `${scope}.enterOTP`,
    defaultMessage: 'Please enter the 4 digit code we sent to your phone ',
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
      'Phone number should have at least 8 digits after your country code',
  },
  emailFormatError: {
    id: `${scope}.emailFormatError`,
    defaultMessage: 'Email format is invalid',
  },
  inactifUser: {
    id: `${scope}.inactifUser`,
    defaultMessage: 'This user is inactive',
  },
  phoneNumberAlreadyUsed: {
    id: `${scope}.phoneNumberAlreadyUsed`,
    defaultMessage: 'This phone number already in use, please use another one',
  },
  createNewPassword: {
    id: `${scope}.createNewPassword`,
    defaultMessage: 'Create new password',
  },
  pleaseDonotSharePassword: {
    id: `${scope}.pleaseDonotSharePassword`,
    defaultMessage:
      'Please do not share your password with anyone to protect your account',
  },
  confirmPassword: {
    id: `${scope}.confirmPassword`,
    defaultMessage: 'Confirm password',
  },
  didnotMatch: {
    id: `${scope}.didnotMatch`,
    defaultMessage: "Those passwords didn't match. Try again.",
  },
  huray: {
    id: `${scope}.huray`,
    defaultMessage: 'Hurraaaay',
  },
  passwordSuccessefullyReseted: {
    id: `${scope}.passwordSuccessefullyReseted`,
    defaultMessage: 'Your password was successfully rested',
  },
  male: {
    id: `${scope}.male`,
    defaultMessage: 'Male',
  },
  female: {
    id: `${scope}.female`,
    defaultMessage: 'Female',
  },
  other: {
    id: `${scope}.other`,
    defaultMessage: 'Other',
  },
  byCreatingYourAccount: {
    id: `${scope}.byCreatingYourAccount`,
    defaultMessage: 'By creating your account, you accept our',
  },
  termsOfUse: {
    id: `${scope}.termsOfUse`,
    defaultMessage: 'Terms of use',
  },
  numberRequiredError: {
    id: `${scope}.numberRequiredError`,
    defaultMessage: 'You should enter at least 1 number',
  },
  upperCaseRequiredError: {
    id: `${scope}.upperCaseRequiredError`,
    defaultMessage: 'You should enter at least 1 uppercase char',
  },
  lowerCaseRequiredError: {
    id: `${scope}.lowerCaseRequiredError`,
    defaultMessage: 'You should enter at least 1 lowercase char',
  },
  sixCharsMinRequiredError: {
    id: `${scope}.sixCharsMinRequiredError`,
    defaultMessage: 'You should enter at least 6 chars',
  },
  forgotPassword: {
    id: `${scope}.forgotPassword`,
    defaultMessage: 'Forgot password?',
  },
});
