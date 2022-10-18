/* eslint-disable quote-props */
/* eslint-disable quotes */
import {createStore} from 'vuex';
import auth from './auth';
import info from './info';
import category from './category';
import record from './record';

export default createStore({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    }
  },
  getters: {
    error: (s) => s.error
  },
  actions: {
    async fetchCurrency() {
      const res = {
        "success": true,
        "timestamp": 1665606724,
        "base": "EUR",
        "date": "2022-10-12",
        "rates": {
          "USD": 0.969885,
          "EUR": 1,
          "RUB": 61.805891
        }
      };
      // eslint-disable-next-line no-return-await
      return res;
    }
  },
  modules: {
    auth,
    info,
    category,
    record
  }
});
