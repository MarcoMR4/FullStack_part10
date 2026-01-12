import Constants from 'expo-constants';

const baseServerUrl = Constants.expoConfig?.extra?.serverUrl;
const baseApi = `${baseServerUrl}/api/`;

export default baseApi;