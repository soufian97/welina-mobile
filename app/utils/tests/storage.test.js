import nativeStorageModule from '@react-native-community/async-storage';
import { clear, remove, update } from '../storage/storage';

describe('test suite for http service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('clear function should call AsyncStorage.clear()', async () => {
    await clear();
    expect(nativeStorageModule.clear).toHaveBeenCalled();
  });
  it('update function should call AsyncStorage.setItem with key and serialized payload', async () => {
    let key = '@key';
    let payload = { id: '@id' };

    await update(key, payload);
    expect(nativeStorageModule.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(payload),
    );
  });
  it('given string key remove function should call AsyncStorage.removeItem ', async () => {
    let key = '@key';
    await remove(key);
    expect(nativeStorageModule.removeItem).toHaveBeenCalledWith(key);
  });
  it('given array of keys remove function should call AsyncStorage.multiRemove ', async () => {
    let key = ['@key1', '@key2'];
    await remove(key);
    expect(nativeStorageModule.multiRemove).toHaveBeenCalledWith(key);
  });
});
