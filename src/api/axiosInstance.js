import axios from 'axios';
import * as SecureStore from "expo-secure-store";

const axiosInstance = axios.create({
    baseURL: 'http://10.10.102.254:8080/api',
    timeout: 10000,
});

axiosInstance.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync('userToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
