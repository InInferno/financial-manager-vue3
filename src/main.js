import {createApp} from 'vue';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Paginate from 'vuejs-paginate-next';
import {createMetaManager} from 'vue-meta';
import tooltipDirective from './directives/tooltip.directive';
import App from './App.vue';
import router from './router';
import store from './store';
import messagePlugin from './utils/message.plugin';
import LoaderApp from './components/app/LoaderApp.vue';
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';
import filters from './utils/filters';

firebase.initializeApp({
  apiKey: 'AIzaSyAhPitvSvTEdVrAhwu2bM0hNdvjdqm5PD0',
  authDomain: 'vue-manager-crm.firebaseapp.com',
  projectId: 'vue-manager-crm',
  storageBucket: 'vue-manager-crm.appspot.com',
  messagingSenderId: '528684173260',
  appId: '1:528684173260:web:7cd830f58957fcc8a8ff69',
  measurementId: 'G-X7CB0KVDLL'
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .directive('tooltip', tooltipDirective)
      .use(store)
      .use(router)
      .use(messagePlugin)
      .use(createMetaManager())
      .component('LoaderApp', LoaderApp)
      .component('Paginate', Paginate);
    app.config.globalProperties.$filters = filters;
    app.mount('#app');
  }
});
