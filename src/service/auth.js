import { callApi } from "@/plugins/axios";

export const callSignUp = (data) => {
  return callApi("/auth/user/new", {
    method: "POST",
    data,
  });
};

export const login = (data) => {
  return callApi("/auth/user", {
    method: "POST",
    data,
  });
};

export const getUser = () => {
  return callApi("/api/auth/user", {
    method: "GET",
  });
};
