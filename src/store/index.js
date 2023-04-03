import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {     // 全局管理的数据存储
  isLogin:'0',
  ser:null,
  token:localStorage.getItem('token') ? localStorage.getItem('token'):'',   // token
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
    $_setLogin(state, value) {
      state.isLogin = value;
      localStorage.setItem('isLogin', value);
    }
	  // $_removeStorage(state, value){  // 删除token
		//   localStorage.removeItem('token');
	  // },
	}
})