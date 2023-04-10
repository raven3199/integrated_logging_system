import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {     // 全局管理的数据存储
  isLogin: '0',
  token: localStorage.getItem('token') ? localStorage.getItem('token'):'',   // token
	isCollapse: false,  // 侧边栏是否折叠
};

export default new Vuex.Store({
  state,
  getters:{    // 监听数据变化的
		// getStorage(state){   // 获取本地存储的登录信息
	  //   if(!state.token){
	  //     state.token =JSON.parse(localStorage.getItem(key))
	  //   }
    //   return state.token
	  // }
	},
	mutations:{
		$_setToken(state, value) { // 设置存储token
	    state.token = value;
	    localStorage.setItem('token', value);
	  },
    $_setLogin(state, value) { // 设置是否已登录
      state.isLogin = value;
      localStorage.setItem('isLogin', value);
    },
	  $_removeStorage(state){  // 删除token
			state.token = '';
		  localStorage.removeItem('token');
	  },
		$_setIsCollapse(state, value) {
			state.isCollapse = value;
			localStorage.setItem('isCollapse', value);
		}
	}
})