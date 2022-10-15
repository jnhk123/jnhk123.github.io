import { callApi } from "@/plugins/axios";

export const getBoards = () => {
  return callApi("/api/board", {
    method: "GET",
  });
};

export const postBoard = (data) => {
  return callApi(`/api/board`, {
    method: "POST",
    data,
  });
};

export const patchBoard = (data) => {
  return callApi(`/api/board`, {
    method: "PATCH",
    data,
  });
};

export const getBoard = (bno) => {
  return callApi(`/api/board/${bno}`, {
    method: "GET",
  });
};

export const getBoardComment = (bno) => {
  return callApi(`/api/board/comment/${bno}`, {
    method: "GET",
  });
};

export const postBoardComment = (bno) => {
  return callApi(`/api/board/comment/${bno}`, {
    method: "POST",
  });
};

export const getComments = (bno) => {
  return callApi(`/api/board/comment/${bno}`, {
    method: "GET",
  });
};

export const postComment = (bno, data) => {
  return callApi(`/api/board/comment/${bno}`, {
    method: "POST",
    data,
  });
};

export const deleteBoard = (bno) => {
  return callApi(`/api/board/${bno}`, {
    method: "DELETE",
  });
};

export const deleteComment = (commentId) => {
  return callApi(`/api/board/comment/${commentId}`, {
    method: "DELETE",
  });
};

export const getEmotion = (bno) => {
  return callApi(`/api/board/emotion/${bno}`, {
    method: "GET",
  });
};

export const postEmotion = (bno, data) => {
  return callApi(`/api/board/emotion/${bno}`, {
    method: "POST",
    data,
  });
};
