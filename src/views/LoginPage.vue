<template>
  <div class="login_container" :style="{width: containerWidth}">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="@/assets/logo.png" alt="">
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="userid">
          <el-input v-model="loginForm.userid" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,  // 侧边栏是否折叠
      // 这是登录表单的数据绑定对象
      loginForm: {
        userid: '',
        password: ''
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        userid: [
          { required: true, message: '请输入登录id', trigger: 'blur' },
          { min: 8, max: 8, message: '长度为 8 位id', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    "$store.state.isCollapse":{
      handler:function(newVal){
        this.isCollapse = newVal;
        console.log(this.isCollapse);
      }
    }
  },
  computed: {
    containerWidth: {
      get: function() {
        if(this.isCollapse) {
          return (window.innerWidth) + 'px';
        } else {
          return (window.innerWidth - 180) + 'px';
        }
      }
    }
  },
  methods: {
    // 点击重置按钮，重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      console.log(this.loginForm)
      this.$refs.loginFormRef.validate(async valid => {
        if (valid) {
          this.$axios({  //this代表vue对象，之前在入口文件中把axios挂载到了vue中，所以这里直接用this.$axios调用axios对象
		        method: 'post',
		        url: '/api/order/login',
		        data: this.loginForm
		      }).then((res) => {
            console.log(res);
            console.log(this.$store.state)
            if(res.data.flag) {
              var token = res.data.data;
				      this.$store.commit('$_setToken', token);
              this.$store.commit('$_setLogin', '1');
              this.$store.commit('$_setId', this.loginForm.userid);
				      this.$message({
                type: 'success',
                message: '登录成功'
              });
              console.log(this.$store.state.token);
              console.log(this.$store.state.isLogin);
              console.log(this.$store.state.id);
            } else {
              this.$message.error('登录失败');
            }
		      }).catch(function (err) {
		        console.log(err);
		      })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
  mounted() {
    this.isCollapse = this.$store.state.isCollapse;
    console.log(this.isCollapse);
  }
}
</script>

<style lang="scss" scoped>
.login_container {
  background: url('@/assets/login_background.jpg'); // 自己加图片
  width:100%;			
  height:100%;
  position: fixed;
  background-size:100% 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>


