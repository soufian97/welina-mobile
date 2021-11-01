import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ i18n: { t: jest.fn() } }),
}));
