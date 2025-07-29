import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@ok2go_business_card_data';

export const saveCardData = async (data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save card data.', e);
  }
};

export const loadCardData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Failed to load card data.', e);
    return null;
  }
};
