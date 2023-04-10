<template>
	<el-card class="container" :style="{width: containerWidth}" shadow="always">
    <h1>权限管理</h1>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,  // 侧边栏是否折叠
    }
  },
	watch: {
    "$store.state.isCollapse":{
      handler:function(newVal){
        this.isCollapse = newVal;
      }
    }
  },
  computed: {
    containerWidth: {
      get: function() {
        if(this.isCollapse) {
          return (window.innerWidth - 40) + 'px';
        } else {
          return (window.innerWidth - 180 - 40) + 'px';
        }
      }
    }
  },
  methods: {
    
  },
	mounted() {
    this.isCollapse = this.$store.state.isCollapse;
    let isLogin = this.$store.state.isLogin;
    if (isLogin == 0) {
      this.$alert('您还未登录，请先登录再行使功能', '提示', {
        confirmButtonText: '确定',
      }).then(this.$router.push('/'));
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
	margin-top: 20px;
	margin-left: 20px;
	margin-bottom: 20px;
	background-color: #F0F2F5;
	height: calc(100% - 40px);
	width: calc(100% - 40px);
	position: fixed;
  background-size:100% 100%;
}
</style>


