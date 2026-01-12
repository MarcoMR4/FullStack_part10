import Constants from 'expo-constants';

const baseServerUrl = Constants.expoConfig?.extra?.serverUrl;

console.log('Base Server URL:', baseServerUrl);

const baseApi = `${baseServerUrl}/api/`;

export default baseApi;