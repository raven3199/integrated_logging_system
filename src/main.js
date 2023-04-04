import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import axios from 'axios';
import Vuex from 'vuex';
import store from './utils/store.js';

Vue.use(ElementUI);
Vue.use(Vuex);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.HOME = '/api';

// 全局路由构造函数，判断是否登录和要跳转到页面
router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.requireAuth)) {    // 需要登录
    if(window.localStorage.token && window.localStorage.isLogin === '1'){
      next()
    } else if (to.path !== '/') {
      let token = window.localStorage.token;
      if (token === 'null' || token === '' || token === undefined){
        next({path: '/login'})
        this.$message({
          type: 'warning',
          message: '检测到您还未登录,请登录后操作！'
        });
      }
    } else {
      next()
    }
  } else {   // 不需要登录
    next()
  }
})

axios.interceptors.request.use(
  config => {
    if (sessionStorage.getItem('token')) {
      config.headers.token = sessionStorage.getItem('token')
      console.log(sessionStorage.getItem('token'))
    }
    return config
  },
  error => {
    return Promise.reject(error)
  })

axios.defaults.headers.common['token'] = store.state.token

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
