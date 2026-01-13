import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  namespace: string;

  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    try {
      const token = await AsyncStorage.getItem(`${this.namespace}:accessToken`);
      return token;
    } catch (e) {
      console.error('Error getting access token', e);
      return null;
    }
  }

  async setAccessToken(accessToken: string) {
    try {
      await AsyncStorage.setItem(`${this.namespace}:accessToken`, accessToken);
    } catch (e) {
      console.error('Error setting access token', e);
    }
  }

  async removeAccessToken() {
    try {
      await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
    } catch (e) {
      console.error('Error removing access token', e);
    }
  }
}

export default AuthStorage;