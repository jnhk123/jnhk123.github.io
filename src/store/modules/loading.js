export default {
  namespaced: true,

  state: {
    loading: false,
  },
  getters: {
    loading(state) {
      return state.loading;
    },
  },
  mutations: {
    setLoading(state, value) {
      state.loading = value;
    },
  },
  actions: {
    setLoading(context, value) {
      context.commit("setLoading", value);
    },
  },
};
