import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from '../views/LoginPage';
import UserConfirm from '../views/UserConfirm';
import AuthorityManage from '../views/AuthorityManage';
import IncidentRecord from '../views/IncidentRecord';
import OperationRecord from '../views/OperationRecord';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage,
      meta:{
        keepalive:false
      }
    },
    {
      path: '/UserConfirm',
      name: 'UserConfirm',
      component: UserConfirm,
      meta:{
        keepalive:true
      }
    },
    {
      path: '/AuthorityManage',
      name: 'AuthorityManage',
      component: AuthorityManage,
      meta:{
        keepalive:true
      }
    },
    {
      path: '/IncidentRecord',
      name: 'IncidentRecord',
      component: IncidentRecord,
      meta: {
        keepalive:true
      }
    },
    {
      path: '/OperationRecord',
      name: 'OperationRecord',
      component: OperationRecord,
      meta:{
        keepalive:true
      }
    }
  ]
})
