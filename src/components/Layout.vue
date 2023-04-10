<template>
  <el-container class="layout-container">
    <el-header style="text-align: right; font-size: 12px">
      <el-row  class="row-header" type="flex" justify="start" style="text-align: center;">  
        <el-col :span="3">
          <div class="header-button-div">
            <i class="el-icon-caret-right" @click="toggleCollapse" v-if="isCollapse"></i>
          </div>
          <div class="header-button-div">
            <i class="el-icon-caret-left" @click="toggleCollapse" v-if="!isCollapse"></i>
          </div>
        </el-col>

        <el-col :span="18">
          <h2 class='header-h2'>欢迎使用校园防霸凌工单系统</h2>
        </el-col> 
        
        <el-col :span="3">
            <el-button type="primary" icon="el-icon-user" @click="goLogin(true)" v-if="isLogin=='0'" style="color:white;height: 60px;">
              登录
            </el-button>        
            <el-button type="primary" icon="el-icon-user-solid" @click="goLogin(false)" v-if="isLogin=='1'" style="color:white;height: 60px;">
              登出
            </el-button>  
        </el-col>
      </el-row>
    </el-header>
    
    <el-container>
      <el-aside v-if="!isCollapse" style="width:180px">
        
          <el-menu :unique-opened="true"  router :default-active="this.$route.path">
            <el-menu-item index="/">
              <template slot="title">  
                <i class="el-icon-house"></i>
                <span slot="title">首页</span>
              </template>
            </el-menu-item>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>用户管理</span>
              </template>
            
              <el-menu-item index="UserConfirm">
                <i class="el-icon-circle-check"></i>
                <span slot="title">账号认证</span>
              </el-menu-item>
              <el-menu-item index="AuthorityManage">
                <i class="el-icon-edit-outline"></i>
                <span slot="title">用户权限管理</span>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-news"></i>
                <span>事件管理</span>
              </template>

              <el-menu-item index="IncidentRecord">
                <i class="el-icon-document"></i>
                <span slot="title">事件记录</span>
              </el-menu-item>
              <el-menu-item index="OperationRecord">
                <i class="el-icon-receiving"></i>
                <span slot="title">操作记录</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
      </el-aside>

      <el-main>
        <el-scrollbar>
          <router-view></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

export default {
  name: 'LayOut',
  data() {
    return {
      isCollapse: false,
      isLogin: '0',
    }
  },
  watch: {
    "$store.state.isLogin":{
      handler:function(newVal){
        this.isLogin = newVal;
        console.log(this.isLogin);
      }
    }
  },
  methods: {
    toggleCollapse(){
      this.isCollapse = !this.isCollapse;
      this.$store.commit('$_setIsCollapse', this.isCollapse);
    },
    goLogin(value) {
      if(value=='1') {
        this.$store.commit('_removeStorage');
        this.$store.commit('_setLogin', '0');
      }
      this.$router.push('/');
    }
  },
  mounted() {
    this.isLogin = this.$store.state.isLogin;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.layout-container {
  height: 100vh;
}
.layout-container .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
  padding: 0;
  height: 60px;
}
.layout-container .el-aside {
  color: var(--el-text-color-primary);
  width: auto;
}
.layout-container .el-menu {
  border-right: none;
  width: 180px;
}
.layout-container .el-main {
  padding: 0;
  background-color: #E6E8EB;
}
.layout-container .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
.row-header {
  background:#409EFF;
  height: 60px;
}
.header-h2 {
  color:white ;
  font-size: 32px;
  line-height: 60px;
}
.header-h2:hover {
  color:#fff ;
}
.header-button-div {
  font-size: 36px;
  line-height: 60px;
}
.el-icon-caret-left {
  color: white;
  cursor:pointer;
}
.el-icon-caret-right {
  color: white;
  cursor:pointer;
}
.el-icon-user {
  color: white;
  cursor:pointer;
}
.el-icon-user_solid {
  color: white;
  cursor:pointer;
}

</style>
