// import {
//   // getAuth,
//   // signInWithEmailAndPassword,
//   // signOut,
//   // createUserWithEmailAndPassword
// } from 'firebase/auth';
import {
  getDatabase,
  ref,
  onValue,
  update
  // val
  // set
} from 'firebase/database';

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    }
  },
  actions: {
    async updateInfo({dispatch, commit, getters}, toUpdate) {
      try {
        const uid = await dispatch('getUid');
        const updateData = {...getters.info, ...toUpdate};
        const db = getDatabase();
        const refer = (await ref(db, `/users/${uid}/info`));
        // await firebase.database().ref(`/users/${uid}/info`)
        // .update(updateData);
        await update(refer, updateData).then(() => {
          commit('setInfo', updateData);
        }).catch((e) => {
          console.log(e);
        });
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async fetchInfo({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();
        const refer = (await ref(db, `/users/${uid}/info`));
        onValue(refer, (snapshot) => {
          const data = snapshot.val();
          commit('setInfo', data);
        });
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    }
  },
  getters: {
    info: (s) => s.info
  }
};
