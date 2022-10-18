// import firebase from 'firebase/app';
import {
  getDatabase,
  ref,
  push,
  onValue
  // child,
  // get
  // onValue
  // val
  // set
} from 'firebase/database';

export default {
  actions: {
    async createRecord({dispatch, commit}, record) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();
        const refer = (await ref(db, `/users/${uid}/records`));
        await push(refer, record);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async fetchRecords({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();
        const val = await new Promise((resolve) => {
          onValue(ref(db, `/users/${uid}/records`), (snap) => resolve(snap.val()), {onlyOnce: true});
        });
        return val
          ? Object.keys(val).map((key) => ({...val[key], id: key}))
          : [];
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async fetchRecordById({dispatch, commit}, id) {
      try {
        const uid = await dispatch('getUid');
        const db = getDatabase();
        const val = await new Promise((resolve) => {
          onValue(ref(db, `/users/${uid}/records/${id}`), (snap) => resolve(snap.val()), {onlyOnce: true});
        });
        return {...val, id};
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    }
  }
};
