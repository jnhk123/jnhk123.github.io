import axios from 'axios';
import store from '@/store';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_HOST,
  timeout: 20000,
});

instance.interceptors.request.use(
  (config) => {
    const token = store.getters['user/token'];
    const headers = token
      ? { ...config.headers, Authorization: `Bearer ${token}` }
      : { ...config.headers };

    return { ...config, headers };
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const callApi = async (url, config) => {
  try {
    return await instance({
      url,
      ...config,
    });
  } catch (error) {
    if (
      error.response.status === 401 &&
      error.response.data.error === 'Invalid token'
    ) {
      store.dispatch('user/initUser');
      alert('토큰이 만료되었습니다. 다시 로그인 해주세요.');
      throw new Error(error);
    } else {
      if (error?.response?.data?.error) {
        alert(error?.response?.data?.error);
        throw new Error(error);
      } else {
        throw new Error(error);
      }
    }
  }
};
