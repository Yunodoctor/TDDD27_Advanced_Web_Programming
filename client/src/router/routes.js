import Vue from 'vue'
import Router from 'vue-router'
import PostComponent from '@/components/PostComponent'
import StartPage from '@/components/StartPage'
import ArchivePostComponent from '@/components/ArchivePostComponent'
import Auth from '@okta/okta-vue'

Vue.use(Auth, {
  issuer: 'https://dev-671702.okta.com/oauth2/default',
  client_id: '0oakcz7giPgvQhucT356',
  redirect_uri: 'http://localhost:8080/implicit/callback',
  scope: 'openid profile email'
})

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'startpage',
      component: StartPage
    },
    {
      //Rediredct user back to app
      path: '/implicit/callback',
      component: Auth.handleCallback()
    },
    {
      //No acces to page post-manager without login
      path: '/post-manager', 
      name: 'post-manager',
      component: PostComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      //No acces to page archive without login
      path: '/archive',
      name: 'archive',
      component: ArchivePostComponent,
      meta: {
          requiresAuth: true
        }
      }
  ]
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router