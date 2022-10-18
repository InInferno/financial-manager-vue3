import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import {getDatabase, ref, set} from 'firebase/database';

export default {
  actions: {
    // eslint-disable-next-line no-unused-vars
    async login({dispatch, commit}, {email, password}) {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const {user} = userCredential;
          console.log('login', user);
        })
        .catch((error) => {
          commit('setError', error);
          throw error;
        });
    },
    async logout({commit}) {
      const auth = getAuth();
      await signOut(auth)
        .then(() => {
          console.log('Logout successful');
        })
        .catch((error) => {
          console.log('logout', error);
          throw error;
        });
      commit('clearInfo');
    },
    // eslint-disable-next-line no-unused-vars
    async register({dispatch, commit}, {email, password, name}) {
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password);
        const uid = await dispatch('getUid');
        const db = getDatabase();
        set(ref(db, `/users/${uid}/info`), {
          bill: 10000,
          name
        });
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    getUid() {
      const auth = getAuth();
      const user = auth.currentUser;
      return user ? user.uid : null;
    }
  }
};
