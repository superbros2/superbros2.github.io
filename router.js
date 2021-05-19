import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    name: 'notFound',
    path: '/:path(.*)+',
    redirect: {
      name: '',
    },
  },
  {
    name: 'sub',
    path: '/sub',
    component: () => import('./view/sub'),
    meta: {
      title: '播放界面',
    },
  },
  {
    name: 'home',
    path: '/',
    component: () => import('./view/home'),
    meta: {
      title: '主页',
    },
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export { router };
