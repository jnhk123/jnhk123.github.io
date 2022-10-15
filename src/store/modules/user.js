export default {
  namespaced: true,

  state: {
    token: sessionStorage.getItem("access-token"),
    user: {
      id: sessionStorage.getItem("user-id"),
      name: sessionStorage.getItem("user-name"),
    },
  },

  getters: {
    id(state) {
      return state.user.id;
    },

    name(state) {
      return state.user.name;
    },

    token(state) {
      return state.token;
    },

    hasToken(state) {
      return !!state.token;
    },
  },

  mutations: {
    setName(state, name) {
      state.user.name = name;
      sessionStorage.setItem("user-name", name);
    },

    setToken(state, token) {
      state.token = token;
      sessionStorage.setItem("access-token", token);
    },

    setId(state, id) {
      state.id = id;
      sessionStorage.setItem("user-id", id);
    },
  },

  actions: {
    setName({ commit }, name) {
      commit("setName", name);
    },

    setId({ commit }, id) {
      commit("setId", id);
    },

    setToken({ commit }, token) {
      commit("setToken", token);
    },

    initUser({ commit }) {
      commit("setId", "");
      commit("setName", "");
      commit("setToken", "");
    },
  },
};
