import AsyncStorage from '@react-native-community/async-storage';

export const storeItemInCache = async (key: string, data: Object) => {
  await AsyncStorage.setItem(key, JSON.stringify(data)).catch((error) => {
    console.error(`Error caching data for key ${key}: ${error.message}`);
  });
};

export const getItemFromCache = async (key: string) => {
  let value = await AsyncStorage.getItem(key).catch((error) => {
    console.error(`Error pulling key ${key} from cache: ${error.message}`);
  });
  return JSON.parse(value as string);
};

export const removeItemFromCache = async (key: string) => {
  await AsyncStorage.removeItem(key).catch((error) => {
    console.log(
      `Error removing item at key ${key} from cache: ${error.message}`,
    );
  });
};