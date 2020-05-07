import { AsyncStorage } from "react-native";

class AsyncStorageUtil {
  static async getAsyncStorage(key) {
    const result = await AsyncStorage.getItem(key).then(response => {
      return response;
    });
    return result;
  }

  static async setAsyncStorage(key, value) {
    await AsyncStorage.setItem(key, value).catch(err => {
      console.log(`AsyncStorage error: ${err.message}`);
    });
  }

  static async removeAsyncstorage(key) {
    const result = await AsyncStorage.removeItem(key).then(response => {
      return response;
    });
    return result;
  }

  static async clearAllStorageElement() {
    const result = await AsyncStorage.clear().then(response => {
      return response;
    });
    return result;
  }
}

export default AsyncStorageUtil;
