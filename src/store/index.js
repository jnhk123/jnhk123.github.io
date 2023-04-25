import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import loading from './modules/loading';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

import SecureLS from 'secure-ls';

const ls = new SecureLS({ isCompression: false });

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    loading,
  },
  plugins: [
    createPersistedState({
      paths: ['user'],
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
});
