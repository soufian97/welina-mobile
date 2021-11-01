import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en_translations from '../translations/en';
import fr_translations from '../translations/fr';

export const EN_LOCAL = 'en';
export const FR_LOCAL = 'fr';

export const LOCALS = [EN_LOCAL, FR_LOCAL];

const resources = {
  [EN_LOCAL]: {
    translation: en_translations,
  },
  [FR_LOCAL]: {
    translation: fr_translations,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: EN_LOCAL,
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
