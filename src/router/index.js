import { createRouter, createWebHashHistory } from 'vue-router'
import { nextTick } from 'vue'
import UploadView from '../views/UploadView.vue'

const routes = [
  {
    path: '/',
    name: 'upload',
    meta: {
      title: 'Upload your package.json'
    },
    component: UploadView
  },
  {
    path: '/analize',
    name: 'analize',
    meta: {
      title: 'View issues with your dependencies'
    },
    component: () => import(/* webpackChunkName: "analize */ '../views/AnalizeView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const DEFAULT_TITLE = 'Some Default Title'
router.afterEach((to, from) => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE
  })
})

export default router
