<template>
	<el-card class="container" :style="{width: containerWidth}" shadow="always">
    <el-card class="second_container" id="searchBox" shadow="always">
      <el-row type="flex" style="line-height:50px" id="searchBoxTitle">
        <el-col :span="4">
          <h1 style="line-height: 50px;">账号认证</h1>
        </el-col>
        <el-col :span="4" :offset="15" style="text-align: right;">
          <h1>
            信息检索
            <el-button type="text" style="font-size: 1.17em;" id="closeSearchBtn" @click="closeSearch">
              <i :class="searchCollapse ? 'el-icon-arrow-up ': 'el-icon-arrow-down'"></i>
            </el-button>
          </h1>
          
        </el-col>
      </el-row>
    
      <el-form ref="SearchFormRef" :model="SearchForm" :rules="SearchFormRules" label-width="100px" class="search_form">
        <el-row>
          <el-col :span="7">
            <el-form-item prop="Time" label="日期">
              <el-date-picker v-model="SearchForm.Time" placeholder="请选择日期" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="7" :offset="1">
            <el-form-item prop="Username" label="申请人">
              <el-input v-model="SearchForm.Username" prefix-icon="el-icon-user" placeholder="请输入申请人姓名"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="7" :offset="1">
            <el-form-item prop="PhoneNumber" label="手机号">
              <el-input v-model="SearchForm.PhoneNumber" prefix-icon="el-icon-phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="7">
            <el-form-item prop="Confirm" label="验证状态">
              <el-select v-model="SearchForm.Confirm" placeholder="请选择验证状态">
                <el-option label="未验证" value="handled"></el-option>
                <el-option label="已验证" value="being handled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          
          <el-col :span="6" :offset="1">
            <el-form-item prop="State" label="处理状态">
              <el-select v-model="SearchForm.State" placeholder="请选择处理结果">
                <el-option label="未处理" value="handled"></el-option>
                <el-option label="已同意" value="being handled"></el-option>
                <el-option label="已拒绝" value="will be handled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="9" >
            <el-form-item class="btns">
              <el-button type="success" icon="el-icon-upload2" @click="uploadTeacherInfo">上传新增教师信息</el-button>
              <el-button type="info" icon="el-icon-refresh-left" @click="resetSearchForm">重置</el-button>
              <el-button type="primary" icon="el-icon-search" @click="retrieval">检索</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <!--表格主体-->
    <el-card class="second_container" shadow="always">
      <el-table border
                :data="tableData"
                style="width: 100%;"
                max-height="840" >
               <!-- :row-class-name="tableRowClassName"
                @selection-change="handleSelectionChange" -->

        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="Time" width="200" label="日期" align="center" sortable=""> </el-table-column>
        <el-table-column prop="Username" width="200" label="申请人" align='center'></el-table-column>
        <el-table-column prop="PhoneNumber" width="200" label="手机号码" align="center"></el-table-column>
        <el-table-column prop="Confirm" width="200" label="验证状态" align="center"></el-table-column>
        <el-table-column prop="State" width="200" label="处理状态" align="center"></el-table-column>

        <el-table-column prop="operation" width="200" label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.State=='待处理'" @click='makeDecision(scope.$index,scope.row,true)' type="success" size="small" icon="el-icon-check" circle></el-button>
            <el-button v-if="scope.row.State=='待处理'" @click="makeDecision(scope.$index,scope.row,false)" type="danger" size="small" icon="el-icon-close" circle></el-button>
          </template>
       </el-table-column>
     </el-table>
    </el-card>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,  // 侧边栏是否折叠
      searchCollapse: true,  // 搜索栏是否折叠
      SearchForm: {//检索框参数
        Time: '',
        Username: '',
        PhoneNumber: '',
        State: '',
        Confirm: ''
      },
      tableData: [{//表格数据
        Time: '2021-06-03',
        Username: '李昊洋',
        PhoneNumber: '125896324',
        State: '未同意',
        Confirm: '是',
      },
      {
        Time: '2023-02-23',
        Username: '李昊洋',
        PhoneNumber: '125896348',
        State: '已同意',
        Confirm: '否',
      },
      {
        Time: '2022-07-15',
        Username: '李昊洋',
        PhoneNumber: '125896365',
        State: '待处理',
        Confirm: '否',
      }],
      // 检索规则
      SearchFormRules: {
        PhoneNumber: [
          { required: false, message: '请输入ID', trigger: 'blur' },
          { min: 1, max: 10, message: '请输入正确的ID', trigger: 'blur' }
        ],
        Username: [
          { required: false, message: '请输入处理人', trigger: 'blur' },
          { min: 2, max: 20, message: '请输入正确的处理人姓名', trigger: 'blur' }
        ]
      },
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
    closeSearch() {
      this.searchCollapse = !this.searchCollapse;
      let searchBox = document.getElementById("searchBox");
      let searchBoxTitle = document.getElementById("searchBoxTitle");
      if (this.searchCollapse == false) {
        searchBox.style.height = 70 + "px";
        searchBoxTitle.style.marginTop = -10 + "px";
      } else {
        searchBox.style.height = "auto";
        searchBoxTitle.style.marginTop = 0 + "px";
      }
    },
    // 重置输入
    resetSearchForm() {
      this.$refs.SearchFormRef.resetFields()
    },
    // 向后端检索
    retrieval() {

    },
    // 决定是否同意教师的申请
    makeDecision(index, row, decision) {
      console.log(index);
      console.log(row);
      console.log(decision);
    },
    // 上传新增教师信息
    uploadTeacherInfo() {

    }
  },
	mounted() {
    this.isCollapse = this.$store.state.isCollapse;
    let isLogin = this.$store.state.isLogin;
    if (isLogin == '0') {
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

.second_container {
  background-color: #FAFAFA;
  margin-bottom: 20px;
}
.search_form {
  position: relative;
  margin-top: 20px;
  bottom: 50;
  width: 100%;
  padding: 0px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
#searchBox {
  overflow: hidden;
}
</style>


