import {createRouter, createWebHistory} from 'vue-router';
import {getAuth} from 'firebase/auth';

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'},
    component: () => import('@/views/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {layout: 'empty'},
    component: () => import('@/views/RegisterPage.vue')
  },
  {
    path: '/',
    name: 'homePage',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/HomePage.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/CategoriesPage.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/DetailPage.vue')
  },
  {
    path: '/history',
    name: 'history',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/HistoryPage.vue')
  },
  {
    path: '/planning',
    name: 'planning',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/PlanningPage.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/ProfilePage.vue')
  },
  {
    path: '/record',
    name: 'record',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/RecordPage.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const {currentUser} = auth;
  const requireAuth = to.matched.some((record) => record.meta.auth);

  if (requireAuth && !currentUser) {
    next('/login?message=login');
  } else {
    next();
  }
});

export default router;
