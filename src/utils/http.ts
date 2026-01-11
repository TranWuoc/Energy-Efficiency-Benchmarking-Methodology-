import type { AxiosInstance } from 'axios';
import axios from 'axios';

class Http {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: 'http://localhost:3000/api',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.instance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('accessToken');
                if (token) {
                    config.headers = config.headers ?? {};
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error),
        );

        this.instance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error?.response?.status === 401) {
                    localStorage.removeItem('accessToken');
                }
                return Promise.reject(error);
            },
        );
    }
}

const http = new Http().instance;

export default http;
