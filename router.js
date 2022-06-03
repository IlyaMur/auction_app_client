import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const page = (path) => () =>
  import(`~/pages/${path}`).then((m) => m.default || m);

const routes = [
  {
    path: '/',
    name: 'index',
    component: page('index'),
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
]

export function createRouter() {
  return new Router(
    {
      routes,
      mode: 'history'
    }
  )
}
