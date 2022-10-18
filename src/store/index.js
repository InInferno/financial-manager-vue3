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
      // const myHeaders = new Headers();
      // myHeaders.append('apikey', process.env.VUE_APP_FIXER);
      // const requestOptions = {
      //   method: 'GET',
      //   redirect: 'follow',
      //   headers: myHeaders
      // };
      // const res = await fetch('https://api.apilayer.com/fixer/latest?&symbols=USD,EUR,RUB', requestOptions);
      // // eslint-disable-next-line no-return-await
      // return await res.json();
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
