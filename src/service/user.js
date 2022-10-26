import { callApi } from "@/plugins/axios";

export const callGetUser = () => {
  return callApi(`/api/auth/user`, {
    method: "GET",
  });
};

export const callEditUser = (data) => {
  return callApi(`/api/auth/user`, {
    method: "PATCH",
    data,
  });
};

export const callDeleteUser = () => {
  return callApi(`/api/auth/user`, {
    method: "DELETE",
  });
};
