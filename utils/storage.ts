import AsyncStorage from "@react-native-async-storage/async-storage";

export const save = async (key: string, data: unknown): Promise<void> => {
  await AsyncStorage.setItem(key, JSON.stringify(data));
};

export const load = async <T>(key: string, fallback: T): Promise<T> => {
  const raw = await AsyncStorage.getItem(key);
  return raw ? (JSON.parse(raw) as T) : fallback;
};

export const remove = async (key: string): Promise<void> => {
  await AsyncStorage.removeItem(key);
};
