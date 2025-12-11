import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@jwt_token';

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, token);
  } catch (error) {
    console.error('Error storing the token', error);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(STORAGE_KEY);
    return token;
  } catch (error) {
    console.error('Error retrieving the token', error);
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error removing the token', error);
  }
};