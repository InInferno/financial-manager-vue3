import {
  getDatabase, ref, push, onValue, update
} from 'firebase/database';

export default {
  state: {
    categories: []
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    },
    clearCategories(state) {
      state.categories = [];
    }
  },
  actions: {
    async fetchCategories({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();
        const val = await new Promise((resolve) => {
          onValue(ref(db, `/users/${uid}/categories`), (snap) => resolve(snap.val()), {onlyOnce: true});
        });
        return val
          ? Object.keys(val).map((key) => ({...val[key], id: key}))
          : [];
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async fetchCategoryById({dispatch, commit}, id) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();
        const val = await new Promise((resolve) => {
          onValue(ref(db, `/users/${uid}/categories/${id}`), (snap) => resolve(snap.val()), {onlyOnce: true});
        });
        return {...val, id};
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async updateCategory({dispatch, commit}, {title, limit, id}) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();
        const dbRef = ref(db, `/users/${uid}/categories/${id}`);
        update(dbRef, {title, limit}).then(() => {
          console.log('Data updated');
        }).catch((e) => {
          console.log(e);
        });
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async createCategory({dispatch, commit}, {title, limit}) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();
        const category = await push(ref(db, `/users/${uid}/categories`), {
          title,
          limit
        });
        return {title, limit, id: category.key};
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    }
  },
  getters: {
    categories: (s) => s.categories
  }
};
