import _isEqual from 'lodash/isEqual';
import { translation } from '../containers/Auth/messages';
import i18n from '../config/i18n';

const REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape
const REGEX_PHONE = /^\d[0-9]{7,11}$/;
const REGEX_PHONE_COUNTRY_CODE = /^\+[0-9]{1,3}[0-9]{8,12}$/;
const REGEX_URL = /(www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gm;
const BIRTHDAY_VALIDATOR = /^\d{4}-(0[1-9]|1[0-2])-(0?[1-9]|[1-2][0-9]|3[01])$/;
const REGEX_LENGTH = /^.{6,}$/;
const REGEX_NUMBER_REQUIRED = /(?=.*[0-9])/g;
const REGEX_UPPERCASE_REQUIRED = /(?=.*[A-Z])/g;
const REGEX_LOWERCASE_REQUIRED = /(?=.*[a-z])/g;

const stringNotBlank = (errorMsg = 'ne peut pas être vide') => (value) =>
  !!value && !!`${value}`.trim() ? null : errorMsg;

const isSelectedValidator = (errorMsg = 'il faut selectioner le champ') => (
  value,
) => (value ? null : errorMsg);

const fieldsEqualValidator = (
  comparedValue,
  errorMsg = 'le champ a  == le champ b ',
) => (value) => (_isEqual(comparedValue, value) ? null : errorMsg);
const emailValidator = (errorMsg = "le format de l'email est invalide") => (
  value,
) => (REGEX_EMAIL.test(String(value).toLowerCase()) ? null : errorMsg);

const phoneValidator = (errorMsg = 'Le format du numéro est invalide') => (
  value,
) => (REGEX_PHONE.test(String(value).toLowerCase()) ? null : errorMsg);

const birthdayValidator = (errorMsg = 'Le format du date est invalide') => (
  value,
) => (BIRTHDAY_VALIDATOR.test(String(value).toLowerCase()) ? null : errorMsg);

const phoneWithCountryCodeValidator = (
  errorMsg = 'Le format du numéro est invalide',
) => (value) =>
  REGEX_PHONE_COUNTRY_CODE.test(String(value).toLowerCase()) ? null : errorMsg;

const urlValidator = (
  errorMsg = 'Le format du site web est invalide (ex: www.google.com)',
) => (value) => (REGEX_URL.test(String(value).toLowerCase()) ? null : errorMsg);

const lengthValidator = (
  errorMsg = i18n.t(translation.sixCharsMinRequiredError.id),
) => (value) => (REGEX_LENGTH.test(String(value)) ? null : errorMsg);

const uppercaseValidator = (
  errorMsg = i18n.t(translation.upperCaseRequiredError.id),
) => (value) =>
  REGEX_UPPERCASE_REQUIRED.test(String(value)) ? null : errorMsg;

const lowercaseValidator = (
  errorMsg = i18n.t(translation.lowerCaseRequiredError.id),
) => (value) =>
  REGEX_LOWERCASE_REQUIRED.test(String(value)) ? null : errorMsg;

const numberValidator = (
  errorMsg = i18n.t(translation.numberRequiredError.id),
) => (value) => (REGEX_NUMBER_REQUIRED.test(String(value)) ? null : errorMsg);

export {
  stringNotBlank,
  emailValidator,
  phoneValidator,
  birthdayValidator,
  fieldsEqualValidator,
  isSelectedValidator,
  phoneWithCountryCodeValidator,
  urlValidator,
  lengthValidator,
  uppercaseValidator,
  lowercaseValidator,
  numberValidator,
};
