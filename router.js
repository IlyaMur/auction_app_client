import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const page = (path) => () =>
  import(`~/pages/${path}`).then((m) => m.default || m);

const routes = [
  {
    path: '/',
    name: 'index',
    component: page('designs/search'),

  },
  {
    path: '/login',
    name: 'login',
    component: page('auth/login'),
  },
  {
    path: '/register',
    name: 'register',
    component: page('auth/register'),
  },
  {
    path: '/verification/verify/:id',
    name: 'verify',
    component: page('auth/verification/verify'),
  },
  {
    path: '/verification/resend',
    name: 'verification.resend',
    component: page('auth/verification/resend'),
  },
  {
    path: '/password/email',
    name: 'password.email',
    component: page('auth/password/reset-email'),
  },
  {
    path: '/password/reset/:token',
    name: 'password.reset',
    component: page('auth/password/password-reset'),
  },
  {
    path: '/user/dashboard',
    name: 'user.dashboard',
    component: page('user/dashboard'),
  },
  {
    path: '/upload',
    name: 'designs.upload',
    component: page('user/designs/create'),
  },
  {
    path: '/designs/:id/edit',
    name: 'designs.edit',
    component: page('user/designs/edit'),
  },
  {
    path: '/settings',
    component: page('user/settings'),
    children: [
      { path: '', redirect: { name: 'settings.dashboard' } },
      {
        path: 'dashboard',
        name: 'settings.dashboard',
        component: page('user/settings/dashboard')
      },
      {
        path: 'profile',
        name: 'settings.profile',
        component: page('user/settings/profile')
      },
      {
        path: 'designs',
        name: 'settings.designs',
        component: page('user/settings/designs')
      }
    ]
  },
  {
    path: '/designs',
    name: 'designs.search',
    component: page('designs/search'),
  },
  {
    path: '/designs/:slug',
    name: 'designs.show',
    component: page('designs/show'),
  },
  {
    path: '/user/:name',
    name: 'users.profile',
    component: page('user/profile/profile'),
  },
  {
    path: '/designers',
    name: 'users.search',
    component: page('user/search/search'),
  },
  {
    path: '/tags/:tag',
    name: 'designs.tag',
    component: page('designs/bytag'),
  },
]

export function createRouter() {
  return new Router(
    {
      routes,
      mode: 'history'
    }
  )
}
