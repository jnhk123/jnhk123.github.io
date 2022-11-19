import axios from "axios";
import store from "@/store";

const instance = axios.create({
  baseURL: "https://api.devcury.kr/",
  // baseURL: "http://localhost:8090/",
  timeout: 20000,
});

export const callApi = async (url, config) => {
  try {
    const token = store.getters["user/token"];
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return await instance({
      url,
      headers,
      ...config,
    });
  } catch (error) {
    if (
      error.response.status === 401 &&
      error.response.data.error === "Invalid token"
    ) {
      store.dispatch("user/initUser");
      alert("토큰이 만료되었습니다. 다시 로그인 해주세요.");
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
